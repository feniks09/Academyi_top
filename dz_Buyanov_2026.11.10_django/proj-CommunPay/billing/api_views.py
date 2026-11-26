from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from billing.models import Apartment, Payment
from billing.serializers import ApartmentShortSerializer, ApartmentDetailSerializer, PaymentSerializer
from django.db import transaction

class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name"]
    ordering_fields = ["created_at"]
    
    def get_serializer_class(self):
        if self.action == "list":
            return ApartmentShortSerializer
        return ApartmentDetailSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "destroy"]:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    @action(detail=False, methods=["get"])
    def popular(self, request):
        popular_apartments = Apartment.objects.annotate(count=Count("payments")).order_by("-count")[:5]
        serializer = ApartmentShortSerializer(popular_apartments, many=True)
        return Response(serializer.data)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_fields = ["apartment", "service", "year"]
    search_fields = ["service"]

    # Защита от гонок данных при создании (ДЗ №6)
    def perform_create(self, serializer):
        with transaction.atomic():
            # select_for_update блокирует квартиру, пока мы создаем платеж
            apartment = Apartment.objects.select_for_update().get(pk=serializer.validated_data['apartment'].pk)
            serializer.save()