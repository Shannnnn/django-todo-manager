from rest_framework import viewsets, permissions
from .models import TodoTask
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = TodoTask.objects.filter(user=self.request.user)
        status = self.request.query_params.get('status')
        
        if status == 'completed':
            return queryset.filter(is_completed=True)
        elif status == 'pending':
            return queryset.filter(is_completed=False)
        return queryset

    def perform_create(self, serializer):
        # This links the task to the person who is logged in
        serializer.save(user=self.request.user)
