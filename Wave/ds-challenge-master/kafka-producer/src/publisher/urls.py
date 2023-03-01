# pages/urls.py
from django.urls import path

from .views import HomePageView, SuccessPageView, FailurePageView, submitMessage

urlpatterns = [
    path('', HomePageView.as_view(), name='home'),
    path('success', SuccessPageView.as_view(), name='success'),
    path('failure', FailurePageView.as_view(), name='failure'),
    path('submitMessage', submitMessage, name='submitMessage'),
]