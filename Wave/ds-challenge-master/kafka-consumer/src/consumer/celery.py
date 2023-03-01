from __future__ import absolute_import
from celery import Celery

# set the default Django settings module for the 'celery' program.
app = Celery('consumer')

app.config_from_object('consumer.celeryconfig')
app.autodiscover_tasks(['consumer'])
