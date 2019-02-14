from django.contrib.auth.models import User
from django.db import models


class AuctionItem(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=280)
    end_date = models.DateField()
    minimum_bid = models.IntegerField()
    current_bid = models.IntegerField()
    status = models.BooleanField(default=True)
    author = models.ForeignKey(User, default=0, on_delete=models.CASCADE())
    img = models.ImageField(default="default.jpg")
    pickup_address = models.CharField(max_length=80)
