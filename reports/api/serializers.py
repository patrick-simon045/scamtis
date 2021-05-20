from rest_framework import serializers
from reports.models import *


class LecturerCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture_Course
        fields = ['course']
