from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(AppUser)
admin.site.register(Staff)
admin.site.register(IndividualCustomer)
admin.site.register(IndividualCaterer)
admin.site.register(BusinessCustomer)
admin.site.register(BusinessCaterer)