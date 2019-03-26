from rest_framework import viewsets

from .models import Report
from .serializers import ReportSerializer
from .permissions import IsOwnerOrReadOnly


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (IsOwnerOrReadOnly,)
