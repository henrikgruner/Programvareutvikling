from rest_framework import serializers

from .models import Auction, AuctionImage, Bid


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


class AuctionImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AuctionImage
        fields = ("image",)


class AuctionShortSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Auction
        fields = ("url", "title", "id", "author")


class AuctionSerializer(serializers.HyperlinkedModelSerializer):
    leading_bid = serializers.SerializerMethodField()
    is_active = serializers.SerializerMethodField()
    bids = serializers.SerializerMethodField()
    winner = serializers.SerializerMethodField()
    images = AuctionImageSerializer(many=True, read_only=True)

    def get_leading_bid(self, obj):
        if obj.leading_bid:
            return obj.leading_bid.amount
        return obj.start_price

    def get_is_active(self, obj):
        return obj.is_active

    def get_bids(self, obj):
        bids = obj.bids
        serializer = BidSerializer(
            bids, many=True, context={"request": self.context.get("request")}
        )
        return serializer.data

    def get_winner(self, obj):
        from auction.users.serializers import ShortUserSerializer

        winner = obj.winner
        if winner:
            serializer = ShortUserSerializer(
                winner, context={"request": self.context.get("request")}
            )
            return serializer.data
        return None

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
            "bids",
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
