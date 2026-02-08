from celery import shared_task
from django.utils import timezone
from .models import TodoTask
from django.core.mail import send_mail

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

        send_mail(
            subject=f"Task Overdue: {task.title}",
            message=f"Hi {task.user.username}, your task is past its due date!",
            from_email="noreply@todo.com",
            recipient_list=[task.user.email],
        )

    return f"Processed {overdue_tasks.count()} tasks."
