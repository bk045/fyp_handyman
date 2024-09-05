class RequestRatingSerilizer(serializers.ModelSerializer):
    ratings = RatingSerilizer(read_only=True)
    class Meta:
        model = Requests
        fields = ['id', 'req_date_time', 'client_id', 'caterer_id', 
                  'req_service', 'city', 'area', 'proposed_date_time',
                  'description', 'req_status', 'ratings']

class UserRequestSerilizer(serializers.ModelSerializer):
    client_request = RequestRatingSerilizer(read_only=True, many=True)
    caterer_request = RequestRatingSerilizer(read_only=True, many=True)
    class Meta:
        model=AppUser
        fields = ['id', 'profile_status', 'user_type',
                  'client_request', 'caterer_request']

# Request with Rating serializers End ---------------------------------------------------------------------------------- #

# Profile Detailed serializers Start ----------------------------------------------------------------------- #
class ICustomerSerializerDetailed(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    # services = ServiceMenuSerilizer(read_only=True, many=True)
    user = UserRequestSerilizer(read_only=True)
    class Meta:
        model = IndividualCustomerProfile
        fields = ['user', 'id', 'first_name', 'middle_name', 'last_name', 'gender', 'mobile', 'province',
                  'city', 'area', 'name', 'type']

class ICatererSerializerDetailed(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    services = ServiceMenuSerilizer(read_only=True, many=True)
    user = UserRequestSerilizer(read_only=True)
    class Meta:
        model = IndividualCatererProfile
        fields = ['user', 'id', 'first_name', 'middle_name', 'last_name', 'gender', 'mobile', 'province',
                  'city', 'area', 'id_type', 'id_number', 'id_photo', 'services', 'name', 'type', 'caterer']

class BCustomerSerializerDetailed(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    user = UserRequestSerilizer(read_only=True)
    class Meta:
        model = BusinessCustomerProfile
        fields = ['user', 'id', 'name_of_business', 'type_of_business', 'registration_no', 'document_photo', 'person_to_contact', 
                  'person_phone', 'province', 'city', 'area', 'name', 'type'] 
        
class BCatererSerializerDetailed(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    services = ServiceMenuSerilizer(read_only=True, many=True)
    user=UserRequestSerilizer(read_only=True)
    class Meta:
        model = BusinessCatererProfile
        fields = ['user', 'id', 'name_of_business', 'registration_no', 'person_to_contact', 
                  'person_phone', 'province', 'city', 'area', 'services', 'name', 'type']

# Profile Detailed serializers End -------------------------------------------------------------------------- #

class ICustomerNameOnlySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = IndividualCustomerProfile
        fields = ['id', 'name']
        
class ICatererNameOnlySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = IndividualCatererProfile
        fields = ['id', 'name']

class BCustomerNameOnlySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = BusinessCustomerProfile
        fields = ['id', 'name']       

class BCatererNameOnlySerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = BusinessCatererProfile
        fields = ['id', 'name']        
        
class AppUserWithProfileSerilizer(serializers.ModelSerializer):
    # settings.AUTH_USER_MODEL
    i_customer = ICustomerNameOnlySerializer(read_only=True)
    i_caterer = ICatererNameOnlySerializer(read_only=True)
    b_customer = BCustomerNameOnlySerializer(read_only=True)
    b_caterer = BCatererNameOnlySerializer(read_only=True)
    class Meta:
        model = AppUser
        fields = ['id', 'i_customer', 'i_caterer', 'b_customer', 'b_caterer']
