from rest_framework import serializers
from .models import Result, CA_Item, Lecture_Course, Assessment


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['id', 'first_question', 'second_question',
                  'third_question', 'fourth_question']


class CA_ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CA_Item
        fields = ['ca_item_name']


class AssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assessment
        fields = ['id', 'criteria', 'course', 'academic_year',
                  'date_taken', 'number_of_questions', 'contribution']


class LecturerCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture_Course
        fields = ['lecturer', 'course', 'academic_year']
