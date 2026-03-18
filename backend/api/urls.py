from django.urls import path
from .views import get_students, create_student, filter_students

urlpatterns = [
    path('students/', get_students, name='get_students'),
    path('insert/', create_student, name='create_student'),
    path('filter/', filter_students, name='filter_students'),
]