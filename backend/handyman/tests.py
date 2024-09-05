from django.test import TestCase, Client, SimpleTestCase
import pytz
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from django.urls import reverse, resolve
# from rest_framework.urls import reverse, resolve
from core.models import AppUser
from datetime import datetime as dt
from handyman.models import *
from .models import IndividualCatererProfile, IndividualCustomerProfile, BusinessCatererProfile, BusinessCustomerProfile
from .serializers import ICatererProfileSerializer, ICustomerProfileSerializer, BCatererProfileSerializer, BCustomerProfileSerializer, ICatererProfileRegSerializer, ICustomerProfileRegSerializer, BCatererProfileRegSerializer, BCustomerProfileRegSerializer
import json
from handyman.views import ProfileViewSet, ServiceMenuViewSet
import pytz


# class AllIndividualCustomerWithNameViewSetTestCase(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = reverse('all-i-customer-list')
#         self.i_user = AppUser.objects.create(password='jane', email='icustomer@example.com', user_type='i-customer')

#         self.i_customer_user_profile = IndividualCustomerProfile.objects.create(user=self.i_user,
#                                                                 first_name='Ram', 
#                                                                     middle_name='',
#                                                                     last_name='Khadka',
#                                                                     gender='Male',
#                                                                     mobile='980000',
#                                                                     province='Province-5',
#                                                                     city='Kathmandu',
#                                                                     area='Koteshower')
#         self.i_user2 = AppUser.objects.create(password='doe', email='icustomer2@example.com', user_type='i-customer')

#         self.i_customer_user_profile2 = IndividualCustomerProfile.objects.create(user=self.i_user2,
#                                                                 first_name='Jane', 
#                                                                     middle_name='',
#                                                                     last_name='Doe',
#                                                                     gender='Female',
#                                                                     mobile='980000',
#                                                                     province='Province-5',
#                                                                     city='Kathmandu',
#                                                                     area='Koteshower')
        
#     def test_get_all_individual_customer_with_name(self):
#         response = self.client.get(self.url)
#         expected_datetime = self.i_user.date_joined.astimezone(pytz.utc).strftime('%Y-%m-%dT%H:%M:%S.%fZ')
#         expected_result ={'user_id': self.i_user.id, 
#                            'name': 'Ram Khadka', 
#                            'gender': 'Male', 
#                            'mobile': '980000', 
#                            'province': 'Province-5', 
#                            'profile_picture': None, 
#                            'city': 'Kathmandu', 
#                            'area': 'Koteshower', 
#                            'email': 'icustomer@example.com', 
#                            'profile_status': 'Pending', 
#                            'date_joined': expected_datetime,
#                            }
        # self.assertNotEqual(len(response.json()), 0)
        # self.assertEqual(response.json()[0], expected_result)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

# class AllIndividualCatererWithNameViewSetTestCase(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = reverse('all-i-caterer-list')
#         self.i_user = AppUser.objects.create(password='jane', email='icaterer@example.com', user_type='i-caterer')

#         self.i_caterer_user_profile = IndividualCatererProfile.objects.create(user=self.i_user,
#                                                                 first_name='Ram', 
#                                                                     middle_name='',
#                                                                     last_name='Khadka',
#                                                                     gender='Male',
#                                                                     mobile='980000',
#                                                                     province='Province-5',
#                                                                     city='Kathmandu',
#                                                                     area='Koteshower')
#         self.i_user2 = AppUser.objects.create(password='nitesh', email='icaterer2@example.com', user_type='i-caterer')

#         self.i_caterer_user_profile2 = IndividualCatererProfile.objects.create(user=self.i_user2,
#                                                                 first_name='Nitesh', 
#                                                                     middle_name='',
#                                                                     last_name='Karki',
#                                                                     gender='Male',
#                                                                     mobile='980000',
#                                                                     province='Province-5',
#                                                                     city='Kathmandu',
#                                                                     area='Koteshower')
        
