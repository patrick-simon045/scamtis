# Generated by Django 3.0 on 2021-05-20 02:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0011_auto_20210520_0326'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='assessment',
            unique_together={('course', 'contribution', 'criteria', 'academic_year', 'date_taken', 'number_of_questions', 'time', 'total_mark')},
        ),
    ]
