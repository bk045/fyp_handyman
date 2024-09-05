from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers


# The following serializers have been added to override joser default serializers to display
# additional fields. (GOTO: Djoser documentation 'Serilizer' section to know more about it.)
class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['id', 'email', 'profile_status', 'user_type', 'is_deleted']

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'email', 'password', 'user_type', 'profile_status']

