# Generated by Django 2.1.5 on 2019-02-26 22:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("auctions", "0001_initial")]

    operations = [
        migrations.AlterModelOptions(name="bid", options={"ordering": ("reg_time",)}),
        migrations.RenameField(
            model_name="bid", old_name="reg_date", new_name="reg_time"
        ),
    ]
