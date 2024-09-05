def setUp(self):
    print('Setting up .....')
    self.client = APIClient()
    self.url = reverse("users-list")
    self.resolver_match = resolve(self.url)
    # self.admin = AppUser.objects.get()
    self.i_user = AppUser.objects.create(password='jane', email='jane_i@example.com', user_type='i-customer')
    self.ic_user = AppUser.objects.create(password='jane', email='jane_ic@example.com', user_type='i-caterer')
    self.b_user = AppUser.objects.create(password='john', email='john_b@example.com', user_type='b-customer')
    self.bc_user = AppUser.objects.create(password='john', email='john_bc@example.com', user_type='b-caterer')
    self.service = Service.objects.create(service_id='SV-100', title='Carpentery', description='')
    # self.user = IndividualCustomerProfile.objects.create('first_name')
    self.i_customer_user_profile = IndividualCustomerProfile.objects.create(user=self.i_user,
                                                                first_name='Ram', 
                                                                    middle_name='',
                                                                    last_name='Khadka',
                                                                    gender='Male',
                                                                    mobile='98653764',
                                                                    province='Province-5',
                                                                    city='Kathmandu',
                                                                    area='Koteshower')
    
    self.i_caterer_user_profile = IndividualCatererProfile.objects.create(user=self.ic_user,
                                                                first_name='Ram', 
                                                                    middle_name='',
                                                                    last_name='Khadka',
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
    
    self.b_caterer_user_profile = BusinessCatererProfile.objects.create(user=self.bc_user,
                                                                name_of_business='Islington College', 
                                                                    registration_no='87678',
                                                                    person_to_contact='Chetan',
                                                                    person_phone='976798687',
                                                                    province='Province-5',
                                                                    city='Kathmandu',
                                                                    area='Koteshower',)
    self.b_caterer_user_profile.services.add(self.service)