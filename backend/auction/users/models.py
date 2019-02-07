from django.apps import AppConfig
from django.db import models


class User(models.Model):
    role = models.CharField(max_length=30)
    start_date = models.DateField(null=True)
    end_date = models.DateField()
