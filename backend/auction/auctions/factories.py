from datetime import datetime, timedelta
from random import randint

from django.contrib.auth.models import User

import factory
import factory.fuzzy
import pytz

from .models import Auction


class AuctionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Auction

    created = datetime.now(pytz.utc)
    title = factory.Faker("sentence", nb_words=4)
    author = factory.Iterator(User.objects.all())
    description = factory.Faker("text", max_nb_chars=200, ext_word_list=None)
    start_time = datetime.now(pytz.utc)
    end_time = datetime.now(pytz.utc) + timedelta(days=randint(3, 17))
    start_price = factory.fuzzy.FuzzyInteger(low=10, high=3000)
    min_bid_increase = factory.fuzzy.FuzzyInteger(low=10, high=300)
    img = factory.django.ImageField(color="blue")
    pickup_address = factory.Faker("address", locale="no_NO")
