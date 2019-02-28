from django.contrib.auth.models import User
from django.db import models


class Auction(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=80)
    author = models.ForeignKey(
        User, default=0, on_delete=models.CASCADE, related_name="auctions"
    )
    winner = models.ForeignKey(
        User,
        default=None,
        null=True,
        on_delete=models.CASCADE,
        related_name="won_auctions",
    )
    is_active = models.BooleanField(
        default=True, help_text="If the auction is open or finished"
    )
    description = models.CharField(max_length=280)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField()
    start_price = models.PositiveIntegerField(default=0)
    min_bid_increase = models.PositiveIntegerField(
        help_text="How much the bid must increase each time"
    )
    pickup_address = models.CharField(max_length=200)

    @property
    def leading_bid(self):
        try:
            bid = self.bids.latest("reg_time").amount

        except Bid.DoesNotExist:
            bid = self.start_price

        return bid

    def __str__(self):
        return f"{self.title}, {self.author.get_full_name()}"

    class Meta:
        ordering = ("created",)


class AuctionImage(models.Model):
    auction = models.ForeignKey(
        Auction, related_name="images", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="auctions", default=None)

    def __str__(self):
        return f"{self.image}, {self.auction_id}"


class Bid(models.Model):
    reg_time = models.DateTimeField(auto_now_add=True, blank=True)
    amount = models.PositiveIntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE, related_name="bids")

    def __str__(self):
        return f"{self.amount}, {self.reg_time}, {self.author.get_full_name()},  {self.auction.title}"

    class Meta:
        ordering = ("reg_time",)
