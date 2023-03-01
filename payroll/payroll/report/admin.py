from django.contrib import admin

# Register your models here.
from payroll.report.models import TimeSheet, JobGroup

admin.site.register(TimeSheet)
admin.site.register(JobGroup)