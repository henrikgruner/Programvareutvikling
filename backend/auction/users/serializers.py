from django.contrib.auth.models import Group, User
from rest_framework import serializers

from .models import UserProfile

# Serializers define the API representation


class BaseUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "is_staff")
        read_only_fields = ("username", "created", "is_staff")


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    user = BaseUserSerializer(read_only=True)
    leading_bid = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ("url", "id", "user", "address", "phone_number", "approved_terms")
        read_only_fields = ("id", "user")


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ("url", "name")
