"""chatapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import index, chatroom, get_all_messages, login_user, update_login_time, get_pending_count

urlpatterns = [
    path('', index, name= 'index'),
    path('login/', login_user, name='login_user'),
    path('room/<str:u1_id>/<str:u2_id>/', chatroom, name="chatroom"),
    path('updatelogin/', update_login_time, name='updatelogin'),
    path('updatenotification/',get_pending_count, name='updatenotification'),

    path('messages/<str:rid>/<str:user_id>/', get_all_messages, name="allmessages")
]
