from rest_framework import viewsets

from .models import Auction, Bid
from .serializers import AuctionSerializer, BidSerializer

# ViewSets define the view behaviour.


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer


class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
