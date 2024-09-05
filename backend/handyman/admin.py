from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Service)
admin.site.register(Ratings)
admin.site.register(DeclineReasons)
admin.site.register(Requests)
admin.site.register(BusinessTypes)
admin.site.register(AcceptedRequests)
admin.site.register(DeclinedRequests)
admin.site.register(StaffProfile)
admin.site.register(BusinessCatererProfile)
admin.site.register(BusinessCustomerProfile)
admin.site.register(IndividualCatererProfile)
admin.site.register(IndividualCustomerProfile)