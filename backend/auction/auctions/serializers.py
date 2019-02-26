from rest_framework import serializers

from .models import Auction, Bid

# Serializers define the API representation


class AuctionSerializer(serializers.ModelSerializer):
    leading_bid = serializers.SerializerMethodField()

    def get_leading_bid(self, obj):
        return obj.leading_bid

    class Meta:
        model = Auction
        fields = (
            "created",
            "title",
            "author",
            "winner",
            "is_active",
            "description",
            "start_time",
            "end_time",
            "start_price",
            "min_bid_increase",
            "img",
            "pickup_address",
            "leading_bid",
        )


class BidSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bid
        fields = "__all__"
