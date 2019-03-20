from django.contrib.auth.models import Group, User
from rest_framework import serializers

from ..auctions.serializers import AuctionShortSerializer
from .models import UserProfile

# Serializers define the API representation


class BaseUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_active",
        )
        read_only_fields = ("username", "created", "is_staff", "is_active")


class FullUserSerializer(serializers.HyperlinkedModelSerializer):
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
            "profile",
        )
        read_only_fields = ("username", "created", "is_staff", "is_active")

    def get_profile(self, obj):
        profile = obj.profile
        serializer = UserProfileSerializer(
            profile, context={"request": self.context.get("request")}
        )
        return serializer.data


class FullUserProfileSerializer(serializers.HyperlinkedModelSerializer):
    active_auctions = serializers.SerializerMethodField()
    inactive_auctions = serializers.SerializerMethodField()
    user = BaseUserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = (
            "url",
            "id",
            "user",
            "address",
            "phone_number",
            "approved_terms",
            "active_auctions",
            "inactive_auctions",
        )
        read_only_fields = ("id", "user")

    def get_active_auctions(self, obj):
        auctions = obj.active_auctions
        serializer = AuctionShortSerializer(
            auctions, many=True, context={"request": self.context.get("request")}
        )
        return serializer.data

    def get_inactive_auctions(self, obj):
        auctions = obj.inactive_auctions
        serializer = AuctionShortSerializer(
            auctions, many=True, context={"request": self.context.get("request")}
        )
        return serializer.data


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ("url", "id", "address", "phone_number", "approved_terms")
        read_only_fields = ("id",)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ("url", "name")
