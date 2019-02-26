from django.contrib.auth.models import Group, User
from rest_framework import viewsets

from .models import UserProfile
from .serializers import BaseUserSerializer, GroupSerializer, UserProfileSerializer

# ViewSets define the view behaviour.


class BaseUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = BaseUserSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
