from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    CV = models.FileField(upload_to='post_files')

    def __str__(self):
        return self.age
