from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from reports import forms
from reports.models import *


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
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)