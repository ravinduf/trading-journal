from django.conf import settings
from django.db import models


class Holding(models.Model):
    """A spot holding row, scoped to a user for filtering by the logged-in user."""

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="holdings",
        db_index=True,
    )
    name = models.CharField(max_length=255)
    avg_price = models.DecimalField(max_digits=28, decimal_places=10)
    balance = models.DecimalField(max_digits=28, decimal_places=10)
    created_at = models.DateTimeField(auto_now_add=True)
    deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Holdings"

    def __str__(self) -> str:
        return f"{self.name} ({self.user_id})"


class Record(models.Model):
    """A trade line that updates a holding's balance; removed when the holding is deleted."""

    holding = models.ForeignKey(
        Holding,
        on_delete=models.CASCADE,
        related_name="records",
    )
    date = models.DateTimeField()
    amount = models.DecimalField(max_digits=28, decimal_places=10)
    price = models.DecimalField(max_digits=28, decimal_places=10)

    class Meta:
        ordering = ["-date"]
        verbose_name_plural = "Records"

    def __str__(self) -> str:
        return f"{self.holding.name} @ {self.date} ({self.amount})"
