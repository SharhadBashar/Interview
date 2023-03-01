from core.models import User
from core.permissions import CreateOnlyPermissions
from core.serializers import (UserLoginSerializer, UserRegistrationSerializer,
                              UserSerializer)
from django.contrib.auth import authenticate
from django.shortcuts import render
from rest_framework import generics, mixins, permissions, status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response


def index(request):
    return render(request, "index.html")


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    authentication_classes = ()
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        """
        Validate user credentials, login, and return serialized user + auth token.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        # If the serializer is valid, then the email/password combo is valid.
        # Get the user entity, from which we can get (or create) the auth token
        user = authenticate(**serializer.validated_data)
        if user is None:
            raise ValidationError(detail="Incorrect email and password combination. Please try again.")

        response_data = UserLoginSerializer.login(user, request)
        return Response(response_data)


# TODO Add endpoints here
