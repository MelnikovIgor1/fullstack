from django.db import models
from django.contrib.auth.models import User
from django.core.validators import int_list_validator

class Post(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    # user = models.CharField(max_length=100),
    requirements = models.TextField()
    # candidates = models.ManyToManyRel(User, through='Me2mbership')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images')
    # participants = models.CharField(validators=[int_list_validator], max_length=100)
    # candidates = models.CharField(validators=[int_list_validator], max_length=100)

    def __str__(self):
        length = 30
        cont = '{}: {}'.format(self.title, self.description)
        if len(cont) >= length:
            cont = cont[:length - 3] + "..."

        return cont