from django.shortcuts import render, redirect
import json
import requests
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from handyman.models import *
from handyman.serializers import *
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
# import requests
# Create your views here.

def activate_account (request, uid, token):
    if (request.method=='POST'):
        headers={
            # 'Authorization':
            'Content-Type':'application/json'
        }
        payload=json.dumps({
            "uid":uid,
            "token":token,
        })
        response = requests.request('POST', 'http://127.0.0.1:8000/handyman/auth/users/activation/', headers=headers, data=payload)
        if(response.status_code==204):
            return redirect('http://localhost:3000/handyman/login')
        elif(response.status_code):
            print(response.json())
        else:
            print('Produce your ID')
    return render(request,'account_activation.html', context={})


def reset_password (request, uid, token):
    if (request.method=='POST'):
        password = request.POST.get('password')
        cpassword = request.POST.get('cpassword')
        headers={
            # 'Authorization':
            'Content-Type':'application/json'
        }
        payload=json.dumps({
            "uid":uid,
            "token":token,
            "new_password":password,
        })
        if (password==cpassword):
            response = requests.request('POST', 'http://127.0.0.1:8000/handyman/auth/users/reset_password_confirm/', headers=headers, data=payload)
            if(response.status_code==204):
                return redirect('http://localhost:3000/handyman/login')
            elif(response.status_code==400):
                print(response.json())
            else:
                print('Produce your ID')
        else:
            print("Enter Same password")
    return render(request,'reset_password.html', context={})

@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])
def check_user_status(request):
    if request.method == 'POST':
        try:
            user = AppUser.objects.get(email = request.data['email'])
        except:
            return Response('No User')
        if (user.is_deleted==False):
            return Response("Active")
        else:
            return Response("Deleted")
        # return Response(serilizer.data, status=status.HTTP_201_CREATED)