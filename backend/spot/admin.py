from django.contrib import admin

from .models import Holding, Record


@admin.register(Holding)
class HoldingAdmin(admin.ModelAdmin):
    list_display = ("name", "user", "avg_price", "balance", "created_at", "deleted")
    list_filter = ("deleted",)
    search_fields = ("name",)


@admin.register(Record)
class RecordAdmin(admin.ModelAdmin):
    list_display = ("holding", "date", "amount", "price")
    list_filter = ("holding",)
    date_hierarchy = "date"
