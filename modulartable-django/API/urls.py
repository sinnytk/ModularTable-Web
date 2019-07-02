from django.urls import path
from . import views

urlpatterns = [
    path("slots/",views.SlotListView.as_view(), name='slot-list'),
    path("teachers/",views.TeacherListView.as_view(), name='teacher-list'),
    path("venues/",views.VenueListView.as_view(), name='venue-list'),
    path("courses/",views.CourseListView.as_view(), name='course-list'),
    path("sections/",views.SectionListView.as_view(), name='section-list'),
    path("timeslots/",views.TimeslotListView.as_view(), name='timeslot-list')


]