from rest_framework import serializers
from .models import Result, Assessment_Criteria, Lecture_Course


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['id', 'name', 'first_question', 'second_question', 'third_question', 'fourth_question']


class AssessmentCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment_Criteria
        fields = ['criteria_name']


class LecturerCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture_Course
        fields = ['lecturer', 'course', 'academic_year', 'assessmentCriteria']
