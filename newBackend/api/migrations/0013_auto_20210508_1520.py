# Generated by Django 3.0 on 2021-05-08 14:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20210508_1446'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lecturer',
            name='role',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='api.Role'),
        ),
    ]
