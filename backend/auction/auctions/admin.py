from django.contrib import admin

from .models import Auction, AuctionImage, Bid

admin.site.register(Auction)
admin.site.register(AuctionImage)
admin.site.register(Bid)
