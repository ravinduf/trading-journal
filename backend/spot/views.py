from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from django.utils import timezone
from rest_framework import mixins, permissions, serializers, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import Holding, Record, RecordType
from .serializers import HoldingCreateSerializer, HoldingSerializer, RecordSerializer
from .services import apply_record_to_holding


class HoldingViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Holding.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "create":
            return HoldingCreateSerializer
        return HoldingSerializer

    @transaction.atomic
    def perform_create(self, serializer):
        holding = serializer.save(user=self.request.user)
        Record.objects.create(
            holding=holding,
            date=timezone.now(),
            type=RecordType.BUY,
            amount=holding.balance,
            price=holding.avg_price,
        )

    @action(detail=True, methods=["get"], url_path="records")
    def records(self, request, pk=None):
        holding = self.get_object()
        qs = holding.records.all().order_by("-date")
        serializer = RecordSerializer(qs, many=True)
        return Response(serializer.data)


class RecordViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    Creates a record and updates the holding's balance and avg_price (see services.apply_record_to_holding).
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RecordSerializer

    def get_queryset(self):
        return Record.objects.filter(holding__user=self.request.user)

    @transaction.atomic
    def perform_create(self, serializer):
        vd = serializer.validated_data
        holding = vd["holding"]
        if holding.user_id != self.request.user.id:
            raise PermissionDenied("You do not have access to this holding.")

        locked = Holding.objects.select_for_update().get(pk=holding.pk)
        try:
            apply_record_to_holding(
                locked,
                record_type=vd["type"],
                amount=vd["amount"],
                price=vd["price"],
            )
        except DjangoValidationError as exc:
            raise serializers.ValidationError(
                exc.message_dict
                if getattr(exc, "message_dict", None)
                else {"non_field_errors": list(exc.messages)}
            ) from exc

        record = Record.objects.create(
            holding=locked,
            date=vd["date"],
            type=vd["type"],
            amount=vd["amount"],
            price=vd["price"],
        )
        locked.save(update_fields=["balance", "avg_price"])
        serializer.instance = record
