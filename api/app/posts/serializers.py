from rest_framework import serializers
from .models import Post
from app.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True, read_only=False)
    candidates = UserSerializer(many=True, read_only=False)
    user = UserSerializer(read_only=True)
    # user = Ima(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'requirements', 'user', 'image', 'participants', 'candidates']
        extra_kwargs = {'image': {'required': False}}


# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UsersList
#         fields = ['list']
