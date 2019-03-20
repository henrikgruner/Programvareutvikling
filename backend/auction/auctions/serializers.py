from rest_framework import reverse, serializers

from .models import Auction, AuctionImage, Bid

# Serializers define the API representation


class AuctionImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AuctionImage
        fields = ("image",)


class AuctionSerializer(serializers.HyperlinkedModelSerializer):
    leading_bid = serializers.SerializerMethodField()
    images = AuctionImageSerializer(many=True, read_only=True)

    def get_leading_bid(self, obj):
        return obj.leading_bid

    class Meta:
        model = Auction
        fields = (
            "url",
            "id",
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
            "pickup_address",
            "leading_bid",
            "images",
        )
        read_only_fields = ("id", "created", "author", "start_time")

    def create(self, validated_data):
        images_data = self.context.get("request").FILES
        auction = Auction.objects.create(
            author=self.context.get("request").user, **validated_data
        )
        for image_data in images_data.values():
            AuctionImage.objects.create(auction=auction, image=image_data)
        return auction


class BidSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bid
        fields = ("amount", "auction", "author", "reg_time")
        read_only_fields = ("reg_time", "author")

    def create(self, validated_data):
        bid = Bid.objects.create(
            author=self.context.get("request").user, **validated_data
        )
        return bid


class AuctionShortSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Auction
        fields = ("url", "title", "id", "author")
