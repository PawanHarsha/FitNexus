from rest_framework import serializers
from .models import Product, Gym, Package, WorkoutSession

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class GymSerializer(serializers.ModelSerializer):
    pricePerSession = serializers.DecimalField(source='price_per_session', max_digits=10, decimal_places=2)
    class Meta:
        model = Gym
        fields = ['id', 'name', 'location', 'type', 'pricePerSession', 'rating', 'image', 'features']

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class WorkoutSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSession
        fields = ['day', 'calories', 'duration']