from typing import OrderedDict

from django.db.models import query
from django.http.response import JsonResponse
from reports.api import serializers
from rest_framework import generics
from reports import models


class LecturerCourseListView(generics.ListAPIView):
    serializer_class = serializers.LecturerCourseSerializer
    queryset = models.Lecture_Course.objects.all()

    def get(self, request, *args, **kwargs):
        qs = models.Lecture_Course.objects.filter(
            lecturer__user__username=request.user)
        serializer = self.serializer_class(qs, many=True)
        return JsonResponse(serializer.data, safe=False)
