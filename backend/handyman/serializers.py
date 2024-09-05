from rest_framework import serializers
from django.conf import settings
from .models import *
from core.models import *

class ServiceSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['service_id', 'title', 'description', 'i_caterers', 'b_caterers']

# To get service ID and name only
class ServiceMenuSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['service_id', 'title']

# To list all the app users with basic info (Model Serializer)
class AppUserSerilizer(serializers.ModelSerializer):
    # settings.AUTH_USER_MODEL
    class Meta:
        model = AppUser
        fields = ['id', 'email', 'password', 'profile_status', 'user_type', 'is_deleted']

# To list profile data base on user type (Model Serializers)
class ICustomerProfileRegSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = IndividualCustomerProfile
        fields = ['user_id','id', 'first_name', 'middle_name', 'last_name', 'gender', 'mobile', 'province',
                  'city', 'area']
        
class ICatererProfileRegSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = IndividualCatererProfile
        fields = ['user_id','id', 'first_name', 'middle_name', 'last_name', 'gender', 'mobile', 'province',
                  'city', 'area']

class BCustomerProfileRegSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = BusinessCustomerProfile
        fields = ['user_id','id', 'name_of_business', 'type_of_business', 'registration_no', 'document_photo', 'person_to_contact', 
                  'person_phone', 'province', 'city', 'area']       

class BCatererProfileRegSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = BusinessCatererProfile
        fields = ['user_id','id', 'name_of_business', 'registration_no', 'person_to_contact', 
                  'person_phone', 'province', 'city', 'area']
     
class ICustomerProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = IndividualCustomerProfile
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'profile_picture', 'gender', 'mobile', 'province',
                  'city', 'area', 'name', 'type']
        
class ICatererProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = IndividualCatererProfile
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'profile_picture', 'gender', 'mobile', 'province',
                  'city', 'area', 'services', 'id_type', 'id_number', 'id_photo', 'name']


class StaffProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = StaffProfile
        fields = ['id', 'first_name', 'middle_name', 'last_name', 'profile_picture', 'gender', 'mobile', 'province',
                  'city', 'area', 'id_type', 'id_number', 'id_photo', 'name']
        
class BCustomerProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = BusinessCustomerProfile
        fields = ['id', 'name_of_business', 'type_of_business', 'profile_picture', 'registration_no', 'document_photo', 'person_to_contact', 
                  'person_phone', 'province', 'city', 'area', 'name', 'type']       

class BCatererProfileSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = BusinessCatererProfile
        fields = ['id', 'name_of_business', 'registration_no', 'profile_picture', 'document_photo','person_to_contact', 
                  'person_phone', 'province', 'city', 'area', 'services', 'name', 'type']        
        
# Request serializers Start -------------------------------------------------------------------------------- #       
class RequestsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Requests
        fields = ['id', 'req_date_time', 'client_id', 'caterer_id', 'req_service', 'city', 'area', 'proposed_date_time',
                  'description', 'req_status']

class AcceptedRequestsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = AcceptedRequests
        fields = ['id', 'request', 'acpt_date_time', 'closed_date_time', 'agreed_cost', 'req_status']
class DeclinedRequestsSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = DeclinedRequests
        fields = ['id', 'request', 'user_type', 'user_id', 'reason']

class CatererRequestSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = ['id', 'client_id', 'req_date_time', 'req_service',
                   'city', 'area', 'proposed_date_time', 'description', 'req_status']
class CustomerRequestSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Requests
        fields = ['id', 'customer_id', 'req_date_time', 'req_service',
                   'city', 'area', 'proposed_date_time', 'description', 'req_status']


# To list Rating data (Model Serializer)
class RatingSerilizer(serializers.ModelSerializer):
    class Meta:
        model=Ratings
        fields = ['id', 'request', 'ratings', 'user_feedback']


# Request Serilizer with Profile Details Start -------------------------------------------------------------------- #

class BusinessTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessTypes
        fields = ['id', 'type_of_business']

class RequestsWithNameSerilizer(serializers.ModelSerializer):
    # settings.AUTH_USER_MODEL
    client= serializers.SerializerMethodField(method_name='get_client_name')
    caterer= serializers.SerializerMethodField(method_name='get_caterer_name')
    
    def get_client_name(self, obj):
        user = AppUser.objects.get(id = obj.client_id.id)
        if (user.user_type == 'i-customer'):
            profile = IndividualCustomerProfile.objects.get(user=obj.client_id)
        elif (user.user_type == 'b-customer'):
            profile = BusinessCustomerProfile.objects.get(user=obj.client_id)
        return profile.name()
    
    def get_caterer_name(self, obj):
        user = AppUser.objects.get(id = obj.caterer_id.id)
        if (user.user_type == 'i-caterer'):
            profile = IndividualCatererProfile.objects.get(user=obj.caterer_id)
        elif (user.user_type == 'b-caterer'):
            profile = BusinessCatererProfile.objects.get(user=obj.caterer_id)
        return profile.name()
    class Meta:
        model = Requests
        fields = ['id', 'req_date_time', 'client', 'caterer', 'caterer_id','req_service', 'city', 'area', 'proposed_date_time',
                  'description', 'req_status']
