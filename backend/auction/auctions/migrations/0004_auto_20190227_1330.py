# Generated by Django 2.1.5 on 2019-02-27 13:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("auctions", "0003_auto_20190227_0143")]

    operations = [
        migrations.RenameField(
            model_name="auctionimage", old_name="property", new_name="auction"
        )
    ]