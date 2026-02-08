from celery import shared_task
from django.utils import timezone
from .models import TodoTask

@shared_task
def check_overdue_tasks():
    # Find tasks that are past due, not finished, and haven't been notified yet
    now = timezone.now()
    overdue_tasks = TodoTask.objects.filter(
        due_date__lt=now,
        is_completed=False,
        reminder_sent=False
    )

    for task in overdue_tasks:
        # In a real app, you'd send an email here
        print(f"REMINDER: Task '{task.title}' for user {task.user.username} is overdue!")

        # Mark as sent so we don't spam the user
        task.reminder_sent = True
        task.save()

    return f"Processed {overdue_tasks.count()} tasks."
