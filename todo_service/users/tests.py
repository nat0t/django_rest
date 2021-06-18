from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import User


class TestUserViewSet(TestCase):
    def test_get_detail(self):
        user = User.objects.create(username='testuser',
                                   email='testuser@example.local',
                                   password='Q1234567q')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
