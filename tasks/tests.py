from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import TodoTask

class TodoTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password123')
        self.client.force_authenticate(user=self.user)

    def test_create_todo(self):
        url = '/api/tasks/'
        data = {'title': 'Finish App 1', 'due_date': '2026-12-31T23:59:59Z'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TodoTask.objects.count(), 1)
