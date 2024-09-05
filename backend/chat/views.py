from django.shortcuts import render, redirect
from .models import Room, Message
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from datetime import datetime
from django.contrib.auth import authenticate, login
from django.db.models import Q
from core.models import AppUser

def login_user(request):
    if not request.user.is_anonymous:
        return redirect('index')

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            last_login = user.last_login
            login(request, user)
            if last_login is not None:
                user.last_login = last_login
                user.save()
            else:
                rooms = Room.objects.filter(Q(user1=user) | Q(user2=user))
                m = Message.objects.filter(room__in=rooms).order_by('timestamp').first()
                if m.timestamp is not None:
                    user.last_login = m.timestamp
                user.save()

            return redirect('index')

    return render(request, 'chat/login.html')


@login_required
def index(request):
    info = []
    for user in AppUser.objects.all().exclude(id=request.user.id):  #optimization: filter only user that have had conversation
        room = Room.objects.filter(user1__in=[request.user, user], user2__in=[request.user, user]).first()
        if user.last_login is not None:
            messages = Message.objects.filter(room=room, timestamp__gte=request.user.last_login).count()
        else:
            messages = 0
        info.append({
            'id':user.id,
            'username':user.email,
            'count':messages
        })
    context = {
        'users':info
    }
    return render(request, 'chat/index.html', context)

def chatroom(request, u1_id, u2_id):
    user1 = AppUser.objects.get(id=u1_id)
    user1.last_chat_room_access = datetime.now()
    
    user1.save()
    user2 = AppUser.objects.get(id=u2_id)
    if user1 is not None and user2 is not None:
        try:
            room = Room.objects.get(user1_id__in=[u1_id, u2_id], user2_id__in=[u1_id, u2_id])
            messages = Message.objects.filter(room=room)
        except Exception as e:
            room = Room.objects.create(user1 = user1, user2=user2)
            messages = None
        context = {
            'rid':room.id,
            'u1_name':user1.email,
            'u2_name':user2,
            'messages':messages,
            'main_user':u1_id,
        }
        return render(request, 'chat/chat.html', context)
    else:
        return redirect('index')


def get_all_messages(request, rid, user_id):
    room = Room.objects.get(id=rid)
    user = AppUser.objects.get(id=user_id)
    if request.POST.get('message') is not None :
        Message.objects.create(user=user, room=room, message=request.POST.get('message'))
    messages = Message.objects.filter(room=room)
    m_json = get_messages_json(messages)
    return JsonResponse(m_json, safe=False)


def get_messages_json(messages):
    all_messages = []
    for message in messages:
        all_messages.append(get_message_json(message))
    return all_messages


def get_message_json(message):
    return {
        'message':message.message,
        'user':message.user.id
    }

def get_pending_count(request):
    info = []
    for user in AppUser.objects.all().exclude(
            id=request.user.id):  # optimization: filter only user that have had conversation
        room = Room.objects.filter(user1__in=[request.user, user], user2__in=[request.user, user]).first()
        if user.last_login is not None:
            messages = Message.objects.filter(room=room, timestamp__gte=request.user.last_login).count()
        else:
            messages = 0
        info.append({
            'id': user.id,
            'count': messages
        })
    return JsonResponse(info, safe=False)


def update_login_time(request):
    request.user.last_login = datetime.now()
    request.user.save()
    print("Working:", request.user.last_login)
    return HttpResponse(status=200)