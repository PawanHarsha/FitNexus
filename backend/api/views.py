from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product, Gym, Package, WorkoutSession
from .serializers import ProductSerializer, GymSerializer, PackageSerializer, WorkoutSessionSerializer

@api_view(['GET'])
def get_products(request):
    category = request.query_params.get('category', 'All')
    if category == 'All':
        products = Product.objects.all()
    else:
        products = Product.objects.filter(category=category)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_gyms(request):
    query = request.query_params.get('search', '')
    if query:
        gyms = Gym.objects.filter(name__icontains=query) | Gym.objects.filter(location__icontains=query)
    else:
        gyms = Gym.objects.all()
    serializer = GymSerializer(gyms, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_packages(request):
    packages = Package.objects.all()
    serializer = PackageSerializer(packages, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_dashboard(request):
    # In a real app, filter by request.user
    workouts = WorkoutSession.objects.all()[:7] # Last 7 entries
    serializer = WorkoutSessionSerializer(workouts, many=True)
    return Response(serializer.data)