# Generated by Django 3.0 on 2021-05-20 03:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0017_auto_20210520_0404'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='assessment_results',
            unique_together={('assessment', 'student', 'question_number', 'total_score', 'score')},
        ),
    ]
