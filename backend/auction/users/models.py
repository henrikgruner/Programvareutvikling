from django.contrib.auth.models import User
from django.db import models

from ..auctions.models import Auction


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    approved_terms = models.BooleanField(default=False)

    @property
    def active_auctions(self):
        return self.user.auctions.filter(is_active=True)

    @property
    def inactive_auctions(self):
        return self.user.auctions.filter(is_active=False)

    def __str__(self):
        return (
            f"{self.user.get_full_name()} has been a user since {self.user.date_joined}"
        )
