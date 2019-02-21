from django.contrib.auth.models import User
from django.db import models


class Auction(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=30)
    author = models.ForeignKey(
        User, default=0, on_delete=models.CASCADE, related_name="auctions"
    )
    winner = models.ForeignKey(
        User, default=None, on_delete=models.CASCADE, related_name="won_auctions"
    )
    is_active = models.BooleanField(
        default=True, help_text="If the auction is open or finished"
    )
    description = models.CharField(max_length=280)
    start_date = models.DateField()
    end_date = models.DateField()
    start_price = models.PositiveIntegerField(default=0)
    min_bid_increase = models.PositiveIntegerField(
        help_text="How much the bid must increase each time"
    )
    img = models.ImageField(upload_to="auctions", default=None)
    pickup_address = models.CharField(max_length=80)

    def __str__(self):
        return f"{self.title}, {self.author.get_full_name()}"

    class Meta:
        ordering = ("created",)


class Bid(models.Model):
    reg_date = models.DateTimeField(auto_now_add=True, blank=True)
    amount = models.PositiveIntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE, related_name="bids")

    def __str__(self):
        return f"{self.amount}, {self.reg_date}, {self.author.get_full_name()},  {self.auction.title}"

    class Meta:
        ordering = ("reg_date",)
