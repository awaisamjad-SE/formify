from django.urls import path
from .views import contact_us_api

urlpatterns = [
    path('api/contact/', contact_us_api, name='contact_us_api'),
]
