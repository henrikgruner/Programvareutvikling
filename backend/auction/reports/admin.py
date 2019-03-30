from django.contrib import admin

from auction.admin import admin_site

from .models import Report


class ReportAdmin(admin.ModelAdmin):
    list_display = ["report_description", "id", "auction", "author", "created"]
    list_filter = ("auction", "author")


admin_site.register(Report, ReportAdmin)
