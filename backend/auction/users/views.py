from django.contrib.auth.models import User
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from .models import UserProfile
from .permissions import IsOwnerOrReadOnly, IsSameUserOrReadOnly
from .serializers import DetailUserProfileSerializer, DetailUserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = DetailUserSerializer
    permission_classes = (IsSameUserOrReadOnly,)

    def destroy(self, request, *args, **kwargs):
        request.user.is_active = False
        request.user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
