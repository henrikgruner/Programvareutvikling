# Generated by Django 2.1.5 on 2019-03-20 11:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [("users", "0002_userprofile_is_active")]

    operations = [migrations.RemoveField(model_name="userprofile", name="is_active")]