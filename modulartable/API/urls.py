from django.urls import path
from . import views

urlpatterns = [
    path("slots/",views.slot_list)
]