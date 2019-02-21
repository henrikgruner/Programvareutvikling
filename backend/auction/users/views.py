from django.contrib.auth.models import Group, User
from rest_framework import viewsets

from .serializers import GroupSerializer, UserSerializer

# ViewSets define the view behaviour.


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
