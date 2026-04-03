"""Domain logic for spot holdings and records."""

from decimal import Decimal

from django.core.exceptions import ValidationError

from .models import Holding, RecordType


def apply_record_to_holding(
    holding: Holding,
    *,
    record_type: str,
    amount: Decimal,
    price: Decimal,
) -> None:
    """
    Mutate holding.balance and holding.avg_price in memory to reflect a new trade.

    Buy: weighted average cost —
        new_avg = (old_balance * old_avg + amount * price) / (old_balance + amount)
        new_balance = old_balance + amount

    Sell: reduce balance only; average cost basis unchanged.

    Rewards: add to balance at zero marginal cost —
        new_avg = (old_balance * old_avg) / (old_balance + amount)
        new_balance = old_balance + amount
    """
    if amount <= 0:
        raise ValidationError("Amount must be positive.")

    old_bal = holding.balance
    old_avg = holding.avg_price

    if record_type == RecordType.BUY:
        new_balance = old_bal + amount
        if new_balance == 0:
            holding.balance = Decimal("0")
            holding.avg_price = Decimal("0")
            return
        total_cost = old_bal * old_avg + amount * price
        holding.balance = new_balance
        holding.avg_price = total_cost / new_balance

    elif record_type == RecordType.SELL:
        if amount > old_bal:
            raise ValidationError("Sell amount cannot exceed current balance.")
        holding.balance = old_bal - amount
        # avg_price unchanged

    elif record_type == RecordType.REWARDS:
        new_balance = old_bal + amount
        if new_balance == 0:
            holding.balance = Decimal("0")
            holding.avg_price = Decimal("0")
            return
        total_cost = old_bal * old_avg  # rewards at $0 cost
        holding.balance = new_balance
        holding.avg_price = total_cost / new_balance

    else:
        raise ValidationError(f"Unsupported record type: {record_type}")