#     def test_get_all_individual_caterer_with_name(self):
#         response = self.client.get(self.url)
#         expected_datetime = self.i_user.date_joined.astimezone(pytz.utc).strftime('%Y-%m-%dT%H:%M:%S.%fZ')
#         expected_result ={'user_id': self.i_user.id, 
#                            'name': 'Ram Khadka', 
#                            'gender': 'Male', 
#                            'mobile': '980000', 
#                            'province': 'Province-5', 
#                            'profile_picture': None, 
#                            'city': 'Kathmandu', 
#                            'area': 'Koteshower', 
#                            'email': 'icaterer@example.com', 
#                            'profile_status': 'Pending',
#                            'services':"",
#                            'id_type':None,
#                            'id_number':None,
#                            'id_photo':None,
#                            'date_joined': expected_datetime,
#                            'avg_rating': 0,
#                            'caterer':'Individual',
#                            'completed_task': 0,
#                            }
#         self.assertNotEqual(len(response.json()), 0)
#         self.assertEqual(response.json()[0], expected_result)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

# class AllBusinessCatererWithNameViewSetTestCase(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = reverse('all-b-caterer-list')
#         self.b_caterer = AppUser.objects.create(password='jane', email='cleaning@mail.com', user_type='b-caterer')

#         self.b_caterer_user_profile = BusinessCatererProfile.objects.create(user=self.b_caterer,
#                                                                             name_of_business='Cleaning Services',
#                                                                             registration_no= None,
#                                                                             document_photo= None,
#                                                                             person_to_contact="Brij",
#                                                                             profile_picture=None,
#                                                                             person_phone="98000",
#                                                                             province='Province-5',
#                                                                             city='Kathmandu',
#                                                                             area='Koteshower',)
#         self.b_caterer2 = AppUser.objects.create(password='jane', email='maison@mail.com', user_type='b-caterer')

#         self.b_caterer_user_profile2 = BusinessCatererProfile.objects.create(user=self.b_caterer2,
#                                                                             name_of_business='Maison Services',
#                                                                             registration_no= None,
#                                                                             document_photo= None,
#                                                                             person_to_contact="Brij",
#                                                                             profile_picture=None,
#                                                                             person_phone="98000",
#                                                                             province='Province-5',
#                                                                             city='Bhaktapur',
#                                                                             area='Koteshower',)
        
        
#     def test_get_all_business_caterer_with_name(self):
#         response = self.client.get(self.url)
#         expected_datetime = self.b_caterer.date_joined.astimezone(pytz.utc).strftime('%Y-%m-%dT%H:%M:%S.%fZ')
#         expected_result ={"user_id":self.b_caterer.id,
#                             "name_of_business": "Cleaning Services",
#                             "registration_no": None,
#                             "document_photo": None,
#                             "person_to_contact": "Brij",
#                             "profile_picture": None,
#                             "person_phone": "98000",
#                             "province": "Province-5",
#                             "city": "Kathmandu",
#                             "area": "Koteshower",
#                             "services": "",
#                             "email": "cleaning@mail.com",
#                             "profile_status": "Pending",
#                             "date_joined": expected_datetime,
#                             "completed_task": 0,
#                             "avg_rating": 0,
#                             "name": "Cleaning Services",
#                             "caterer": "Business"
#                            }
#         self.assertNotEqual(len(response.json()), 0)
#         self.assertEqual(response.json()[0], expected_result)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

# class AllBusinessCustomerWithNameViewSetTestCase(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.url = reverse('all-b-customer-list')
#         self.b_customer = AppUser.objects.create(password='jane', email='bcustomer@mail.com', user_type='b-customer')

#         self.b_customer_user_profile = BusinessCustomerProfile.objects.create(user=self.b_customer,
#                                                                             name_of_business='Islington College',
#                                                                             type_of_business='Education',
#                                                                             registration_no= None,
#                                                                             document_photo= None,
#                                                                             person_to_contact="Brij",
#                                                                             profile_picture=None,
#                                                                             person_phone="98000",
#                                                                             province='Province-5',
#                                                                             city='Kathmandu',
#                                                                             area='Kamalpokhari',)
#         self.b_customer2 = AppUser.objects.create(password='jane', email='bcustomer@mail.com', user_type='b-customer')

#         self.b_customer_user_profile2 = BusinessCustomerProfile.objects.create(user=self.b_customer2,
#                                                                             name_of_business='HEMS School',
#                                                                             type_of_business='Education',
#                                                                             registration_no= None,
#                                                                             document_photo= None,
#                                                                             person_to_contact="Kamal",
#                                                                             profile_picture=None,
#                                                                             person_phone="98000",
#                                                                             province='Province-5',
#                                                                             city='Kathmandu',
#                                                                             area='Kamalpokhari',)
        
