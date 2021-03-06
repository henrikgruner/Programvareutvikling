# Generated by Django 2.1.5 on 2019-02-26 16:38

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [migrations.swappable_dependency(settings.AUTH_USER_MODEL)]

    operations = [
        migrations.CreateModel(
            name="Auction",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("title", models.CharField(max_length=80)),
                (
                    "is_active",
                    models.BooleanField(
                        default=True, help_text="If the auction is open or finished"
                    ),
                ),
                ("description", models.CharField(max_length=280)),
                ("start_time", models.DateTimeField()),
                ("end_time", models.DateTimeField()),
                ("start_price", models.PositiveIntegerField(default=0)),
                (
                    "min_bid_increase",
                    models.PositiveIntegerField(
                        help_text="How much the bid must increase each time"
                    ),
                ),
                ("img", models.ImageField(default=None, upload_to="auctions")),
                ("pickup_address", models.CharField(max_length=200)),
                (
                    "author",
                    models.ForeignKey(
                        default=0,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="auctions",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "winner",
                    models.ForeignKey(
                        default=None,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="won_auctions",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={"ordering": ("created",)},
        ),
        migrations.CreateModel(
            name="Bid",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("reg_date", models.DateTimeField(auto_now_add=True)),
                ("amount", models.PositiveIntegerField()),
                (
                    "auction",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="bids",
                        to="auctions.Auction",
                    ),
                ),
                (
                    "author",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="bids",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={"ordering": ("reg_date",)},
        ),
    ]
