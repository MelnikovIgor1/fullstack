from django.db import models
from django.contrib.auth.models import User
from posts.models import Post

class Application(models.Model):
    motivation = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    status = models.CharField(max_length=100)
    date_creation = models.DateField()

    def __str__(self):
        length = 30
        cont = '{}'.format(self.motivation)
        if len(cont) >= length:
            cont = cont[:length - 3] + "..."

        return cont