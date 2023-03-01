#!/bin/bash
export DJANGO_SETTINGS_MODULE=config.settings
if [[ -z "${KAFKA_WORKER}" ]]; then
  echo "Running application"
  python manage.py makemigrations
  python manage.py migrate
  rm celerybeat.pid
  rm celerybeat-schedule
  celery -A consumer beat -l warning &
  uwsgi --http :8000 --module config.wsgi
else
  echo "Running celery"
  celery -A consumer worker -l warning
fi
