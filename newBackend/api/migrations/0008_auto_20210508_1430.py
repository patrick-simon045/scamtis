# Generated by Django 3.0 on 2021-05-08 13:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0007_auto_20210508_1428'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lecturer',
            name='id',
        ),
        migrations.AlterField(
            model_name='lecturer',
            name='lecturer',
            field=models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
