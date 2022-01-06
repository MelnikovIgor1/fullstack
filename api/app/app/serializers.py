from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username', 'password']
    extra_kwargs = {
      'password': {'write_only': True}
    }
  # def _is_my_find(self, obj):
  #   user_id = self.context.get("age")
  #   if user_id:
  #       return user_id in obj.my_objects.values_list("user_id", flat=True)
  #   return False