# class RequestsWithNameSerilizer(serializers.ModelSerializer):
#     # settings.AUTH_USER_MODEL
#     client= serializers.SerializerMethodField(method_name='get_client_name')
#     caterer= serializers.SerializerMethodField(method_name='get_caterer_name')
    
#     def get_client_name(self, obj):
#         user = AppUser.objects.get(id = obj.client_id.id)
#         if (user.user_type == 'i-customer'):
#             profile = IndividualCustomerProfile.objects.get(user=obj.client_id)
#         elif (user.user_type == 'b-customer'):
#             profile = BusinessCustomerProfile.objects.get(user=obj.client_id)
#         return profile.name()
    
#     def get_caterer_name(self, obj):
#         user = AppUser.objects.get(id = obj.caterer_id.id)
#         if (user.user_type == 'i-caterer'):
#             profile = IndividualCatererProfile.objects.get(user=obj.caterer_id)
#         elif (user.user_type == 'b-caterer'):
#             profile = BusinessCatererProfile.objects.get(user=obj.caterer_id)
#         return profile.name()
#     class Meta:
#         model = Requests
#         fields = ['id', 'req_date_time', 'client', 'caterer', 'caterer_id','req_service', 'city', 'area', 'proposed_date_time',
#                   'description', 'req_status']

# Request Serilizer with Profile Details End -------------------------------------------------------------------- #

