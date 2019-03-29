from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Auction(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    author = models.ForeignKey(
        User, default=0, on_delete=models.CASCADE, related_name="auctions"
    )
    _winner = models.ForeignKey(
        User,
        default=None,
        null=True,
        on_delete=models.CASCADE,
        related_name="won_auctions",
        db_column="winner",
    )
    description = models.CharField(max_length=700)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField()
    start_price = models.PositiveIntegerField(default=0)
    min_bid_increase = models.PositiveIntegerField(
        help_text="How much the bid must increase each time"
    )
    pickup_address = models.CharField(max_length=300)

    @property
    def is_active(self):
        """
        If the auction is open or finished
        """
        if timezone.now() > self.end_time:
            return False
        return True

    @property
    def leading_bid(self):
        try:
            bid = self.bids.latest("reg_time")
        except Bid.DoesNotExist:
            bid = None
        return bid

    @property
    def winner(self):
        if self.is_active:
            return None
        else:
            try:
                winner = self.bids.latest("reg_time").author
                self._winner = winner
                self.save()

                return winner
            except Bid.DoesNotExist:
                return None

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

    @property
    def auction_title(self):
        return self.auction.title

    class Meta:
        ordering = ("reg_time",)
