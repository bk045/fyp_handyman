
class ICustomerProfileViewSet(ModelViewSet):
    queryset=IndividualCustomerProfile.objects.all()
    serializer_class= ICustomerProfileSerializer
    # permission_classes=[IsAdminUser]
    # False if want to get this action available in the list view, i-customer/me
    # True if want to get this action available to the specific user, i-customer/1/me
    @action(detail=False, methods=['GET', 'PATCH'])
    def me(self, request 
        #    permission_classes=[IsAuthenticated]
           ):
        user = AppUser.objects.get(id=request.user.id)
        # get_or_create returns tuple. So, it needs unpacking
        user_profile = IndividualCustomerProfile.objects.get(user = user)
        if request.method == 'GET':
            serializer = ICustomerProfileSerializer(user_profile)
            return Response(serializer.data)
        elif request.method == 'PATCH':
            serializer = ICustomerProfileSerializer(user_profile, request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
    
    @action(detail=False, methods=['POST'])
    def create_profile(self, request):
            # print(request.data['user_id'])
            user = AppUser.objects.get(id=request.data['user_id'])
            # print (user)
            profile = IndividualCustomerProfile.objects.create(user=user)
            serializer = ICustomerProfileSerializer(profile, request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
    
class ICatererProfileViewSet(ModelViewSet):
    queryset=IndividualCatererProfile.objects.all()
    serializer_class= ICatererProfileSerializer
    # permission_classes=[IsAdminOrReadOnly]
    
    @action(detail=False, methods=['GET', 'PATCH'])
    def me(self, request):
        print(request.user.id)
        user = AppUser.objects.get(pk=request.user.id)
        # get_or_create returns tuple. So, it needs unpacking
        user_profile = IndividualCatererProfile.objects.get(user = user)
        if request.method == 'GET':
            serializer = ICatererProfileSerializer(user_profile)
            return Response(serializer.data)
        # elif request.method == 'POST':
        #     serializer = ICatererProfileSerializer(user_profile, request.data)
        #     serializer.is_valid(raise_exception=True)
        #     serializer.save()
        #     return Response(serializer.data)
        elif request.method == 'PATCH':
            serializer = ICatererProfileSerializer(user_profile, request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def create_profile(self, request):
        user = AppUser.objects.get(id=request.data['user_id'])
        profile = IndividualCatererProfile.objects.create(user=user)
        serializer = ICatererProfileSerializer(profile, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
class BCustomerProfileViewSet(ModelViewSet):
    queryset=BusinessCustomerProfile.objects.all()
    serializer_class= BCustomerProfileSerializer

    @action(detail=False, methods=['GET', 'PATCH'])
    def me(self, request):
        user = AppUser.objects.get(id=request.user.id)
        user_profile = BusinessCustomerProfile.objects.get(user = user)
        if request.method == 'GET':
            serializer = BCustomerProfileSerializer(user_profile)
            return Response(serializer.data)
        elif request.method == 'PATCH':
            # get_or_create returns tuple. So, it needs unpacking
            serializer = BCustomerProfileSerializer(user_profile, request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        
    @action(detail=False, methods=['POST'])
    def create_profile(self, request):
        user = AppUser.objects.get(id=request.data['user_id'])
        profile = BusinessCustomerProfile.objects.create(user=user)
        serializer = BCustomerProfileSerializer(profile, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
class BCatererProfileViewSet(ModelViewSet):
    queryset=BusinessCatererProfile.objects.all()
    serializer_class= BCatererProfileSerializer

    @action(detail=False, methods=['GET', 'PATCH'])
    def me(self, request):
        user = AppUser.objects.get(id=request.user.id)
        # get_or_create returns tuple. So, it needs unpacking
        user_profile = BusinessCatererProfile.objects.get(user = user)
        if request.method == 'GET':
            serializer = BCatererProfileSerializer(user_profile)
            return Response(serializer.data)
        elif request.method == 'PATCH':
            serializer = BCatererProfileSerializer(user_profile, request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
    
    @action(detail=False, methods=['POST'])
    def create_profile(self, request):
        user = AppUser.objects.get(id=request.data['user_id'])
        profile = BusinessCatererProfile.objects.create(user=user)
        serializer = BCatererProfileSerializer(profile, request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ICatererCardDataViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    serializer_class = ICatererCardDataSerializer 
    def get_queryset(self):
        queryset = IndividualCatererProfile.objects.prefetch_related('services').all()
        # queryset = IndividualCatererProfile.objects.all()
        # if not user.user_type== 'admin' and not user.user_type == 'staff':
        #     queryset = Requests.objects.filter(client_id=self.request.user.id)
        # else:
        #     queryset = Requests.objects.all()
        return queryset
    
# class MinimalProfileViewSet(ListModelMixin, RetrieveModelMixin,GenericViewSet):
#     def get_serializer_class(self):
#         user = AppUser.objects.get(id=self.kwargs['user_pk'])
#         if (user.user_type == 'i-caterer'):
#             return ICatererProfileSerializer
#         elif (user.user_type == 'i-customer'):
#             return ICustomerProfileSerializer
#         elif (user.user_type == 'b-customer'):
#             return BCustomerProfileSerializer
#         elif (user.user_type == 'b-caterer'):
#             return BCatererProfileSerializer

#     def get_queryset(self):
#         user = AppUser.objects.get(id=self.kwargs['user_pk'])
#         if (user.user_type == 'i-caterer'):
#             return IndividualCatererProfile.objects.filter(user=user)
#         elif (user.user_type == 'i-customer'):
#             return IndividualCustomerProfile.objects.filter(user=user)
#         elif (user.user_type == 'b-caterer'):
#             return BusinessCatererProfile.objects.filter(user=user)
#         elif (user.user_type == 'b-customer'):
#             return BusinessCustomerProfile.objects.filter(user=user)

# class DetailProfileViewSet(ListModelMixin, GenericViewSet):
#     def get_serializer_class(self):
#         user = AppUser.objects.get(id=self.kwargs['user_pk'])
#         if (user.user_type == 'i-caterer'):
#             return ICatererSerializerDetailed
#         elif (user.user_type == 'i-customer'):
#             return ICustomerSerializerDetailed
#         elif (user.user_type == 'b-customer'):
#             return BCustomerSerializerDetailed
#         elif (user.user_type == 'b-caterer'):
#             return BCatererSerializerDetailed

#     def get_queryset(self):
#         user = AppUser.objects.get(id=self.kwargs['user_pk'])
#         if (user.user_type == 'i-caterer'):
#             return IndividualCatererProfile.objects.filter(user=user)
#         elif (user.user_type == 'i-customer'):
#             return IndividualCustomerProfile.objects.filter(user=user)
#         elif (user.user_type == 'b-caterer'):
#             return BusinessCatererProfile.objects.filter(user=user)
#         elif (user.user_type == 'b-customer'):
#             return BusinessCustomerProfile.objects.filter(user=user)


