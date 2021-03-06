from rest_framework import viewsets

from .models import Report
from .permissions import IsOwnerOrReadOnly
from .serializers import ReportSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (IsOwnerOrReadOnly,)
