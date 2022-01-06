import re
from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import serializers
from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import permissions

def index(request):
  print('hello', request)
  return HttpResponse('Привет, мир!')

class PostListView(viewsets.ModelViewSet):
  serializer_class = PostSerializer
  queryset = Post.objects.all()
  # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  def perform_create(self, serializer):
    serializer.validated_data['user'] = self.request.user
    # serializer.validated_data['participants'] = []
    return super().perform_create(serializer)
  
# @api_view(['GET', 'POST'])
# def post_list(request):
#   if request.method == 'GET':
#     posts = Post.objects.all()
#     serializer = PostSerializer(posts, many=True)
#     return Response(serializer.data)
#   elif request.method == 'POST':
#     serializer = PostSerializer(request.data)
#     serializer. save()
#     return Response(serializer.data, status=status.HTTP_200_OK)
