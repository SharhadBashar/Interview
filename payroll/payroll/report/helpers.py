import datetime

def last_day_of_month(any_day):
    next_month = any_day.replace(day=28) + datetime.timedelta(days=4)  # this will never fail
    return next_month - datetime.timedelta(days=next_month.day)

def get_pay_period_start_date(date):
    if date < date.replace(day=16):
        return date.replace(day=1)
    else:
        return date.replace(day=16)

def get_pay_period_end_date(date):
    if date < date.replace(day=16):
        return date.replace(day=15)
    else:
        return last_day_of_month(date)
