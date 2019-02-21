from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


class Bid(models.Model):

    reg_date = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField()
    author = models.ForeignKey(User, default=0, on_delete=models.CASCADE)


class AuctionItem(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=280)
    start_date = models.DateField()
    end_date = models.DateField()
    minimum_bid = models.IntegerField()
    is_active = models.BooleanField(default=True)
    author = models.ForeignKey(User, default=0, on_delete=models.CASCADE)
    img = models.FileField(default=None)
    pickup_address = models.CharField(max_length=80)
    bids = models.ForeignKey(Bid, on_delete=models.CASCADE)
    winner = models.ForeignKey(
        User, default=0, on_delete=models.CASCADE, related_name="bidder"
    )
