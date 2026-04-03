from rest_framework import serializers

from .models import Holding, Record


class HoldingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Holding
        fields = (
            "id",
            "symbol",
            "name",
            "avg_price",
            "balance",
            "created_at",
            "deleted",
        )
        read_only_fields = ("id", "created_at", "deleted")


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = (
            "id",
            "holding",
            "date",
            "type",
            "amount",
            "price",
        )
        read_only_fields = ("id",)


class HoldingCreateSerializer(serializers.ModelSerializer):
    """Validates input for creating a holding; persistence and initial record are handled in the view."""

    class Meta:
        model = Holding
        fields = ("symbol", "name", "avg_price", "balance")
