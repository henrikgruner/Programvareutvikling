from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Auction


class CreateAuctionTestCase(APITestCase):
    fixtures = ["test_data.yaml"]

    _test_data = {
        "title": "Test",
        "description": "Dette er en test",
        "end_time": "2019-05-11T13:39:22.00Z",
        "min_bid_increase": 1,
        "pickup_location": "Testing 123",
    }

    def setUp(self):
        self.user = User.objects.get(pk=1)

    def test_blank_title(self):
        self.client.force_authenticate(user=self.user)
        invalid_data = self._test_data.copy()
        invalid_data["title"] = ""
        url = reverse("auction-list")
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 400)