#     def test_get_all_business_customer_with_name(self):
#         response = self.client.get(self.url)
#         expected_datetime = self.b_customer.date_joined.astimezone(pytz.utc).strftime('%Y-%m-%dT%H:%M:%S.%fZ')
#         expected_result ={"user_id":self.b_customer.id,
#                             "name_of_business": "Islington College",
#                             "type_of_business":"Education",
#                             "registration_no": None,
#                             "document_photo": None,
#                             "person_to_contact": "Brij",
#                             "profile_picture": None,
#                             "person_phone": "98000",
#                             "province": "Province-5",
#                             "city": "Kathmandu",
#                             "area": "Kamalpokhari",
#                             "email": "bcustomer@mail.com",
#                             "profile_status": "Pending",
#                             "date_joined": expected_datetime,
#                             "user_type": "b-customer",
#                            }
#         self.assertNotEqual(len(response.json()), 0)
#         self.assertEqual(response.json()[0], expected_result)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
       
# class CreateUserTestCase(APITestCase):
#     print('AppUserViewTestCase .....')
#     def setUp(self):
#         print('Setting up .....')
#         self.client = APIClient()
#         self.i_user_data = {"id":1, "password":"password4588", "email":"nitesh@mail.com", "user_type":"i-customer"}
#         self.i_user_profile_data = {"first_name":'Nitesh', "middle_name":'',"last_name":'Karki',"gender":'Male',
#                                     "mobile":'9800000000',"province":'Province-5',"city":'Kathmandu',"area":'Koteshower'}
#         self.ic_user_data = {"id":2, "password":"password4588", "email":"niraj@mail.com", "user_type":"i-caterer"}
#         self.ic_user_profile_data = {"first_name":'Niraj', "middle_name":'',"last_name":'Karki',"gender":'Male',
#                                     "mobile":'9800000001',"province":'Province-5',"city":'Kathmandu',"area":'Koteshower'}
#         self.b_user_data = {"id":3, "password":"password4588", "email":"islington@mail.com", "user_type":"b-customer"}
#         self.b_user_profile_data = {"name_of_business":'Islington College',"person_to_contact":'Shyam Adhikari', "type_of_business":"Education",
#                                     "person_phone":'9800000008',"province":'Province-5',"city":'Kathmandu',"area":'Kamalpokhari'}
#         self.bc_user_data = {"id":4, "password":"password4588", "email":"cleaner@mail.com", "user_type":"b-caterer"}
#         self.bc_user_profile_data = {"name_of_business":'Cleaning Services',"person_to_contact":'Ram Adhikari',
#                                     "person_phone":'9800000009',"province":'Province-5',"city":'Kathmandu',"area":'New Road'}
        

#     def test_create_b_customer(self):
#         response_user = self.client.post("/handyman/auth/users/", self.b_user_data)
#         self.assertEqual(response_user.data['email'], 'islington@mail.com')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)
#         create_profile_url = reverse('user-profile-create', kwargs={'user_pk': response_user.data['id']})
#         response_profile = self.client.post(create_profile_url, self.b_user_profile_data, format='json')
#         self.assertEqual(response_profile.data['user_id'], response_user.data['id'])
#         self.assertEqual(response_profile.data['name_of_business'], 'Islington College')
#         self.assertEqual(response_profile.data['person_to_contact'], 'Shyam Adhikari')
#         self.assertEqual(response_profile.data['person_phone'], '9800000008')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)

#     def test_create_b_caterer(self):
#         response_user = self.client.post("/handyman/auth/users/", self.bc_user_data)
#         self.assertEqual(response_user.data['email'], 'cleaner@mail.com')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)
#         create_profile_url = reverse('user-profile-create', kwargs={'user_pk': response_user.data['id']})
#         response_profile = self.client.post(create_profile_url, self.bc_user_profile_data, format='json')
#         self.assertEqual(response_profile.data['user_id'], response_user.data['id'])
#         self.assertEqual(response_profile.data['name_of_business'], 'Cleaning Services')
#         self.assertEqual(response_profile.data['person_to_contact'], 'Ram Adhikari')
#         self.assertEqual(response_profile.data['person_phone'], '9800000009')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)
    
