from django.contrib import admin
from django.utils.html import mark_safe

from auction.admin import admin_site

from .models import Auction, AuctionImage, Bid


class AuctionAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "id",
        "author",
        "_winner",
        "start_price",
        "min_bid_increase",
        "start_time",
        "end_time",
        "is_active",
    ]
    list_filter = ("author", "end_time")

    readonly_fields = ("is_active", "leading_bid", "images", "bids")

    def is_active(self, obj):
        return str(obj.is_active)

    def leading_bid(self, obj):
        if obj.leading_bid:
            return str(obj.leading_bid.amount)
        return "None"

    def bids(self, obj):
        return ", ".join([str(bid) for bid in obj.bids.all()])

    def images(self, obj):
        return "\n".join([str(image.image) for image in obj.images.all()])


class BidAdmin(admin.ModelAdmin):
    list_display = ["id", "amount", "auction", "author", "reg_time"]
    list_filter = ("auction", "author", "reg_time")


class AuctionImageAdmin(admin.ModelAdmin):
    list_display = ["id", "auction", "image"]
    readonly_fields = ("image_show",)

    def image_show(self, obj):
        try:
            return mark_safe(
                '<img src="{url}" width="{width}" height={height} />'.format(
                    url=obj.image.url,
                    width=obj.image.width / 8,
                    height=obj.image.height / 8,
                )
            )
        except FileNotFoundError:
            return "Can't show image"


admin_site.register(Auction, AuctionAdmin)
admin_site.register(AuctionImage, AuctionImageAdmin)
admin_site.register(Bid, BidAdmin)
