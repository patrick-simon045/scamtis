# Generated by Django 3.0 on 2021-05-27 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0037_auto_20210527_1609'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='sum',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]
