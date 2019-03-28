from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework.test import APITestCase


class CreateAuctionTestCase(APITestCase):
    fixtures = ["test_users.yaml", "test_auctions.yaml"]

    _test_data = {
        "title": "Testauksjon",
        "description": "Dette er en testauksjon",
        "end_time": "2019-05-11 13:39:22.248063+00:00",
        "start_price": 25,
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

    def test_blank_description(self):
        self.client.force_authenticate(user=self.regular_user)
        invalid_data = self._test_data.copy()
        invalid_data["description"] = ""
        url = reverse("auction-list")
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 400)

    def test_end_time_passed(self):
        self.client.force_authenticate(user=self.regular_user)
        invalid_data = self._test_data.copy()
        invalid_data["end_time"] = "2018-05-11T13:39:22.00Z"
        url = reverse("auction-list")
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 400)

    def test_not_logged_in(self):
        self.client.force_authenticate(user=self.regular_user)
        self.client.logout()
        url = reverse("auction-list")
        response = self.client.post(url, self._test_data)
        self.assertEqual(response.status_code, 400)

    def test_zero_min_bid_increase(self):
        self.client.force_authenticate(user=self.regular_user)
        invalid_data = self._test_data.copy()
        invalid_data["min_bid_increase"] = 0
        url = reverse("auction-list")
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 400)

    def test_blank_pickup_location(self):
        self.client.force_authenticate(user=self.regular_user)
        invalid_data = self._test_data.copy()
        invalid_data["pickup_location"] = ""
        url = reverse("auction-list")
        response = self.client.post(url, invalid_data)
        self.assertEqual(response.status_code, 400)

    """
    Does not work...
    def test_valid_data(self):
        self.client.force_authenticate(user=self.regular_user)
        url = reverse("auction-list")
        response = self.client.post(url, self._test_data)
        self.assertEqual(response.status_code, 201)
"""
