from reports import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import Group
from django.contrib import admin
<<<<<<< HEAD
from reports.models import *


class ProgramAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Program, ProgramAdmin)


class CourseAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Course, CourseAdmin)


class LecturerAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Lecturer, LecturerAdmin)


class RoleAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Role, RoleAdmin)


class StudentAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Student, StudentAdmin)


class Assessment_CriteriaAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Assessment_Criteria, Assessment_CriteriaAdmin)


class AssessmentAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Assessment, AssessmentAdmin)


class Assessment_ResultsAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(Assessment_Results, Assessment_ResultsAdmin)


class UEAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(UE, UEAdmin)


class UE_ResultsAdmin(admin.ModelAdmin):
    pass
    # list_display = ('',)


admin.site.register(UE_Results, UE_ResultsAdmin)


=======
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from reports import forms
from reports.models import *


>>>>>>> f161519c885dbbd74d63bb4f7868fb2c4b2e5068
class UserAdmin(BaseUserAdmin):
    add_form = forms.UserCreationForm

    list_display = ('username', )
    # list_filter = ('is_admin',)

    fieldsets = (
        (None, {'fields': ('username',  'password')}),
        # ('Permissions', {'fields': ('is_admin',)})
    )
    search_fields = ('username',)
    ordering = ('username', )

    filter_horizontal = ()
<<<<<<< HEAD


admin.site.register(User, UserAdmin)
# admin.site.unregister(Group)
=======
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
>>>>>>> f161519c885dbbd74d63bb4f7868fb2c4b2e5068
