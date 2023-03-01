from django import forms


class MessageForm(forms.Form):
    message = forms.CharField(label='message')

    def clean_message(self):
        return self.cleaned_data['message']
