from django.shortcuts import render, redirect
# from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, DestroyModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.response import Response
from rest_framework.decorators import action,api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework import viewsets

import json
import requests

from .models import *
from core.models import AppUser
from core.models import *
from .serializers import *
from .permissions import IsAdminOrReadOnly, IsAuthenticatedAndCustomer
from datetime import datetime as dt

# Create your views here.
def home(request):
    # users = IndividualCatererProfile.objects.prefetch_related('services').all()
    # for user in users:
    #     for service in user.services.all():
    #         print(user, service)
    # user = AppUser.objects.select_related('i_caterer').get(id = 99)
    # print(user.i_caterer.last_name)

    # usr = IndividualCatererProfile.objects.prefetch_related('services').get(user= user)
    # # print (usr.first_name, usr.services)
    
    # for service in usr.services.all():
    #     print(usr.first_name, service)

    # services = Service.objects.prefetch_related('i_caterers').all()
    # for service in services:
    #     for user in service.i_caterers.all():
    #         print(service, user)
    return render(request, 
                  'index.html', 
                #   context={'users':users}
                  )

# def activate_account (request, uid, token):
#     if (request.method=='POST'):
#         headers={
#             # 'Authorization':
#             'Content-Type':'application/json'
#         }
#         payload=json.dumps({
#             "uid":uid,
#             "token":token,
#         })
#         response = requests.request('POST', 'http://127.0.0.1:8000/handyman/auth/users/activation/', headers=headers, data=payload)
#         if(response.status_code==204):
#             return redirect('http://localhost:3000/handyman/login')
#         elif(response.status_code):
#             print(response.json())
#         else:
#             print('Produce your ID')
#     return render(request,'account_activation.html', context={})


# def reset_password (request, uid, token):
#     if (request.method=='POST'):
#         password = request.POST.get('password')
#         cpassword = request.POST.get('cpassword')
#         headers={
#             # 'Authorization':
#             'Content-Type':'application/json'
#         }
#         payload=json.dumps({
#             "uid":uid,
#             "token":token,
#             "new_password":password,
#         })
#         if (password==cpassword):
#             response = requests.request('POST', 'http://127.0.0.1:8000/handyman/auth/users/reset_password_confirm/', headers=headers, data=payload)
#             if(response.status_code==204):
#                 return redirect('http://localhost:3000/handyman/login')
#             elif(response.status_code==400):
#                 print(response.json())
#             else:
#                 print('Produce your ID')
#         else:
#             print("Enter Same password")
#     return render(request,'reset_password.html', context={})

# @api_view(['POST'])
# @permission_classes([AllowAny])
# @authentication_classes([])
# def check_user_status(request, *args, **kwargs):
#     if request.method == 'POST':
#         try:
#             print("Request", request.data)
#             user = AppUser.objects.get(email = request.data['email'])
#             print(user)
#         except:
#             return Response('No User')
#         if (user.is_deleted==False):
#             return Response("Active")
#         else:
#             return Response("Deleted")
#         # return Response(serilizer.data, status=status.HTTP_201_CREATED)

@api_view(["GET"])  
def cancelled_request_count(request, *args, **kwargs):
        cancelled_request_count = Requests.objects.filter(req_status='Cancelled').count()
        return Response({'cancelled_req_count':cancelled_request_count},status.HTTP_200_OK)

@api_view(["GET"])  
def accepted_request_count(request, *args, **kwargs):
        accepted_request_count = Requests.objects.filter(req_status='Accepted').count()
        return Response({'accepted_req_count':accepted_request_count},status.HTTP_200_OK)

@api_view(["GET"])  
def completed_request_count(request, *args, **kwargs):
        completed_request_count = Requests.objects.filter(req_status='Completed').count()
        return Response({'completed_req_count':completed_request_count},status.HTTP_200_OK)

@api_view(["GET"])  
def placed_request_count(request, *args, **kwargs):
        placed_request_count = Requests.objects.filter(req_status='Placed').count()
        return Response({'placed_req_count':placed_request_count},status.HTTP_200_OK)

@api_view(["GET"])  
def active_user_count(request, *args, **kwargs):
        active_user_count = AppUser.objects.filter(profile_status='Active').count()
        return Response({'active_user_count':active_user_count},status.HTTP_200_OK)