#     def test_create_i_customer(self):
#         response_user = self.client.post("/handyman/auth/users/", self.i_user_data)
#         self.assertEqual(response_user.data['email'], 'nitesh@mail.com')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)
#         create_profile_url = reverse('user-profile-create', kwargs={'user_pk': response_user.data['id']})
#         response_profile = self.client.post(create_profile_url, self.i_user_profile_data, format='json')
#         self.assertEqual(response_profile.data['user_id'], response_user.data['id'])
#         self.assertEqual(response_profile.data['first_name'], 'Nitesh')
#         self.assertEqual(response_profile.data['middle_name'], '')
#         self.assertEqual(response_profile.data['last_name'], 'Karki')
#         self.assertEqual(response_profile.data['mobile'], '9800000000')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)
    
#     def test_create_i_caterer(self):
#         response_user = self.client.post("/handyman/auth/users/", self.ic_user_data)
#         self.assertEqual(response_user.data['email'], 'niraj@mail.com')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)
#         create_profile_url = reverse('user-profile-create', kwargs={'user_pk': response_user.data['id']})
#         response_profile = self.client.post(create_profile_url, self.ic_user_profile_data, format='json')
#         self.assertEqual(response_profile.data['user_id'], response_user.data['id'])
#         self.assertEqual(response_profile.data['first_name'], 'Niraj')
#         self.assertEqual(response_profile.data['middle_name'], '')
#         self.assertEqual(response_profile.data['last_name'], 'Karki')
#         self.assertEqual(response_profile.data['mobile'], '9800000001')
#         self.assertEqual(response_user.status_code, status.HTTP_201_CREATED)

# class UserStatusTestCase(APITestCase):
#     def setUp(self) -> None:
#         self.b_user = AppUser.objects.create(password='john', email='john_b@example.com', user_type='b-customer')
#         self.i_user = AppUser.objects.create(password='jane', email='jane_i@example.com', user_type='i-customer')
#         return super().setUp()    

#     def test_activate(self):
#         self.assertEqual(self.b_user.profile_status, "Pending")
#         url = reverse('users-activate', kwargs={'pk': self.b_user.id})
#         response = self.client.patch(url)
#         print("Response Data -------------------------",response.data['is_deleted'])
#         self.assertEqual(response.data['email'], "john_b@example.com")
#         self.assertEqual(response.data['user_type'], "b-customer")
#         self.assertEqual(response.data['profile_status'], "Active")
#         self.assertEqual(response.status_code, status.HTTP_200_OK)


#     def test_block(self):
#         self.assertEqual(self.b_user.profile_status, "Pending")
#         url = reverse('users-block', kwargs={'pk': self.b_user.id})
#         response = self.client.patch(url)
#         self.assertEqual(response.data['email'], "john_b@example.com")
#         self.assertEqual(response.data['user_type'], "b-customer")
#         self.assertEqual(response.data['profile_status'], "Blocked")
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
    
#     def test_recover(self):
#         self.i_user.is_deleted = True
#         url = reverse('users-recover', kwargs={'pk': self.i_user.id})
#         response = self.client.patch(url)
#         self.assertEqual(response.data['email'], "jane_i@example.com")
#         self.assertEqual(response.data['user_type'], "i-customer")
#         self.assertFalse(response.data['is_deleted'], False)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)

class RequestTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.b_user = AppUser.objects.create(password='Islington', email='islington@example.com', user_type='b-customer')
        self.ic_user = AppUser.objects.create(password='Manish', email='manish@example.com', user_type='i-caterer')
        self.service = Service.objects.create(service_id='SV-100', title='Carpentery', description='')
        self.i_caterer_user_profile = IndividualCatererProfile.objects.create(user=self.ic_user,
                                                                first_name='Manish', 
                                                                    middle_name='',
                                                                    last_name='Sharma',
                                                                    gender='Male',
                                                                    mobile='98653764',
                                                                    province='Province-5',
                                                                    city='Kathmandu',
                                                                    area='Koteshower')
        self.i_caterer_user_profile.services.add(self.service)
        self.b_customer_user_profile = BusinessCustomerProfile.objects.create(user=self.b_user,
                                                                name_of_business='Islington College', 
                                                                    registration_no='87678',
                                                                    person_to_contact='Chetan',
                                                                    person_phone='976798687',
                                                                    province='Province-5',
                                                                    city='Kathmandu',
                                                                    area='Koteshower',
                                                                    type_of_business='Education')
        return super().setUp()
    
    def test_make_request(self):
        p_dt = datetime(2022, 12, 28, 23, 55, 59, 342380)
        req_data = {'client_id': self.b_user.id, 
                    'caterer_id':self.ic_user.id, 
                    'req_service':self.service.title, 
                    'city':'Kathmandu', 
                    'area':'Kamalpokhari', 
                    'proposed_date_time': p_dt, 
                    'description':'There is chair to be made.'}
        response = self.client.post('/handyman/requests/', req_data, format='json')
        self.assertEqual(response.data['req_status'], 'Placed')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['caterer_id'], self.ic_user.id)
        self.assertEqual(response.data['area'], 'Kamalpokhari')
        self.assertEqual(response.data['client_id'], self.b_user.id)

    def test_accept_request(self):
        p_dt = datetime(2022, 12, 28, 23, 55, 59, 342380)
        user_request = Requests.objects.create(client_id=self.b_user, 
                                               caterer_id=self.ic_user, 
                                               req_service=self.service.title, 
                                               city='Kathmandu', 
                                               area='Kamalpokhari', 
                                               proposed_date_time=p_dt, 
                                               description='Door Fixing')
        self.assertEqual(user_request.req_status, 'Placed')
        url = reverse('request-accpted-accept', kwargs={'request_pk': user_request.id})
        response = self.client.post(url, {'request':user_request.id})
        self.assertEqual(response.data['req_status'], 'Open')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_request.refresh_from_db()
        self.assertEqual(user_request.req_status, 'Accepted')
        accepted_request = AcceptedRequests.objects.get(request=user_request)
        self.assertEqual(accepted_request.request, user_request)
        

    def test_cancel_request(self):
        p_dt = datetime(2022, 12, 28, 23, 55, 59, 342380)
        user_request = Requests.objects.create(client_id=self.b_user, 
                                               caterer_id=self.ic_user, 
                                               req_service=self.service.title, 
                                               city='Kathmandu', 
                                               area='Kamalpokhari', 
                                               proposed_date_time=p_dt, 
                                               description='Door Fixing')
        self.assertEqual(user_request.req_status, 'Placed')
        url = reverse('request-declined-decline', kwargs={'request_pk': user_request.id})
        response = self.client.post(url, {'request':user_request.id, 'user_type':self.b_user.user_type, 'user_id':self.b_user.id})
        self.assertEqual(response.data['request'], user_request.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user_request.refresh_from_db()
        self.assertEqual(user_request.req_status, 'Cancelled')
        cancled_request = DeclinedRequests.objects.get(request=user_request)
        self.assertEqual(cancled_request.request, user_request)
         

    def test_rate_request(self):
        p_dt = datetime(2022, 12, 28, 23, 55, 59, 342380)
        user_request = Requests.objects.create(client_id=self.b_user, 
                                               caterer_id=self.ic_user, 
                                               req_service=self.service.title, 
                                               city='Kathmandu', 
                                               area='Kamalpokhari', 
                                               proposed_date_time=p_dt, 
                                               description='Door Fixing')
        self.assertEqual(user_request.req_status, 'Placed')
        url = reverse('request-rating-list', kwargs={'request_pk': user_request.id})
        response = self.client.post(url, {'request':user_request.id, 'ratings':3, 'user_feedback':'Excellent!'})
        self.assertEqual(response.data['ratings'], 3)
        self.assertEqual(response.data['user_feedback'], 'Excellent!')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
         
    
    def test_view_requests(self):
        p_dt = datetime(2022, 12, 28, 23, 55, 59, 342380)
        user_request = Requests.objects.create(client_id=self.b_user, 
                                               caterer_id=self.ic_user, 
                                               req_service=self.service.title, 
                                               city='Kathmandu', area='Kamalpokhari', 
                                               proposed_date_time=p_dt, 
                                               description='Door Fixing')
        p_datetime = user_request.proposed_date_time.isoformat()+'+05:45'
        req_datetime = user_request.req_date_time.isoformat()+'+05:45'
        url = '/handyman/requests/'
        response = self.client.get(url)
        expected_response = [{
        "id": user_request.id,
        "req_date_time": req_datetime,
        "client_id": self.b_user.id,
        "caterer_id": self.ic_user.id,
        "req_service": user_request.req_service,
        "city": "Kathmandu",
        "area": "Kamalpokhari",
        "proposed_date_time": p_datetime,
        "description": "Door Fixing",
        "req_status": "Placed",
        }]
        self.assertEqual(response.json(), expected_response)
        self.assertEqual(response.status_code, status.HTTP_200_OK) 
       
 
# class ProfileViewSetTestCase(APITestCase):
#     def setUp(self):
#         self.client = APIClient()
#         self.user1 = AppUser.objects.create(password='jane', email='jane@example.com', user_type='i-customer')
#         self.user2 = AppUser.objects.create(password='john', email='john@example.com', user_type='b-caterer')
#         self.list_url = reverse('user-profile-list', kwargs={'user_pk': self.user1.id})

#     def test_get_serializer_class(self):
#         view = ProfileViewSet()
#         view.kwargs = {'user_pk': self.user1.id}
#         self.assertEqual(view.get_serializer_class(), ICustomerProfileSerializer)
#         view.kwargs = {'user_pk': self.user2.id}
#         self.assertEqual(view.get_serializer_class(), BCatererProfileSerializer)

#     def test_get_queryset(self):
#         view = ProfileViewSet()
#         view.kwargs = {'user_pk': self.user1.id}
#         self.assertEqual(list(view.get_queryset()), [])
#         icp = IndividualCustomerProfile.objects.create(user=self.user1)
#         self.assertEqual(list(view.get_queryset()), [icp])
#         view.kwargs = {'user_pk': self.user2.id}
#         self.assertEqual(list(view.get_queryset()), [])
#         bcp = BusinessCatererProfile.objects.create(user=self.user2)
#         self.assertEqual(list(view.get_queryset()), [bcp])

#     def test_create_profile(self):
#         self.client.force_authenticate(user=self.user1)
#         url = reverse('user-profile-create', kwargs={'user_pk': self.user1.id})
#         data = {'first_name': 'Jane', 'last_name': 'Doe', 'gender':'Male', 'mobile':'99767896', 'province':'Province-4', 'city':'Kathmandu', 'area':'gaushala'}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         icp = IndividualCustomerProfile.objects.get(user=self.user1)
#         self.assertEqual(icp.first_name, 'Jane')
#         self.assertEqual(icp.last_name, 'Doe')
#         data = {'business_name': 'John Inc.'}
#         response = self.client.post(reverse('user-profile-create', kwargs={'user_pk': self.user2.id}), data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_patch_profile(self):
#         icp = IndividualCustomerProfile.objects.create(user=self.user1, first_name='Jane', last_name='Doe')
#         self.client.force_authenticate(user=self.user1)
#         url = reverse('user-profile-patch', kwargs={'user_pk': self.user1.id})
#         data = {'first_name': 'Janet', 'last_name': 'Doe', 'gender':'Male', 'mobile':'99767896', 'province':'Province-4', 'city':'Kathmandu'}
#         response = self.client.patch(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         icp.refresh_from_db()
#         self.assertEqual(icp.first_name, 'Janet')
#         self.assertEqual(icp.last_name, 'Doe')
#         bcp = BusinessCatererProfile.objects.create(user=self.user2, name_of_business='John Inc.')
#         self.client.force_authenticate(user=self.user2)
#         url = reverse('user-profile-patch', kwargs={'user_pk': self.user2.id})
#         data = {'name_of_business': 'John Enterprises', 'person_to_contact':'Janet', 'person_phone':'98000', 'province':'Province-4', 'city':'Kathmandu', 'area':'Kamalpokhari'}
#         response = self.client.patch(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         bcp.refresh_from_db()
#         self.assertEqual(bcp.name_of_business, 'John Enterprises')
#         self.assertEqual(bcp.user.user_type, 'b-caterer')


