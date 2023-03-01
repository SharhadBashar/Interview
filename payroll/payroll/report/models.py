from django.db import models

# Create your models here.
from payroll.report.helpers import last_day_of_month


class JobGroup(models.Model):
    label = models.CharField(max_length=100)
    wage = models.DecimalField(decimal_places=2, max_digits=10)

    def __str__(self):
        return "%s" % self.label

    def __unicode__(self):
        return u'%s' % self.label

class TimeSheet(models.Model):
    report_id = models.IntegerField()
    employee_id = models.IntegerField()
    hours_worked = models.DecimalField(decimal_places=2, max_digits=10)
    job_group = models.ForeignKey(JobGroup, on_delete=models.CASCADE)
    date = models.DateField()
    pay_period_start_date = models.DateField(null=True)
