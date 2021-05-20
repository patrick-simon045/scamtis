from django.urls import path
from reports.api.views import LecturerCourseListView
urlpatterns = [
    path('courses/', LecturerCourseListView.as_view()),
]
