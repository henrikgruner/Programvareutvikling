from django.contrib.admin import AdminSite as BaseAdminSite
from rest_framework.authtoken.models import Token


class AdminSite(BaseAdminSite):
    site_header = "Admin Panel for Auksjonsbua "
    site_title = "Auksjonsbua"
    index_title = "Welcome to Auksjonsbua Site Administration"

    def get_model_ordering(self, x):
        ordering = {"Auctions": 1, "Bids": 2, "Auction images": 3}
        try:
            return ordering[x["name"]]
        except KeyError:
            return 0

    def get_app_ordering(self, x):
        print(x["app_label"])
        ordering = {"auth": 1, "users": 2, "auctions": 3, "reports": 4, "authtoken": 5}
        try:
            return ordering[x["app_label"]]
        except KeyError:
            return 100

    def get_app_list(self, request):
        """
        Return a sorted list of all the installed apps that have been
        registered in this site.
        """

        app_dict = self._build_app_dict(request)
        app_list = sorted(app_dict.values(), key=lambda x: self.get_app_ordering(x))

        for app in app_list:
            app["models"].sort(key=lambda x: self.get_model_ordering(x))

        return app_list


admin_site = AdminSite(name="admin")
admin_site.register(Token)