@api_view(["GET"])  
def deleted_user_count(request, *args, **kwargs):
        deleted_user_count = AppUser.objects.filter(is_deleted=True).count()
        return Response({'deleted_user_count':deleted_user_count},status.HTTP_200_OK)

@api_view(["GET"])  
def blocked_user_count(request, *args, **kwargs):
        blocked_user_count = AppUser.objects.filter(profile_status='Blocked').count()
        return Response({'blocked_user_count':blocked_user_count},status.HTTP_200_OK)

@api_view(["GET"])  
def pending_user_count(request, *args, **kwargs):
        pending_user_count = AppUser.objects.filter(profile_status='Pending').count()
        return Response({'pending_user_count':pending_user_count},status.HTTP_200_OK)

@api_view(["GET"])  
def active_i_customer_count(request, *args, **kwargs):
        active_i_customer_count = AppUser.objects.filter(profile_status='Active').filter(user_type='i-customer').count()
        return Response({'active_i_customer_count':active_i_customer_count},status.HTTP_200_OK)

@api_view(["GET"])  
def active_i_caterer_count(request, *args, **kwargs):
        active_i_caterer_count = AppUser.objects.filter(profile_status='Active').filter(user_type='i-caterer').count()
        return Response({'active_i_caterer_count':active_i_caterer_count},status.HTTP_200_OK)

def active_b_caterer_count(request, *args, **kwargs):
        active_b_caterer_count = AppUser.objects.filter(profile_status='Active').filter(user_type='b-caterer').count()
        return Response({'active_b_caterer_count':active_b_caterer_count},status.HTTP_200_OK)

@api_view(["GET"])  
def active_b_customer_count(request, *args, **kwargs):
        active_b_customer_count = AppUser.objects.filter(profile_status='Active').filter(user_type='b-customer').count()
        return Response({'active_b_customer_count':active_b_customer_count},status.HTTP_200_OK)
    
class ServiceMenuViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceMenuSerilizer

    @action(detail=True, methods=['GET'], url_path='(?P<caterer_id>[^/.]+)')
    def mine(self, request, caterer_id, pk=None):
        user = AppUser.objects.get(id=caterer_id)
        if request.method == 'GET':
            if (user.user_type == 'i-caterer'):
                user_profile = IndividualCatererProfile.objects.prefetch_related('services').get(user_id = caterer_id)
                serializer = ServiceMenuSerilizer(user_profile.services.all(), many=True)
                return Response(serializer.data)
            if (user.user_type == 'b-caterer'):
                user_profile = BusinessCatererProfile.objects.get(user = user)
                user_services = Service.objects.filter(b_caterers__in = [user_profile.id])
                serializer = ServiceMenuSerilizer(user_services, many=True)
                return Response(serializer.data)

# To list all the business categories entered.
class BusinessTypesViewSet(ModelViewSet):
    queryset= BusinessTypes.objects.all()
    serializer_class=BusinessTypesSerializer

# To list all the app users with basic info
class AppUserViewSet(ListModelMixin, RetrieveModelMixin, DestroyModelMixin, GenericViewSet):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerilizer

    def destroy(self, request, *args, **kwargs):
        user = AppUser.objects.get(id = self.kwargs['pk'])
        user.is_deleted=True
        user.profile_status="Blocked"
        if (user.user_type=='i-customer'):
            IndividualCustomerProfile.objects.filter(user = user).update(is_deleted=True)
        elif (user.user_type == 'i-caterer'):
            IndividualCatererProfile.objects.filter(user = user).update(is_deleted=True)
        elif (user.user_type == 'b-caterer'):
            BusinessCatererProfile.objects.filter(user = user).update(is_deleted=True)
        elif (user.user_type == 'b-customer'):
            BusinessCustomerProfile.objects.filter(user = user).update(is_deleted=True)
        user.save()
        return Response("User Deleted", status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['PATCH'], url_name='activate')
    def activate(self, request, *args, **kwargs):
        user = AppUser.objects.get(id=self.kwargs['pk'])
        user.profile_status = 'Active'
        user.save()
        serilizer = AppUserSerilizer(user)
        return Response(serilizer.data, status.HTTP_200_OK)
    
    @action(detail=True, methods=['PATCH'], url_name='block')
    def block(self, request, *args, **kwargs):
        user = AppUser.objects.get(id=self.kwargs['pk'])
        user.profile_status = 'Blocked'
        user.save()
        serilizer = AppUserSerilizer(user)
        return Response(serilizer.data, status.HTTP_200_OK)
    
    @action(detail=True, methods=['PATCH'], url_name='suspend')
    def suspend(self, request, *args, **kwargs):
        user = AppUser.objects.get(id=self.kwargs['pk'])
        user.profile_status = 'Pending'
        user.save()
        serilizer = AppUserSerilizer(user)
        return Response(serilizer.data, status.HTTP_200_OK)
    
    @action(detail=True, methods=['PATCH'], url_name='recover')
    def recover(self, request, *args, **kwargs):
        user = AppUser.objects.get(id = self.kwargs['pk'])
        user.is_deleted=False
        user.profile_status='Active'
        if (user.user_type=='i-customer'):
            IndividualCustomerProfile.objects.filter(user = user).update(is_deleted=False)
        elif (user.user_type == 'i-caterer'):
            IndividualCatererProfile.objects.filter(user = user).update(is_deleted=False)
        elif (user.user_type == 'b-caterer'):
            BusinessCatererProfile.objects.filter(user = user).update(is_deleted=False)
        elif (user.user_type == 'b-customer'):
            BusinessCustomerProfile.objects.filter(user = user).update(is_deleted=False)
        user.save()
        serilizer = AppUserSerilizer(user)
        return Response(serilizer.data, status.HTTP_200_OK)


