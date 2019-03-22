from django.contrib.auth.models import Group, User
from rest_framework import serializers

from auction.auctions.serializers import AuctionShortSerializer
from rest_auth.registration.serializers import RegisterSerializer

from .models import UserProfile


class ShortUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("url", "id", "address", "phone_number", "approved_terms")
        read_only_fields = ("id",)


class ShortUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("url", "id", "username", "first_name", "last_name", "email")
        read_only_fields = ("username", "id")


class DetailUserSerializer(serializers.HyperlinkedModelSerializer):
    profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "url",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_active",
            "date_joined",
            "profile",
        )
        read_only_fields = ("username", "date_joined", "is_staff", "is_active")

    def get_profile(self, obj):
        profile = obj.profile
        serialized = ShortUserProfileSerializer(
            profile, context={"request": self.context.get("request")}
        )
        return serialized.data


class DetailUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    active_auctions = serializers.SerializerMethodField()
    inactive_auctions = serializers.SerializerMethodField()
    won_auctions = serializers.SerializerMethodField()
    user = ShortUserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "url",
            "id",
            "user",
            "address",
            "phone_number",
            "approved_terms",
            "won_auctions",
            "active_auctions",
            "inactive_auctions",
        )
        read_only_fields = ("id", "user")

    def get_active_auctions(self, obj):
        auctions = obj.active_auctions
        serialized = AuctionShortSerializer(
            auctions, many=True, context={"request": self.context.get("request")}
        )
        return serialized.data

    def get_inactive_auctions(self, obj):
        auctions = obj.inactive_auctions
        serialized = AuctionShortSerializer(
            auctions, many=True, context={"request": self.context.get("request")}
        )
        return serialized.data

    def get_won_auctions(self, obj):
        won_auctions = obj.won_auctions
        serialized = AuctionShortSerializer(
            won_auctions, many=True, context={"request": self.context.get("request")}
        )
        return serialized.data


class RegisterUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("url", "id", "address")
        read_only_fields = ("id", "url")


class UserRegisterSerializer(RegisterSerializer):

    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=150)
    address = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=20)
    approved_terms = serializers.BooleanField()

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict["first_name"] = self.validated_data.get("first_name", "")
        data_dict["last_name"] = self.validated_data.get("last_name", "")
        data_dict["address"] = self.validated_data.get("address", "")
        data_dict["phone_number"] = self.validated_data.get("phone_number", "")
        data_dict["approved_terms"] = self.validated_data.get("approved_terms", "")
        return data_dict

    def custom_signup(self, request, user):
        UserProfile.objects.create(
            user=user,
            address=self.cleaned_data["address"],
            phone_number=self.cleaned_data["phone_number"],
            approved_terms=self.cleaned_data["approved_terms"],
        )
