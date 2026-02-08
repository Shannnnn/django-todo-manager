from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register(r'tasks', TodoViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
]
