from django.db import models

# Create your models here.


class User(models.Model):
    role = models.CharField(max_length=30)
    start_date = models.DateField(null=True)
    end_date = models.DateField()
