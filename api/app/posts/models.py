from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    # user = models.CharField(max_length=100),
    requirements = models.TextField()
    # candidates = models.ManyToManyRel(User, through='Me2mbership')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images')
    participants = models.ManyToManyField(User, related_name='participants', verbose_name="participants list")
    candidates = models.ManyToManyField(User, related_name='candidates', verbose_name="participants list")

    def __str__(self):
        return self.title
