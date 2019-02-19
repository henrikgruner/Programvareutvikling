from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField()


class Reports(models.Model):
    reason = models.CharField()
    author = models.ForeignKey(User, default=0, on_delete=models.CASCADE)
    criminal = models.ForeignKey(
        User, default=0, on_delete=models.CASCADE
    )  # Skal kunne rapportere både brukere og auctionItems
