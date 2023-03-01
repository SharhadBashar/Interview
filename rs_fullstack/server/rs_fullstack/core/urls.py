from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path, re_path
from rest_auth import views as rest_auth_views
from rest_framework_nested import routers

from rs_fullstack.core import views as core_views

router = routers.SimpleRouter()
if settings.DEBUG:
    router = routers.DefaultRouter()

router.register("users", core_views.UserViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/login/", core_views.UserLoginView.as_view()),
    path(r"api/logout/", rest_auth_views.LogoutView.as_view()),
    path(
        r"api/password/reset/confirm/",
        rest_auth_views.PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(r"api/password/reset/", rest_auth_views.PasswordResetView.as_view()),
    path(r"api/password/change/", rest_auth_views.PasswordChangeView.as_view()),
]

if settings.DEBUG:  # pragma: no cover
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += [path("api-auth/", include("rest_framework.urls"))]

urlpatterns += [
    re_path(r".*", core_views.index),
]