# To list profile according to user type with the help of user_pk
class ProfileViewSet(ModelViewSet):
    def get_serializer_class(self):
        user = AppUser.objects.get(id=self.kwargs['user_pk'])
        if (user.user_type == 'i-caterer'):
            return ICatererProfileSerializer
        elif (user.user_type == 'i-customer'):
            return ICustomerProfileSerializer
        elif (user.user_type == 'b-customer'):
            return BCustomerProfileSerializer
        elif (user.user_type == 'b-caterer'):
            return BCatererProfileSerializer
        elif (user.user_type == 'staff'):
            return StaffProfileSerializer

    def get_queryset(self):
        user = AppUser.objects.get(id=self.kwargs['user_pk'])
        if (user.user_type == 'i-caterer'):
            return IndividualCatererProfile.objects.filter(user=user)
        elif (user.user_type == 'i-customer'):
            return IndividualCustomerProfile.objects.filter(user=user)
        elif (user.user_type == 'b-caterer'):
            return BusinessCatererProfile.objects.filter(user=user)
        elif (user.user_type == 'b-customer'):
            return BusinessCustomerProfile.objects.filter(user=user)
        elif (user.user_type == 'staff'):
            return StaffProfile.objects.filter(user=user)

    @action(detail=False, methods=['POST'], url_name='create')
    def create_profile(self, request, *args, **kwargs):
        user = AppUser.objects.get(id=self.kwargs['user_pk'])
        if (user.user_type == 'b-caterer'):
            profile = BusinessCatererProfile.objects.create(user=user)
            serializer = BCatererProfileRegSerializer(profile, request.data)
        elif (user.user_type == 'b-customer'):
            profile = BusinessCustomerProfile.objects.create(user=user)
            serializer = BCustomerProfileRegSerializer(profile, request.data)
        elif (user.user_type == 'i-caterer'):
            profile = IndividualCatererProfile.objects.create(user=user)
            serializer = ICatererProfileRegSerializer(profile, request.data)
        elif (user.user_type == 'i-customer'):
            profile = IndividualCustomerProfile.objects.create(user=user)
            serializer = ICustomerProfileRegSerializer(profile, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['PATCH'],url_name='patch')
    def patch_profile(self, request, *args, **kwargs):
        user = AppUser.objects.get(id=self.kwargs['user_pk'])
        if (user.user_type == 'b-caterer'):
            profile = BusinessCatererProfile.objects.get(user=user)
            serializer = BCatererProfileSerializer(profile, request.data)
        elif (user.user_type == 'b-customer'):
            profile = BusinessCustomerProfile.objects.get(user=user)
            serializer = BCustomerProfileSerializer(profile, request.data)
        elif (user.user_type == 'i-caterer'):
            profile = IndividualCatererProfile.objects.get(user=user)
            serializer = ICatererProfileSerializer(profile, request.data)
        elif (user.user_type == 'i-customer'):
            profile = IndividualCustomerProfile.objects.get(user=user)
            serializer = ICustomerProfileSerializer(profile, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


     # It is used only to retrive detailed profile of the user.

# To list user based requests. Uses RequestsSerializer
class UserRequestsViewSet(ModelViewSet):
    serializer_class = RequestsSerializer
    def get_queryset(self):
        user = AppUser.objects.get(id=self.kwargs['user_pk'])
        if (user.user_type == 'i-caterer' or user.user_type == 'b-caterer'):
            return Requests.objects.filter(caterer_id__in = [user.id])
        if (user.user_type == 'i-customer' or user.user_type == 'b-customer'):
            return Requests.objects.filter(client_id__in = [user.id])
        return     
# To list caterer ratings. Uses RatingSerializer 
class UserRatingViewSet(ListModelMixin, GenericViewSet):
    serializer_class = RatingSerilizer
    def get_queryset(self):
        user = AppUser.objects.get(id=self.kwargs['user_pk'])
        user_requests = Requests.objects.filter(caterer_id__in = [user.id])
        return Ratings.objects.filter(request__in = user_requests.values_list('id'))
# To list all the requests irrespective of user. Uses RequestsSerializer
class RequestsViewSet(ModelViewSet):
    queryset = Requests.objects.all()
    serializer_class = RequestsSerializer

# To list user based requests with client and caterer name. Uses RequestsWithNameSerializer
class SingleUserRequestWithNameViewSet(ModelViewSet):
    
    serializer_class=RequestsWithNameSerilizer
        
    def get_queryset(self):
        user = AppUser.objects.get(id=self.kwargs['user_pk'])
        if (user.user_type == 'i-caterer' or user.user_type == 'b-caterer'):
            print('bCaterere')
            queryset = Requests.objects.filter(caterer_id__in = [user.id])
            print('QuerySet', queryset)
            return queryset
        if (user.user_type == 'i-customer' or user.user_type == 'b-customer'):
            return Requests.objects.filter(client_id__in = [user.id])
        return
      
class AllUserRequestWithNameViewSet(ModelViewSet):
    serializer_class=RequestsWithNameSerilizer
    queryset = Requests.objects.select_related('rating').all()
      
    # def get_serializer_context(self):
    #     user = AppUser.objects.get(id=self.kwargs['user_pk'])
    #     context = super(UserRequestsNameViewSet, self).get_serializer_context()
    #     context.update({"user_type": user.user_type})
    #     # context.update({"title": self.request.POST.get('title', None)})
    #     return context

class AllIndividualCustomerWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=ICustomerProfileWithNameSerializer
    queryset = IndividualCustomerProfile.objects.all()
class IndividualCustomerWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=ICustomerProfileWithNameSerializer
    queryset = IndividualCustomerProfile.objects.filter(is_deleted=False)

class ActiveIndividualCustomerWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=ICustomerProfileWithNameSerializer
    def get_queryset(self):
        queryset = IndividualCustomerProfile.objects.select_related('user').filter(is_deleted=False).filter(user__profile_status = 'Active').all()
        return queryset

class AllBusinessCustomerWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=BCustomerProfileWithNameSerializer
    queryset = BusinessCustomerProfile.objects.all()
class BusinessCustomerWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=BCustomerProfileWithNameSerializer
    queryset = BusinessCustomerProfile.objects.filter(is_deleted=False)

class ActiveBusinessCustomerWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=BCustomerProfileWithNameSerializer
    # queryset = BusinessCustomerProfile.objects.filter(is_deleted=False).filter('')
    def get_queryset(self):
        queryset = BusinessCustomerProfile.objects.select_related('user').filter(is_deleted=False).filter(user__profile_status = 'Active').all()
        return queryset

class AllIndividualCatererWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=ICatererProfileWithNameSerializer
    queryset = IndividualCatererProfile.objects.all()
class IndividualCatererWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=ICatererProfileWithNameSerializer
    queryset = IndividualCatererProfile.objects.filter(is_deleted=False)

class ActiveIndividualCatererWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=ICatererProfileWithNameSerializer
    def get_queryset(self):
        queryset = IndividualCatererProfile.objects.select_related('user').filter(is_deleted=False).filter(user__profile_status = 'Active').all()
        return queryset

class AllBusinessCatererWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=BCatererProfileWithNameSerializer
    queryset = BusinessCatererProfile.objects.all()
class BusinessCatererWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=BCatererProfileWithNameSerializer
    queryset = BusinessCatererProfile.objects.filter(is_deleted=False)

class ActiveBusinessCatererWithNameViewSet(ListModelMixin, GenericViewSet):
    serializer_class=BCatererProfileWithNameSerializer
    # queryset = BusinessCatererProfile.objects.filter(is_deleted=False).filter('')
    def get_queryset(self):
        queryset = BusinessCatererProfile.objects.select_related('user').filter(user__is_deleted=False).filter(user__profile_status = 'Active').all()
        return queryset


class RequestAccptedViewSet(ListModelMixin, GenericViewSet):
    serializer_class = AcceptedRequestsSerializer
    def get_queryset(self):
        return AcceptedRequests.objects.filter(request=self.kwargs['request_pk'])
    
    @action(detail=False, methods=['POST','PATCH'], url_name='accept')
    def accept(self, request, *args, **kwargs):
        requestObj = Requests.objects.get(id=self.kwargs['request_pk'])
        accpted_req = AcceptedRequests.objects.create(request = requestObj)
        # print('Req ID',accpted_req)
        serializer = AcceptedRequestsSerializer(accpted_req, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        requestObj.req_status='Accepted'
        requestObj.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RequestDeclinedViewSet(ListModelMixin, GenericViewSet):
    serializer_class = DeclinedRequestsSerializer
    def get_queryset(self):
        return DeclinedRequests.objects.filter(request=self.kwargs['request_pk'])
    
    @action(detail=False, methods=['POST'], url_name='decline')
    def decline(self, request, *args, **kwargs):
        requestObj = Requests.objects.get(id=self.kwargs['request_pk'])
        declined_req = DeclinedRequests.objects.create(request = requestObj)
        serializer = DeclinedRequestsSerializer(declined_req, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        requestObj.req_status='Cancelled'
        requestObj.save()
        try:
            acceptedObj = AcceptedRequests.objects.get(request=requestObj)
            if (acceptedObj):
                acceptedObj.req_status='Cancelled'
                acceptedObj.save()
                return Response(serializer.data)
        except:
            return Response(serializer.data, status=status.HTTP_200_OK)

class RequestCompletedViewSet(ListModelMixin, GenericViewSet):
    serializer_class = AcceptedRequestsSerializer
    def get_queryset(self):
        return AcceptedRequests.objects.filter(request=self.kwargs['request_pk'])
    
    @action(detail=False, methods=['POST'], url_name='complete')
    def complete(self, request, *args, **kwargs):
        requestObj = Requests.objects.get(id=self.kwargs['request_pk'])
        accpted_req = AcceptedRequests.objects.get(request = requestObj)
        accpted_req.closed_date_time = dt.now()
        accpted_req.req_status = 'Completed'
        accpted_req.save()
        serializer = AcceptedRequestsSerializer(accpted_req)
        requestObj.req_status='Completed'
        requestObj.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class RateRequestViewSet(CreateModelMixin, GenericViewSet):
    queryset = Ratings.objects.all()
    serializer_class = RatingSerilizer

class AccptedRequestViewSet(ListModelMixin, GenericViewSet):
    serializer_class = AcceptedRequestsSerializer
    queryset = AcceptedRequests.objects.all()

class DeclinedRequestViewSet(ListModelMixin, GenericViewSet):
    serializer_class = DeclinedRequestsSerializer
    queryset = DeclinedRequests.objects.all()

class DeclineReasonsViewSet(ListModelMixin, GenericViewSet):
    queryset= DeclineReasons.objects.all()
    serializer_class = DeclineReasonsSerializer

# class UserTaskCompleted(ModelViewSet):

#     def get_queryset(self):
#         user = AppUser.objects.get(id=self.kwargs['user_pk'])
#         if (user.user_type == 'i-caterer' or user.user_type == 'b-caterer'):
#             return Requests.objects.filter(caterer_id__in = [user.id])
#         if (user.user_type == 'i-customer' or user.user_type == 'b-customer'):
#             return Requests.objects.filter(client_id__in = [user.id])
#         return 
# --------------------------------------------------------------



class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerilizer

            
class UserImageViewSet(ModelViewSet):
    serializer_class = UserImageSerializer
    
    def get_queryset(self):
        return UserImage.objects.filter(user_id = self.kwargs['user_pk'])
    
    # It is used to create respective profile in first user creation and view minmal profile details.
