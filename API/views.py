from core.models import Slots
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from core.models import Slots, Venues, Courses, Teachers, Sections, Timeslots
from .serializers import SlotSerializer, VenueSerializer, CourseSerializer, TeacherSerializer, SectionSerializer, TimeslotSerializer


class VenueListView(generics.ListAPIView):
    model = Venues
    serializer_class = VenueSerializer

    def get_queryset(self):
        queryset = Venues.objects.all()
        if 'venueName' in self.request.data:
            queryset = queryset.filter(venuename=self.request.data['venueName'])
        if 'venueNum' in self.request.data:
            queryset = queryset.filter(venuenum=self.request.data['venueNum'])
        return queryset


class CourseListView(generics.ListAPIView):
    model = Courses
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Courses.objects.all()
        if 'courseCode' in self.request.data:
            queryset = queryset.filter(coursecode=self.request.data['courseCode'])
        if 'courseNum' in self.request.data:
            queryset = queryset.filter(coursenum=self.request.data['courseNum'])
        return queryset

class TeacherListView(generics.ListAPIView):
    model = Teachers
    serializer_class = TeacherSerializer

    def get_queryset(self):
        queryset = Teachers.objects.all()
        if 'teacherName' in self.request.data:
            queryset = queryset.filter(teachername=self.request.data['teacherName'])
        if 'teacherNum' in self.request.data:
            queryset = queryset.filter(teaechernum=self.request.data['teacherNum'])
        return queryset


class SectionListView(generics.ListAPIView):
    model = Sections
    serializer_class = SectionSerializer

    def get_queryset(self):
        queryset = Teachers.objects.all()
        if 'sectionNum' in self.request.data:
            queryset = queryset.filter(sectionum=self.request.data['sectionNum'])
        if 'section' in self.request.data:
            queryset = queryset.filter(section=self.request.data['section'])
        if 'semester' in self.request.data:
            queryset = queryset.filter(semester=self.request.data['semester'])
        return queryset


class TimeslotListView(generics.ListAPIView):
    model = Timeslots
    serializer_class = TimeslotSerializer

    def get_queryset(self):
        queryset = Teachers.objects.all()
        if 'timeslotNum' in self.request.data:
            queryset = queryset.filter(timeslot=self.request.data['timeslotNum'])
        if 'starttime' in self.request.data:
            queryset = queryset.filter(starttime=self.request.data['starttime'])
        if 'endttime' in self.request.data:
            queryset = queryset.filter(endttime=self.request.data['endttime'])
        return queryset


class SlotListView(generics.ListAPIView):
    model = Slots
    serializer_class = SlotSerializer
    def get_queryset(self):
        queryset=Slots.objects.all()
        if 'dayNum' in self.request.data:
            queryset=queryset.filter(daynum=self.request.data['dayNum'])
            print(queryset)
        if 'venueNum' in self.request.data:
            queryset=queryset.filter(venuenum=self.request.data['venueNum'])
        elif 'venueName' in self.request.data:
            queryset=queryset.filter(venuenum__venuename=self.request.data['venueName'])
        if 'courseNum' in self.request.data:
            queryset=queryset.filter(coursenum=self.request.data['courseNum'])
        elif 'courseCode' in self.request.data:
            queryset=queryset.filter(coursenum__coursecode=self.request.data['courseCode'])
        if 'teacherNum' in self.request.data:
            queryset=queryset.filter(teachernum=self.request.data['teacherNum'])
        elif 'teacherName' in self.request.data:
            queryset=queryset.filter(teachernum__teachername__icontains=self.request.data['teacherName'])
        if 'sectionNum' in self.request.data:
            queryset=queryset.filter(sectionnum=self.request.data['sectioNum'])
        elif 'semester' in self.request.data:
            queryset=queryset.filter(sectionnum__semester=self.request.data['semester'])
            if 'section' in self.request.data:
                queryset=queryset.filter(sectionum__section=self.request.data['section'])
        
        return queryset

            

