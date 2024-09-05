from django.conf import settings
from django.db import models
from .choices import *
from datetime import datetime
from django.utils import timezone

# Create your models here.

class Service(models.Model):
    service_id = models.CharField(primary_key=True, max_length=10, verbose_name="Service ID")
    title = models.CharField(max_length=50, null=False, blank=False, verbose_name="Name of Service")
    description = models.CharField(max_length=500, null=True, blank=True, verbose_name="Discription")
    def __str__(self):
        return "{}-{}".format(self.title, self.service_id);


class StaffProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='staff')
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    middle_name = models.CharField(max_length=50, null=True, blank=True, verbose_name="Middle Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    gender = models.CharField(max_length=10, verbose_name="Gender")
    mobile = models.CharField(max_length=25, verbose_name="Mobile No")
    province = models.CharField(max_length=50, verbose_name="Province")
    city = models.CharField(max_length=50, verbose_name="City")
    area = models.TextField(max_length=500, null=True, verbose_name="Area")
    id_type = models.CharField(max_length=50, null=True, verbose_name="ID type")
    id_number = models.CharField(max_length=50, null=True, verbose_name="ID No")
    id_photo = models.ImageField(upload_to="documents/i_caterer", height_field=None, width_field=None, max_length=100, null=True, blank=True, verbose_name="Upload image of your ID")
    profile_picture = models.ImageField(upload_to="profile/staff", null=True, blank=True, verbose_name="Upload Profile Picture")
    is_deleted = models.BooleanField(default=False)
    
    def name (self):
        if (not self.middle_name or self.middle_name=='null'):
            return "{} {}".format(self.first_name, self.last_name)
        else:
            return "{} {} {}".format(self.first_name, self.middle_name, self.last_name)
    
    def type (self):
        return ("Staff")
    
    def __str__(self):
        return "{} - {}".format((self.first_name +' '+self.last_name), "Staff Profile")
class IndividualCustomerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='i_customer')
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    middle_name = models.CharField(max_length=50, null=True, blank=True, verbose_name="Middle Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    gender = models.CharField(max_length=10, verbose_name="Gender")
    mobile = models.CharField(max_length=25, verbose_name="Mobile No")
    province = models.CharField(max_length=50, verbose_name="Province")
    city = models.CharField(max_length=50, verbose_name="City")
    area = models.TextField(max_length=500, null=True, verbose_name="Area")
    profile_picture = models.ImageField(upload_to="profile/i_cusotmer", null=True, blank=True, verbose_name="Upload Profile Picture")
    is_deleted = models.BooleanField(default=False)

    def name (self):
        if (not self.middle_name or self.middle_name=='null'):
            return "{} {}".format(self.first_name, self.last_name)
        else:
            return "{} {} {}".format(self.first_name, self.middle_name, self.last_name)

    def type (self):
        return ("I Customer")
    
    def __str__(self):
        return "{} - {}".format((self.first_name +' '+self.last_name), "Individual Customer Profile")
class IndividualCatererProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='i_caterer')
    first_name = models.CharField(max_length=50, verbose_name="First Name")
    middle_name = models.CharField(max_length=50, null=True, blank=True, verbose_name="Middle Name")
    last_name = models.CharField(max_length=50, verbose_name="Last Name")
    gender = models.CharField(max_length=10, verbose_name="Gender")
    mobile = models.CharField(max_length=25, verbose_name="Mobile No")
    province = models.CharField(max_length=50, verbose_name="Province")
    city = models.CharField(max_length=50, verbose_name="City")
    area = models.TextField(max_length=500, null=True, verbose_name="Area")
    services = models.ManyToManyField(Service, related_name='i_caterers')
    id_type = models.CharField(max_length=50, null=True, verbose_name="ID type")
    id_number = models.CharField(max_length=50, null=True, verbose_name="ID No")
    id_photo = models.ImageField(upload_to="documents/i_caterer", height_field=None, width_field=None, max_length=100, null=True, blank=True, verbose_name="Upload image of your ID")
    profile_picture = models.ImageField(upload_to="profile/i_caterer", null=True, blank=True, verbose_name="Upload Profile Picture")
    is_deleted = models.BooleanField(default=False)

    def name (self):
        if (not self.middle_name or self.middle_name=='null'):
            return "{} {}".format(self.first_name, self.last_name)
        else:
            return "{} {} {}".format(self.first_name, self.middle_name, self.last_name)
    
    def type (self):
        return ("I Caterer")
    
    def caterer (self):
        return ("Individual")
    
    def __str__(self):
        return "{} - {}".format((self.first_name +' '+self.last_name), "Individual Caterer Profile")
    
class BusinessCustomerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='b_customer')
    name_of_business = models.CharField(max_length=255, verbose_name="Name of the business")
    registration_no = models.CharField(max_length=100, null=True, blank=True, verbose_name="Business Registration No")
    document_photo = models.ImageField(null=True, blank=True, upload_to='documents/b_customer',verbose_name="Upload Registration Document")
    profile_picture = models.ImageField(upload_to="profile/b_customer", null=True, blank=True, verbose_name="Upload Profile Picture")
    person_to_contact = models.CharField(max_length=150, verbose_name="Person to contact")
    person_phone = models.CharField(max_length=25, verbose_name="Contact person phone")
    province = models.CharField(max_length=50, verbose_name="Province")
    city = models.CharField(max_length=50, verbose_name="City")
    area = models.TextField(max_length=500, verbose_name="Area")
    # reg_req_status = models.CharField(max_length=100, default='Pending', verbose_name="Status")
    type_of_business = models.CharField(max_length=50, verbose_name="Type of business")
    is_deleted = models.BooleanField(default=False)

    def name (self):
        return "{}".format(self.name_of_business)
    
    def type (self):
        return ("B Customer")

    def __str__(self):
        return "{} - {}".format((self.name_of_business), "Business Customer Profile")
class BusinessCatererProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='b_caterer')
    name_of_business = models.CharField(max_length=350, verbose_name="Name of the business")
    registration_no = models.CharField(max_length=100, null=True, blank=True, verbose_name="Business Registration No")
    document_photo = models.ImageField(upload_to="documents/b_caterer", null=True, blank=True, verbose_name="Upload Registration Document")
    profile_picture = models.ImageField(upload_to="profile/b_caterer", null=True, blank=True, verbose_name="Upload Profile Picture")
    person_to_contact = models.CharField(max_length=150, verbose_name="Person to contact")
    person_phone = models.CharField(max_length=25, verbose_name="Contact person phone")
    province = models.CharField(max_length=100, verbose_name="Province")
    city = models.CharField(max_length=100, verbose_name="City")
    area = models.TextField(max_length=500, verbose_name="Area")
    # reg_req_status = models.CharField(max_length=100, default='Pending', verbose_name="Status")
    services = models.ManyToManyField(Service, blank=True, related_name='b_caterers')
    is_deleted = models.BooleanField(default=False)

    def name (self):
        return "{}".format(self.name_of_business)
    
    def type (self):
        return ("B Caterer")

    def caterer (self):
        return ("Business")

    def __str__(self):
        return "{} - {}".format((self.name_of_business), "Business Caterer Profile")
    # null=True, blank=True, 
class Requests(models.Model):
    req_date_time = models.DateTimeField(default=datetime.now, verbose_name="Request Date and Time")
    client_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, verbose_name="Client ID", related_name='client_request')
    caterer_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, verbose_name="Caterer ID", related_name='caterer_request')
    req_service = models.CharField(max_length=25, verbose_name="Problem on")
    city = models.CharField(max_length=50, verbose_name="City")
    area = models.TextField(max_length=500, verbose_name="Area")
    proposed_date_time = models.DateTimeField(verbose_name="Request Date and Time")
    description = models.TextField(max_length=1000, verbose_name="Problem Discription")
    req_status = models.CharField(max_length=10, null=True, blank=True, default=RequestStatusChoices.PLACED, verbose_name="Request Status")
    def __str__(self):
        return "{} - {}".format((self.client_id), (self.caterer_id))

class Ratings(models.Model):
    request = models.OneToOneField(Requests, on_delete=models.CASCADE, related_name='rating')
    ratings = models.IntegerField()
    user_feedback = models.TextField(max_length=500, null=True, blank=True, verbose_name="User Feedback")

    
    # def __str__(self):
    #     return (self.request)

class DeclineReasons(models.Model):
    reason_id = models.CharField(primary_key=True, max_length=10, unique=True, verbose_name="Reason ID")
    reason = models.CharField(max_length=100, null=False, blank=False, verbose_name="Decline Reason")
    def __str__(self):
        return "{}-{}".format(self.reason_id, self.reason);
 

class AcceptedRequests(models.Model):
    request = models.OneToOneField(Requests, on_delete=models.CASCADE, related_name='accepted')
    acpt_date_time = models.DateTimeField(default=datetime.now, verbose_name="Accepted Date and Time")
    closed_date_time = models.DateTimeField(null=True, blank=True, verbose_name="Closed Date and Time")
    agreed_cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name="Service Charge")
    req_status = models.CharField(max_length=10, blank=True, default=RequestStatusChoices.OPEN, verbose_name="Request Status")
    
class DeclinedRequests(models.Model):
    request = models.OneToOneField(Requests, on_delete=models.CASCADE, related_name='declined')
    user_type = models.CharField(max_length=25, choices=UserChoice.choices)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.PROTECT, verbose_name="User to decline")
    date_time = models.DateTimeField(default=datetime.now, null=True, verbose_name="Declined Date and Time")
    reason = models.ForeignKey(DeclineReasons, null=True, on_delete=models.PROTECT, verbose_name="Reason")

class BusinessTypes(models.Model):
    type_of_business = models.CharField(max_length=50, null=False, blank=False, verbose_name="Business Type")
    def __str__(self):
        return "{}".format(self.type_of_business);

class UserImage(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='image')
    image = models.ImageField(upload_to='handyman/users')