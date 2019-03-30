from django.contrib import admin
from django.contrib.auth.models import User

from auction.admin import admin_site

from .models import UserProfile


class UserProfileInline(admin.TabularInline):
    model = UserProfile


class UserProfileAdmin(admin.ModelAdmin):

    list_display = ["id", "address", "phone_number", "approved_terms"]
    list_filter = ("approved_terms",)


class UserAdmin(admin.ModelAdmin):
    inlines = [UserProfileInline]

    list_display = [
        "username",
        "id",
        "first_name",
        "last_name",
        "email",
        "is_active",
        "is_staff",
        "is_superuser",
    ]
    list_filter = ("is_active", "is_staff", "is_superuser")


admin_site.register(UserProfile, UserProfileAdmin)
admin_site.register(User, UserAdmin)
