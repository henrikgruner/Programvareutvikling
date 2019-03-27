from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Auction


class CreateAuctionTestCase(APITestCase):
    fixtures = ["test_users.yaml", "test_auctions.yaml"]

    _test_data = {
        "title": "Test auksjon",
        "description": "Dette er en test auksjon",
        "end_time": "2019-08-11T13:39:22.00Z",
        "min_bid_increase": 10,
        "pickup_location": "Testingvegen 123, 02X109 Kakegalaksen",
    }

    def setUp(self):
        self.regular_user = User.objects.get(pk=2)

    def test_blank_title(self):
        self.client.force_authenticate(user=self.regular_user)
        invalid_data = self._test_data.copy()
        invalid_data["title"] = ""
        url = reverse("auction-list")
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 400)
