import factory
from django.contrib.auth import models

from .models import UserProfile


class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = models.User

    first_name = factory.Faker("first_name", locale="no_NO")
    last_name = factory.Faker("last_name", locale="no_NO")
    username = factory.Sequence(lambda n: "agent_%03d" % n)
    email = factory.LazyAttribute(lambda o: "%s@example.com" % o.username)
    password = factory.PostGenerationMethodCall("set_password", "password123")
    is_active = True


class UserProfileFactory(factory.DjangoModelFactory):
    class Meta:
        model = UserProfile

    user = factory.SubFactory(UserFactory)
    address = factory.Faker("address", locale="no_NO")
    phone_number = factory.Sequence(lambda n: "123-555-%04d" % n)
    approved_terms = True
