# Generated by Django 3.0 on 2021-05-26 08:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0027_auto_20210526_0945'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='assessment_results',
            unique_together={('assessment', 'student', 'score')},
        ),
        migrations.RemoveField(
            model_name='assessment_results',
            name='question_number',
        ),
        migrations.RemoveField(
            model_name='assessment_results',
            name='total_score',
        ),
    ]
