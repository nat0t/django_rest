from rest_framework.exceptions import NotFound
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import get_object_or_404

from .filters import ProjectFilter, TODOFilter
from .models import Project, TODO
from .serializers import ProjectModelSerializer, TODOModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TODOLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class TODOModelViewSet(ModelViewSet):
    queryset = TODO.objects.all()
    serializer_class = TODOModelSerializer
    pagination_class = TODOLimitOffsetPagination
    filterset_class = TODOFilter

    def list(self, request, *args, **kwargs):
        todos = TODO.objects.filter(is_active=True)
        serializer = TODOModelSerializer(todos, many=True,
                                         context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        todo = get_object_or_404(TODO, pk=pk)
        serializer = TODOModelSerializer(todo, context={'request': request})
        if todo.is_active == False:
            raise NotFound(detail='Error 404, page not found', code=404)
        return Response(serializer.data)

    def destroy(self, request, pk=None, *args, **kwargs):
        todo = get_object_or_404(TODO, pk=pk)
        serializer = TODOModelSerializer(todo, context={'request': request})
        todo.is_active = False
        todo.save()
        return Response(serializer.data)
