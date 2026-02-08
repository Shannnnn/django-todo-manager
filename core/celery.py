import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
app = Celery('core')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
app.conf.beat_schedule = {
    'send-reminders-every-hour': {
        'task': 'tasks.tasks.check_overdue_tasks',
        'schedule': 3600.0, # seconds
    },
}
