from django.views.generic import TemplateView, FormView
from django.shortcuts import render
from . kafka import Kafka
from . forms import MessageForm

kafka = Kafka()


class HomePageView(FormView):
    template_name = 'index.html'
    form_class = MessageForm
    success_url = '/success.html'

    def form_valid(self, form):
        return super().form_valid()


class SuccessPageView(TemplateView):
    template_name = 'success.html'


class FailurePageView(TemplateView):
    template_name = 'failure.html'


def submitMessage(request):
    # if this is a POST request we need to process the form data
    print('Submitting message')
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = MessageForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            message = form.cleaned_data['message']
            try:
                kafka.sendMessage(message)
                return render(request, './success.html')
            except Exception as e:
                return render(request, './failure.html', {'exception': e})
        else:
            print('Form is not valid')
