from rest_framework.serializers import HyperlinkedModelSerializer, \
    ModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'first_name', 'last_name', 'email')


class UserModelSerializerService(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'first_name', 'last_name', 'email',
                  'is_superuser', 'is_staff')
