# Generated by Django 2.1.5 on 2019-03-29 13:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("auctions", "0006_auto_20190321_1515")]

    operations = [
        migrations.AlterField(
            model_name="auction",
            name="description",
            field=models.CharField(max_length=700),
        ),
        migrations.AlterField(
            model_name="auction",
            name="pickup_address",
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name="auction", name="title", field=models.CharField(max_length=100)
        ),
    ]
