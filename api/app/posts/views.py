from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Post
from django.views.generic import ListView, DetailView
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

def index(request):
    posts = Post.objects.all()
    print('hello', posts)
    # main_post = Post.objects.get(id=1)
    return render(request, 'posts/postList.html', {'posts': posts})


class PostList(ListView):
    template_name = 'posts/postList.html'
    model = Post
    context_object_name = 'posts'


class PostDetails(DetailView):
    template_name = 'posts/postDetails.html'
    model = Post
    context_object_name = 'post'


@api_view(['get', 'post'])
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = PostSerializer(request.data)
        print(serializer)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
