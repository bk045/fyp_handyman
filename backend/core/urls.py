from django.urls import path, include
from . import views

urlpatterns = [
    path('activate_account/<str:uid>/<str:token>', views.activate_account),
    path('reset_password/<str:uid>/<str:token>', views.reset_password),
    path ('check_user_status/', views.check_user_status)
] 