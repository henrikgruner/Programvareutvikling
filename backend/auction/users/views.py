from django.contrib.auth.models import Group, User
from rest_framework import viewsets

from .models import UserProfile
from .permissions import IsOwnerOrReadOnly, IsSameUserOrReadOnly
from .serializers import BaseUserSerializer, GroupSerializer, UserProfileSerializer


class BaseUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = BaseUserSerializer
    permission_classes = (IsSameUserOrReadOnly,)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class MyProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def get_queryset(self):
        user = self.request.user
        return UserProfile.objects.filter(user=user)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
