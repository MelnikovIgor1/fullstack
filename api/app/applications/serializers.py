from django.db.models import fields
from rest_framework import serializers
from .models import Application
from posts.serializers import PostSerializer
from app.serializers import UserSerializer


class ApplicationSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = Application
    fields = ['id', 'status', 'post', 'date_creation', 'user']
    read_only_fields = ('date_creation', 'user')
    # fields = ['id', 'motivation', 'post', 'status']
    # read_only_fields = ('date_creation', 'user')