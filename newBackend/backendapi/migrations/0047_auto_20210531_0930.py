# Generated by Django 3.0 on 2021-05-31 08:30

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0046_auto_20210531_0928'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='credits',
            field=models.IntegerField(default=12, validators=[django.core.validators.MaxValueValidator(16), django.core.validators.MinValueValidator(8)]),
        ),
    ]
