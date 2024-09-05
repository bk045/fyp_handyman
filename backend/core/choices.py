from django.db.models import TextChoices

class UserChoice(TextChoices):
    INDIVIDUAL = "i-customer", "Individual"
    INDIVIDUAL_CATERER = "i-caterer", "Individual Caterer"
    BUSINESS = "b-customer", "Business"
    BUSINESS_CATERER = "b-caterer", "Business Caterer"
    STAFF = "staff", "Staff"
    NA = "na", "NA"
    ADMIN = "admin", "Admin"

class ProfileStatusChoices(TextChoices):
    ACTIVE = "Active", "Active"
    BLOCKED = "Blocked", "Blocked"
    PENDING = "Pending", "Pending"