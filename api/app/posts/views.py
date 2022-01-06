from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Post
from django.views.generic import ListView, DetailView, CreateView, UpdateView
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from app.serializers import UserSerializer
from django.shortcuts import get_object_or_404
from usersdata.models import UserData

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


class PostUpdate(UpdateView):
  template_name = 'posts/postUpdate.html'
  model = Post
  context_object_name = 'form'
  fields = ['participants', 'candidates']

#   def dispatch(self, request, pk):
#     post = Post.objects.get(id=pk)
#     # if post.user == request.user:
#     return super().dispatch(request)
    # return HttpResponseNotFound()
    
  def get_success_url(self):
    return reverse('post_details', args=(self.object.id,))


class PostListView(viewsets.ModelViewSet):
  serializer_class = PostSerializer
  queryset = Post.objects.all()

  def perform_create(self, serializer):
    #   serializer.validated_data['user'] = self.request.user
      return super().perform_create(serializer)
