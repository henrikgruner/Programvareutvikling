from rest_framework import permissions, viewsets

from .models import Auction, Bid
from .permissions import IsOwnerOrReadOnly
from .serializers import AuctionSerializer, BidSerializer


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = (IsOwnerOrReadOnly, permissions.IsAuthenticated)


class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    permission_classes = (IsOwnerOrReadOnly,)
