# from __future__ import unicode_literals
from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.contrib.auth.hashers import make_password
from datetime import datetime

from .managers import *
from .choices import UserChoice, ProfileStatusChoices


class AppUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), max_length=50, unique=True)
    password = models.CharField(max_length=100, verbose_name="Password")
    # avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    user_type = models.CharField(_('user type'), max_length=20,choices=UserChoice.choices, default=UserChoice.NA)
    profile_status = models.CharField(max_length=20, choices=ProfileStatusChoices.choices, default='Pending', blank=True, null=True, verbose_name="Profile Status")
    
    date_joined = models.DateTimeField(_('date joined'),default=datetime.now, blank=True, null=True)
    last_chat_room_access = models.DateTimeField(_("last chat room login"), blank=True, null=True)
    last_login = models.DateTimeField(_("last login"), blank=True, null=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff'), default=False)
    is_deleted = models.BooleanField(_('deleted'), default=False)

    objects = AppUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    # class Meta:
    #     verbose_name = _('user')
    #     verbose_name_plural = _('users')

    def get_full_name(self):
        '''
        Returns the first_name plus the last_name, with a space in between.
        '''
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)

class Staff(AppUser):
    class Meta:
        proxy = True
        
    objects = StaffManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = UserChoice.STAFF
            self.password = make_password(self.password)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email
class BusinessCustomer(AppUser):
    class Meta:
        proxy = True
        
    objects = BusinessManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = UserChoice.BUSINESS
            self.password = make_password(self.password)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email
class BusinessCaterer(AppUser):
    class Meta:
        proxy = True
        
    objects = BusinessCatererManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = UserChoice.BUSINESS_CATERER
            self.password = make_password(self.password)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email


class IndividualCustomer(AppUser):
    class Meta:
        proxy = True
        
    objects = IndividualManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = UserChoice.INDIVIDUAL
            self.password = make_password(self.password)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email
class IndividualCaterer(AppUser):
    class Meta:
        proxy = True
        
    objects = IndividualCatererManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = UserChoice.INDIVIDUAL_CATERER
            self.password = make_password(self.password)
        return super().save(*args, **kwargs)
    
    def __str__(self):
        return self.email