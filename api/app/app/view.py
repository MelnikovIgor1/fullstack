from django.contrib.auth.views import LogoutView, LoginView
from django.db.models import signals

from django.views.generic import CreateView
from rest_framework import viewsets, mixins
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from .send_mail import send_mail


class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
  serializer_class = UserSerializer
  queryset = User.objects.all()

  def perform_create(self, serializer):
      user = User.objects.create_user(**serializer.validated_data)
      user.set_password(serializer.validated_data['password'])
      return user
