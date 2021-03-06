from django.contrib.auth.models import User
from django.db import models

from ..auctions.models import Auction


class Report(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    report_description = models.CharField(max_length=280)
    auction = models.ForeignKey(Auction, default=0, on_delete=models.CASCADE)
    author = models.ForeignKey(
        User, default=0, on_delete=models.CASCADE, related_name="reports"
    )

    def __str__(self):
        return f"{self.report_description}"

    class Meta:
        ordering = ("created",)
