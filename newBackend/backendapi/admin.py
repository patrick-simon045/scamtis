from django.contrib import admin
from .models import *


class LecturerCriteriaAdmin(admin.ModelAdmin):
    list_display = ('lecturer', 'assessmentCriteria', 'ca_contribution')


admin.site.register(LecturerCriteria, LecturerCriteriaAdmin)


# admin.site.register(Lecturer)
class LecturerAdmin(admin.ModelAdmin):
    list_display = ('lecturer', 'role')


admin.site.register(Lecturer, LecturerAdmin)

admin.site.register(Role)
admin.site.register(Result)
admin.site.register(Program)
admin.site.register(Course)


# admin.site.register(Program_Course)
class Program_CourseAdmin(admin.ModelAdmin):
    list_display = ('course', 'program', 'year_of_study')


admin.site.register(Program_Course, Program_CourseAdmin)


# admin.site.register(Lecture_Course)

class Lecture_CourseAdmin(admin.ModelAdmin):
    list_display = ('lecturer', 'course','assessmentCriteria', 'academic_year')


admin.site.register(Lecture_Course, Lecture_CourseAdmin)


# admin.site.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'regno', 'program')


admin.site.register(Student, StudentAdmin)

admin.site.register(Assessment_Criteria)


# admin.site.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = (
        'course', 'criteria', 'number_of_questions', 'total_mark', 'contribution', 'date_taken',
        'time')


admin.site.register(Assessment, AssessmentAdmin)


# admin.site.register(Assessment_Results)
class Assessment_ResultsAdmin(admin.ModelAdmin):
    list_display = ('assessment', 'student', 'question_number', 'total_score', 'score')


admin.site.register(Assessment_Results, Assessment_ResultsAdmin)

admin.site.register(UE)
admin.site.register(UE_Results)
