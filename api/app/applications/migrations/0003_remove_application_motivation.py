# Generated by Django 4.0.1 on 2022-01-06 23:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0002_application_date_creation_application_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='motivation',
        ),
    ]
