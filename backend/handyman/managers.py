from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth import models
from django.db import models

from .choices import UserChoice


class IndividualManager(models.Manager):
    def create_user(self, username, password=None):
        if not username or len(username) <= 0:
            raise ValueError("Manager: Useremail cannot be empty!!!")
        if not password:
            raise ValueError("Manager: Password cannot be null!!!")
        user = self.model(username=username)
        # email=self.normalize_email(email)
        user.set_password(password)
        user.save()
        return user
    
    def create(self, **kwargs):
        kwargs["user_type"] = UserChoice.INDIVIDUAL
        kwargs["password"] = make_password(kwargs["password"])
        return super().create(**kwargs)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.user_type = UserChoice.INDIVIDUAL
            self.password = make_password(self.password)
        return super().save(*args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()
        result = queryset.filter(user_type=UserChoice.INDIVIDUAL)
        return result