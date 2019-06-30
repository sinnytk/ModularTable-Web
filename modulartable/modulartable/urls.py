from django.contrib import admin
from django.urls import path, include
import API.urls


urlpatterns = [
    path('',include(API.urls)),
    path('admin/', admin.site.urls),
]
