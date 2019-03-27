from rest_framework import reverse, serializers

from .models import Report


class ReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Report
        fields = (
            "url",
            "id",
            "created",
            "report_description",
            # "title",
            "author",
            "auction",
        )
        read_only_fields = ("id", "created", "author")

    def create(self, validated_data):
        report = Report.objects.create(
            author=self.context.get("request").user, **validated_data
        )
        return report
