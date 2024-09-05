from django.db.models import TextChoices

class IndividualUserChoice(TextChoices):
    USER = "User", "User"
    SERVICE_PROVIDER = "Individual Service Provider", "Service Provider"

class ProfileStatusChoices(TextChoices):
    ACTIVE = "Active", "Active"
    BLOCKED = "Blocked", "Blocked"
    PENDING = "Pending", "Pending"
class RequestStatusChoices(TextChoices):
    PLACED = "Placed", "Placed"
    ACCEPTED = "Accepted", "Accepted"
    COMPLETED = "Completed", "Completed"
    OPEN = "Open", "Open"
    CANCELED = "Cancelled", "Cancelled"

class BusinessUserChoice(TextChoices):
    CONSUMER = "Business Consumer", "Consumer"
    SERVICE_PROVIDER = "Business Service Provider", "Service Provider"

class BusinessChoice(TextChoices):
    HANDYMAN_SERVICES = "handyman services", "Handyman Services"
    EDUCATION = "education", "Education"
    HOSPITALITY = "hospitality", "Hospitality"
    MANUFACTURING = "manufacturing", "Manufacturing"


class UserChoice(TextChoices):
    INDIVIDUAL = "i-customer", "Individual"
    INDIVIDUAL_CATERER = "i-caterer", "Individual Caterer"
    BUSINESS = "b-customer", "Business"
    BUSINESS_CATERER = "b-caterer", "Business Caterer"
    ADMIN = "admin", "Admin"
    STAFF = "staff", "Staff"

class IdentityDocumentType(TextChoices):
    CITIZENSHIP = "Citizenship", "Citizenship"
    NATIONAL_ID = "National ID", "National ID"
    LICENSE = "License", "License"
    PASSPORT = "Passport", "Passport"


class GenderChoice(TextChoices):
    MALE = "Male", "Male"
    FEMALE = "Female", "Female"
    OTHERS = "Others", "Others"
    DONT_DISCLOSE = "Not Disclosed", "Don't want to disclose"

class ProvinceChoice(TextChoices):
    PROVINCE_I = "Province-1", "Province-1"
    PROVINCE_II = "Province-2", "Province-2"
    PROVINCE_III = "Province-3", "Province-3"
    PROVINCE_IV = "Province-4", "Province-4"

class CityChoice(TextChoices):
    KATHMANDU = "Kathmandu", "Kathmandu"
    BHAKTAPUR = "Bhaktapur", "Bhaktapur"
    LALITPUR = "Lalitpur", "Lalitpur"
    BIRATNAGAR = "Biratnagar", "Biratnagar"