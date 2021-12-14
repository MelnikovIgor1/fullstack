from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Post
from django.views.generic import ListView, DetailView
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

