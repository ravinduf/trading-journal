from rest_framework.routers import DefaultRouter

from .views import HoldingViewSet, RecordViewSet

router = DefaultRouter()
router.register(r"holdings", HoldingViewSet, basename="spot-holdings")
router.register(r"records", RecordViewSet, basename="spot-records")

urlpatterns = router.urls

