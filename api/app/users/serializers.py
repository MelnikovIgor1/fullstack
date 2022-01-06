from rest_framework import serializers
from .models import UserData
from app.serializers import UserSerializer

class UserDataSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = UserData
        fields = ['username', 'password', 'user', 'age', 'file']
        read_only_fields = ['user']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    


# class UserSerializer(serializers.ModelSerializer):
#   class Meta:
#     model = User
#     fields = ['id', 'username', 'password']
#     extra_kwargs = {
#       'password': {'write_only': True}
#     }