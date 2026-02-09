from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products),
    path('gyms/', views.get_gyms),
    path('packages/', views.get_packages),
    path('dashboard/', views.get_dashboard),
]