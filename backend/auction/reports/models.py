from django.contrib.auth.models import User
from ..auctions.models import Auction
from django.db import models


class Report(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    reportDescription = models.CharField(max_length=280)
    auction = models.ForeignKey(
        Auction, default=0, on_delete=models.CASCADE
    )
    author = models.ForeignKey(
        User, default=0, on_delete=models.CASCADE, related_name="reports"
    )

    def __str__(self):
        return f"{self.reportDescription}, {self.author.get_full_name()}, {self.auction}"

    class Meta:
        ordering = ("created",)
