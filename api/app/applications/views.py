import datetime
from rest_framework import viewsets, mixins
from .models import Application
from .serializers import ApplicationSerializer

class ApplicationListView(mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
  queryset = Application.objects.all()
  serializer_class = ApplicationSerializer

  def perform_create(self, serializer):
    serializer.validated_data['user'] = self.request.user
    serializer.validated_data['date_creation'] = datetime.date.today()
    return super().perform_create(serializer)