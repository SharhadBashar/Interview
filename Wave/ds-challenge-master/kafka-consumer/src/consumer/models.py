from django.db import models
from datetime import datetime


class Message(models.Model):
    date = models.DateTimeField(auto_now=True)
    msg = models.CharField(max_length=1024)

    @classmethod
    def create(cls, msg):
        message = cls()
        message.msg = msg
        message.date = datetime.now()
        return message
