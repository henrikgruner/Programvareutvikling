from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


class AuctionItem(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=280)
    start_date = models.DateField()
    end_date = models.DateField()
    minimum_bid = models.IntegerField()
    is_active = models.BooleanField(default=True)
    author = models.ForeignKey(User, default=0, on_delete=models.CASCADE)
    img = models.ImageField(default=None)
    pickup_address = models.CharField(max_length=80)
    bids = models.OneToManyField()
    winner = models.ForeignKey(User, default=0, on_delete=models.CASCADE)


class Bid(models.Model):

    reg_date = models.DateField(default=datetime.now())
    amount = models.IntegerField()
    author = models.ForeignKey(User, default=0, on_delete=models.CASCADE)
    auction = models.ForeignKey(AuctionItem, default=0, on_delete=models.CASCADE)
