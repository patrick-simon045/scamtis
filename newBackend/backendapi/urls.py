from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'results', views.ResultsViewset)
router.register(r'ca_items', views.CA_ItemsViewset)

urlpatterns = [
    path('', include(router.urls)),
    path('lecturers/', views.lecturer_details, name='rest_framework')
]
