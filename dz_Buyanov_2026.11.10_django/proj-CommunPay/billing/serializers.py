from rest_framework import serializers
from billing.models import Apartment, Payment

class ApartmentShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apartment
        fields = ["id", "name"]

class ApartmentDetailSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Apartment
        fields = ["id", "name", "description", "images", "created_at"]

class PaymentSerializer(serializers.ModelSerializer):
    # Вложенный сериализатор (ДЗ №7)
    apartment_details = ApartmentShortSerializer(source="apartment", read_only=True)

    class Meta:
        model = Payment
        fields = "__all__"

    def validate_amount_due(self, value):
        if value < 0:
            raise serializers.ValidationError("Сумма не может быть отрицательной")
        return value