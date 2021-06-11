from django.test import TestCase
from rest_framework import status
from rest_framework.test import (APIRequestFactory, force_authenticate,
                                 APITestCase)
from mixer.backend.django import mixer
from users.models import User
from .views import ProjectModelViewSet
from .models import TODO


class TestProjectViewSet(TestCase):
    def test_get_list_unauthorized(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_authorized(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        admin = User.objects.create_superuser('admin', 'admin@example.local',
                                              'Q1234567q')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestTodoViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/todo_lists/')
        self.client.login(username='django', password='A1234567a')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_todo(self):
        User.objects.create_superuser(username='testuser',
                                      email='testuser@example.local',
                                      password='Q1234567q')
        todo = mixer.blend(TODO)
        self.client.login(username='testuser', password='Q1234567q')
        response = self.client.put(f'/api/todo_lists/{todo.id}/',
                                   {
                                       'text': 'Test text',
                                       'project': todo.project,
                                       'created_by': todo.created_by
                                   })
        print(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
