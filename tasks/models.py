from django.db import models
from django.contrib.auth.models import User

class TodoTask(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField()
    is_completed = models.BooleanField(default=False)

    reminder_sent = models.BooleanField(default=False)

class Meta:
    ordering = ['-due_date']