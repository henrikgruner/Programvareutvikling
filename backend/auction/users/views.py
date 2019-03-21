from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets

from .models import UserProfile
from .permissions import IsOwnerOrReadOnly, IsSameUserOrReadOnly
from .serializers import DetailUserProfileSerializer, DetailUserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = DetailUserSerializer
    permission_classes = (IsSameUserOrReadOnly,)

    def destroy(self, request, pk=None, **kwargs):
        request.user.is_active = False
        request.user.save()


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = DetailUserProfileSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class MyProfileViewSet(viewsets.ModelViewSet):
    serializer_class = DetailUserProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return UserProfile.objects.filter(user=user)
