# Generated by Django 3.0 on 2021-06-28 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backendapi', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ue_questions_results',
            name='academic_year',
            field=models.CharField(choices=[('21', '2020/2021'), ('22', '2021/2022'), ('23', '2022/2023'), ('24', '2023/2024'), ('25', '2024/2025'), ('26', '2025/2026')], default='21', max_length=9),
        ),
        migrations.AddField(
            model_name='ue_results',
            name='academic_year',
            field=models.CharField(choices=[('21', '2020/2021'), ('22', '2021/2022'), ('23', '2022/2023'), ('24', '2023/2024'), ('25', '2024/2025'), ('26', '2025/2026')], default='21', max_length=9),
        ),
    ]
