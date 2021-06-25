from .models import User
from .serializers import UserModelSerializer, UserModelSerializerService
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework import renderers


class UserCustomViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    renderer_classes = [renderers.JSONRenderer, renderers.BrowsableAPIRenderer]

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializerService
        return UserModelSerializer
