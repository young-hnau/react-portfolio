from django.urls import path
from . import views

urlpatterns = [
    path('agify/', views.agify, name='agify'),
    path('cats/', views.cats, name='cats'),
    path('recipe/', views.recipe, name='recipe'),
]