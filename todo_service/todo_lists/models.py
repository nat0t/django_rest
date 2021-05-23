from django.db import models

from todo_service.users.models import User


class Project(models.Model):
    name = models.CharField(max_length=128, unique=True)
    repo_link = models.URLField(blank=True)
    users = models.ManyToManyField(User)


class TODO(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
