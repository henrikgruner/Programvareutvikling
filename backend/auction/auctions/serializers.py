from rest_framework import serializers

from .models import Auction, Bid

# Serializers define the API representation


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = "__all__"


class BidSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bid
        fields = "__all__"
