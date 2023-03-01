import csv
import io
import re

from django.db import transaction
from django.db.models.aggregates import Sum
from django.db.models import F
from django.shortcuts import render
from datetime import datetime
from rest_framework import viewsets, status

# Create your views here.
from rest_framework.decorators import list_route, action
from rest_framework.response import Response

from payroll.report.helpers import get_pay_period_start_date, get_pay_period_end_date
from payroll.report.models import TimeSheet, JobGroup
from payroll.report.serializers import TimeSheetSerializer, JobGroupSerializer

class ReportViewSet(viewsets.ViewSet):
    def list(self, request):
        report = []
        for row in TimeSheet.objects \
                .order_by('employee_id', 'pay_period_start_date') \
                .values('employee_id', 'pay_period_start_date') \
                .annotate(amount_paid=Sum(F("hours_worked") * F("job_group__wage"))):
            pay_period_start_date = row.get('pay_period_start_date')
            report.append({
                "employee_id": row.get('employee_id'),
                "pay_period": "%s - %s" % (
                    pay_period_start_date.strftime("%d/%m/%Y"),
                    get_pay_period_end_date(pay_period_start_date).strftime("%d/%m/%Y")),
                "amount_paid": row.get('amount_paid')
            })
        return Response(report, status=status.HTTP_200_OK)

    @transaction.atomic
    @action(detail=False, methods=['POST'])
    def upload(self, request):
        csv_file = request.FILES['file']
        decoded_file = csv_file.read().decode('utf-8')
        rows = decoded_file.strip().split("\n")
        report_id = int(re.sub("[^0-9]", "", rows.pop(-1)))
        io_string = io.StringIO("\n".join(rows))
        reader = csv.DictReader(io_string)
        if TimeSheet.objects.filter(report_id=report_id).exists():
            return Response("csv with same report id has already been uploaded", status=status.HTTP_400_BAD_REQUEST)

        for row in reader:
            job_group = JobGroup.objects.get(label=row['job group'])
            date = datetime.strptime(row['date'], "%d/%m/%Y")
            TimeSheet.objects.create(report_id=report_id,
                                     employee_id=int(row['employee id']),
                                     job_group=job_group,
                                     hours_worked=float(row['hours worked']),
                                     date=date,
                                     pay_period_start_date=get_pay_period_start_date(date)
                                     )

        return Response(status=status.HTTP_204_NO_CONTENT)

class TimeSheetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = TimeSheet.objects.all()
    serializer_class = TimeSheetSerializer


class JobGroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = JobGroup.objects.all()
    serializer_class = JobGroupSerializer