class ICustomerProfileWithNameSerializer(serializers.ModelSerializer):
    email= serializers.SerializerMethodField(method_name='get_email')
    profile_status= serializers.SerializerMethodField(method_name='get_profile_status')
    date_joined = serializers.SerializerMethodField(method_name='get_date_joined')
    
    def get_email(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.email
    def get_profile_status(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.profile_status
    def get_date_joined(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.date_joined
    class Meta:
        model = IndividualCustomerProfile
        fields = ['user_id', 'name', 'gender', 'mobile', 'province', 'profile_picture',
                  'city', 'area', 'email', 'profile_status', 'date_joined']

class ICatererProfileWithNameSerializer(serializers.ModelSerializer):
    email= serializers.SerializerMethodField(method_name='get_email')
    profile_status= serializers.SerializerMethodField(method_name='get_profile_status')
    date_joined = serializers.SerializerMethodField(method_name='get_date_joined')
    services = serializers.SerializerMethodField(method_name='get_services')
    completed_task = serializers.SerializerMethodField(method_name='get_completed_tasks')
    avg_rating = serializers.SerializerMethodField(method_name='get_rating')
    
    def get_rating(self, obj):
        count = 0
        total_rating = 0
        avgRating = 0
        users = AppUser.objects.filter(i_caterer__in = [obj.id])
        for user in users:
            user_requests = Requests.objects.filter(caterer_id__in = [user.id])
            user_ratings = Ratings.objects.filter(request__in = user_requests)
            if (user_ratings.count() != 0):
                for ratingObj in user_ratings:
                    count += 1
                    total_rating += ratingObj.ratings
                avgRating = total_rating/count
        return avgRating
    
    def get_completed_tasks(self, obj):
        task_count = 0
        users = AppUser.objects.filter(i_caterer__in = [obj.id])
        for user in users:
            user_requests = Requests.objects.filter(caterer_id__in = [user.id])
            for request in user_requests:
                if request.req_status=='Completed':
                    task_count += 1
        return task_count
    
    def get_services(self, obj):
        name=[]
        user_services = Service.objects.filter(i_caterers__in = [obj.id])
        for service in user_services:
            name.append(service.title)
        return ", ".join(name)
    def get_email(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.email
    def get_profile_status(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.profile_status
    def get_date_joined(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.date_joined
    class Meta:
        model = IndividualCatererProfile
        fields = ['user_id', 'name', 'gender', 'mobile', 'province','profile_picture',
                  'city', 'area','services', 'id_type', 'id_number', 'id_photo', 'email', 'profile_status', 'date_joined', 'completed_task', 'avg_rating', 'caterer']

class BCustomerProfileWithNameSerializer(serializers.ModelSerializer):
    email= serializers.SerializerMethodField(method_name='get_email')
    profile_status= serializers.SerializerMethodField(method_name='get_profile_status')
    date_joined = serializers.SerializerMethodField(method_name='get_date_joined')
    user_type = serializers.SerializerMethodField(method_name='get_user_type')
    
    def get_email(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.email
    def get_profile_status(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.profile_status
    def get_date_joined(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.date_joined
    def get_user_type(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.user_type
    class Meta:
        model = BusinessCustomerProfile
        fields = ['user_id', 'name_of_business', 'type_of_business', 'registration_no', 'document_photo', 'person_to_contact', 
                  'person_phone', 'province', 'city', 'area', 'email', 'profile_status', 'date_joined', 'profile_picture', 'user_type']
        
class BCatererProfileWithNameSerializer(serializers.ModelSerializer):
    email= serializers.SerializerMethodField(method_name='get_email')
    profile_status= serializers.SerializerMethodField(method_name='get_profile_status')
    date_joined = serializers.SerializerMethodField(method_name='get_date_joined')
    services = serializers.SerializerMethodField(method_name='get_services')
    completed_task = serializers.SerializerMethodField(method_name='get_completed_tasks')
    avg_rating = serializers.SerializerMethodField(method_name='get_rating')
    
    def get_rating(self, obj):
        count = 0
        total_rating = 0
        avgRating = 0
        users = AppUser.objects.filter(b_caterer__in = [obj.id])
        for user in users:
            user_requests = Requests.objects.filter(caterer_id__in = [user.id])
            user_ratings = Ratings.objects.filter(request__in = user_requests)
            if (user_ratings.count() != 0):
                for ratingObj in user_ratings:
                    count += 1
                    total_rating += ratingObj.ratings
                avgRating = total_rating/count
        return avgRating
    
    def get_completed_tasks(self, obj):
        task_count = 0
        users = AppUser.objects.filter(b_caterer__in = [obj.id])
        for user in users:
            user_requests = Requests.objects.filter(caterer_id__in = [user.id])
            for request in user_requests:
                if request.req_status=='Completed':
                    task_count += 1
        return task_count
    
    def get_services(self, obj):
        name=[]
        user_services = Service.objects.filter(b_caterers__in = [obj.id])
        for service in user_services:
            name.append(service.title)
        return ", ".join(name)
    def get_email(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.email
    def get_profile_status(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.profile_status
    def get_date_joined(self, obj):
        user = AppUser.objects.get(id = obj.user_id)
        return user.date_joined
        
    class Meta:
        model = BusinessCatererProfile
        fields = ['user_id', 'name_of_business', 'registration_no', 'document_photo','person_to_contact', 'profile_picture',
                  'person_phone', 'province', 'city', 'area', 'services', 'email', 'profile_status', 'date_joined', 'completed_task', 'avg_rating', 'name', 'caterer']
        
class DeclineReasonsSerializer(serializers.ModelSerializer):
    class Meta:
        model=DeclineReasons
        fields = ['reason_id', 'reason']


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ['id', 'image']
class ICatererCardDataSerializer(serializers.Serializer):
    user = AppUserSerilizer()
    id = serializers.IntegerField()
    name = serializers.CharField()
    caterer = serializers.CharField()
    city = serializers.CharField()
    # services = serializers.SerializerMethodField(method_name='service')
    # services = serializers.StringRelatedField()
    services = ServiceMenuSerilizer(many=True)
    
    # def service (self, icp:IndividualCatererProfile):
    #     return (icp.first_name)

    # email = serializers.EmailField(max_length=200)
    # username = serializers.CharField(max_length=200)
    # password = serializers.CharField(max_length=200)
    # type = serializers.CharField(max_length=100, source='user_type')
    # identifier = serializers.SerializerMethodField(method_name='user_identifier')
    # igp = IndividualGeneralProfileSerializer()
    # igp = serializers.PrimaryKeyRelatedField(
    #     queryset= IndividualGeneralProfile.objects.all()
    # )
    # igp = serializers.StringRelatedField()
    
    def user_identifier(self, user:AppUser):
        return '{}-{}'.format(user.username, user.user_type)


# class IndividualCustomerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = IndividualCustomer
#         fields = ['id', 'email', 'password', 'user_type','profile_status', 'i_customer']
#     i_customer = ICustomerProfileSerializer()

#     def create(self, validated_data):
#         i_customer = validated_data.pop('i_customer')
#         individual_user = IndividualCustomer.objects.create(**validated_data)
#         IndividualCustomerProfile.objects.create(user=individual_user, **i_customer)
#         return individual_user
# class IndividualCatererSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = IndividualCaterer
#         fields = ['id', 'email', 'password', 'user_type','profile_status', 'i_caterer']
#     i_caterer = ICatererProfileSerializer()

#     def create(self, validated_data):
#         i_caterer = validated_data.pop('i_caterer')
#         individual_user = IndividualCaterer.objects.create(**validated_data)
#         IndividualCatererProfile.objects.create(user=individual_user, **i_caterer)
#         return individual_user
# class BusinessCustomerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BusinessCustomer
#         fields = ['id', 'email', 'password', 'user_type','profile_status', 'b_customer']
#     b_customer = BCustomerProfileSerializer()

#     def create(self, validated_data):
#         b_customer = validated_data.pop('b_customer')
#         business_user = BusinessCustomer.objects.create(**validated_data)
#         BusinessCustomerProfile.objects.create(user=business_user, **b_customer)
#         return business_user
# class BusinessCatererSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BusinessCaterer
#         fields = ['id', 'email', 'password', 'user_type','profile_status', 'b_caterer']
#     b_caterer = BCatererProfileSerializer()

#     def create(self, validated_data):
#         b_caterer = validated_data.pop('b_caterer')
#         business_user = BusinessCaterer.objects.create(**validated_data)
#         BusinessCatererProfile.objects.create(user=business_user, **b_caterer)
#         return business_user