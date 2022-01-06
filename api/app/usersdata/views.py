from django.contrib.auth.views import LogoutView, LoginView
from django.db.models import signals

from django.views.generic import CreateView
from rest_framework import viewsets, mixins
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UsersDataSerializer
from .models import UserData

class UsersDataViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
  serializer_class = UsersDataSerializer
  queryset = User.objects.all()

  def perform_create(self, serializer):
      # for a in serializer.validated_data:
      #   print(a)
      user = User.objects.create_user(password=serializer.validated_data['password'], username=serializer.validated_data['username'])
      user.set_password(serializer.validated_data['password'])
      user.save()
      # user_data = UserData.objects.create(user=user, age=serializer.validated_data['age'], file=serializer.validated_data['file'])
      # user_data.save()
      user_data = UserData.objects.create(**serializer.validated_data, user=user)
      return user_data

class UserDataView(viewsets.ModelViewSet):
  serializer_class = UsersDataSerializer
  queryset = UserData.objects.all()

  def perform_create(self, serializer):
    #   serializer.validated_data['user'] = self.request.user
      return super().perform_create(serializer)