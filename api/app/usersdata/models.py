from django.db import models
from django.contrib.auth.models import User

class UserData(models.Model):
    username = models.TextField()
    password = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    file = models.ImageField(upload_to='post_files')

    def __str__(self):
        return self.username
