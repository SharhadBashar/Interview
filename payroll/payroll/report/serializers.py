from rest_framework import serializers

from payroll.report.models import TimeSheet, JobGroup

class TimeSheetSerializer(serializers.ModelSerializer):
    hours_worked = serializers.FloatField()
    date = serializers.DateField()
    class Meta:
        model = TimeSheet
        fields = '__all__'


class JobGroupSerializer(serializers.ModelSerializer):
    wage = serializers.FloatField()
    class Meta:
        model = JobGroup
        fields = '__all__'
