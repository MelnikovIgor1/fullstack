from django.db.models import fields
from rest_framework import serializers
from .models import Post
from app.serializers import UserSerializer
from applications.models import Application

# from applications.serializers import ApplicationSerializer

class ApplicationSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  class Meta:
    model = Application
    fields = ['id', 'motivation', 'date_creation', 'status', 'user']
    # read_only_fields = ('date_creation', 'user')
    # fields = ['id', 'text', 'date_creation', 'user']

class PostSerializer(serializers.ModelSerializer):
  user = UserSerializer(read_only=True)
  application_set = ApplicationSerializer(many=True, read_only=True)

  class Meta:
    model = Post
    fields = ['id', 'title', 'description', 'requirements', 'user', 'application_set', 'image']
