from django.contrib.auth.views import LogoutView, LoginView
from django.db.models import signals

from django.views.generic import CreateView
from rest_framework import viewsets, mixins
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
# from users.models import UserData
# from .send_mail import send_mail


# class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
#   serializer_class = UserSerializer
#   queryset = User.objects.all()

#   def perform_create(self, serializer):
#       user = User.objects.create_user(**serializer.validated_data)
#       user.set_password(serializer.validated_data['password'])
#       return user


class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
  serializer_class = UserSerializer
  queryset = User.objects.all()

  def perform_create(self, serializer):
      user = User.objects.create_user(**serializer.validated_data)
      user.set_password(serializer.validated_data['password'])
      return user

class CurrentUser(APIView):
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
        
def post_user_save(signal, **kwargs):
  print(kwargs['instance'])
  # send_mail(kwargs['instance'].email, kwargs['instance'].username)

signals.post_save.connect(post_user_save, sender=User)

class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
  serializer_class = UserSerializer
  queryset = User.objects.all()

  def perform_create(self, serializer):
      print(serializer.validated_data['age'])
      user = User.objects.create_user(**serializer.validated_data)
      user.set_password(serializer.validated_data['password'])
      # user_data = UserData.objects.create(user=user, age=serializer.validated_data['age'], file=serializer.validated_data['file'])
      # user_data.save()
      return user

class CurrentUser(APIView):
  def get(self, request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)