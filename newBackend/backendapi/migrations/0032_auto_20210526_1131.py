# Generated by Django 3.0 on 2021-05-26 10:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0031_result_sum'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='program_course',
            name='is_compulsory',
        ),
        migrations.RemoveField(
            model_name='result',
            name='sum',
        ),
        migrations.AddField(
            model_name='program_course',
            name='course_type',
            field=models.CharField(choices=[('core', 'Core'), ('optional', 'Optional')], default='core', max_length=10, null=True),
        ),
    ]
