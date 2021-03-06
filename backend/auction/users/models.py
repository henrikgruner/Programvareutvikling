from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from auction.auctions.models import Auction


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    approved_terms = models.BooleanField(default=False)

    @property
    def active_auctions(self):
        return self.user.auctions.filter(end_time__gt=timezone.now())

    @property
    def inactive_auctions(self):
        return self.user.auctions.filter(end_time__lte=timezone.now())

    @property
    def won_auctions(self):
        return self.user.won_auctions

    @property
    def bids(self):
        return self.user.bids

    def __str__(self):
        return f"{self.user.get_full_name()}"
