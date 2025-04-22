from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('forms_lab.urls')),
    path('', include('contact_us.urls')),
    path('api/accounts/', include('accounts.urls')),
]
