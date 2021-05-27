# Generated by Django 3.2.2 on 2021-05-27 13:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ca_results',
            options={'verbose_name': 'Continous Assessment Result', 'verbose_name_plural': 'Continous Assessment Results'},
        ),
        migrations.AlterModelOptions(
            name='course_venue',
            options={'verbose_name': 'Course Venue', 'verbose_name_plural': 'Course Venue'},
        ),
        migrations.AlterModelOptions(
            name='ue_questions_results',
            options={'verbose_name': 'University Exam Questions Result', 'verbose_name_plural': 'University Exam Questions Results'},
        ),
        migrations.AlterModelOptions(
            name='ue_results',
            options={'verbose_name': 'University Exam Result', 'verbose_name_plural': 'University Exam Results'},
        ),
        migrations.AlterUniqueTogether(
            name='ca_results',
            unique_together={('course', 'student')},
        ),
        migrations.AlterUniqueTogether(
            name='course_venue',
            unique_together={('paper', 'venue')},
        ),
        migrations.AlterUniqueTogether(
            name='ue_results',
            unique_together={('course', 'student')},
        ),
    ]