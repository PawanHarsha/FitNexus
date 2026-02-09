from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField()
    rating = models.FloatField(default=0.0)
    description = models.TextField()

    def __str__(self):
        return self.name

class Gym(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    type_choices = [
        ('GYM', 'Gym'),
        ('TRAINER', 'Trainer'),
        ('CLASS', 'Class'),
    ]
    type = models.CharField(max_length=20, choices=type_choices)
    price_per_session = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField(default=0.0)
    image = models.URLField()
    features = models.JSONField(default=list)

    def __str__(self):
        return self.name

class Package(models.Model):
    name = models.CharField(max_length=255)
    tier_choices = [
        ('STARTER', 'Starter'),
        ('PRO', 'Pro'),
        ('ELITE', 'Elite'),
    ]
    tier = models.CharField(max_length=20, choices=tier_choices)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.JSONField(default=list)
    description = models.TextField()
    image = models.URLField()

    def __str__(self):
        return self.name

class WorkoutSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    day = models.CharField(max_length=20) # e.g., 'Mon', 'Tue'
    calories = models.IntegerField()
    duration = models.IntegerField() # in minutes

    def __str__(self):
        return f"{self.day} - {self.calories} kcal"