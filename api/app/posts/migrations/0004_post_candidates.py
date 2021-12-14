# Generated by Django 4.0 on 2021-12-12 16:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0003_post_participants_alter_post_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='candidates',
            field=models.ManyToManyField(related_name='candidates', to=settings.AUTH_USER_MODEL, verbose_name='participants list'),
        ),
    ]
