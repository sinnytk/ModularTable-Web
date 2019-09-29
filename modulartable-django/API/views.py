from core.models import Slots
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from core.models import Slots, Venues, Courses, Teachers, Sections, Timeslots
from .serializers import SlotSerializer, VenueSerializer, CourseSerializer, TeacherSerializer, SectionSerializer, TimeslotSerializer
from collections import defaultdict


class VenueListView(generics.ListAPIView):
    model = Venues
    serializer_class = VenueSerializer

    def get_queryset(self):
        queryset = Venues.objects.all()
        if 'venueName' in self.request.query_params:
            queryset = queryset.filter(
                venuename=self.request.query_params['venueName'])
        if 'venueNum' in self.request.query_params:
            queryset = queryset.filter(
                venuenum=self.request.query_params['venueNum'])
        return queryset


class CourseListView(generics.ListAPIView):
    model = Courses
    serializer_class = CourseSerializer

    def get_queryset(self):
        queryset = Courses.objects.all()
        if 'courseCode' in self.request.query_params:
            queryset = queryset.filter(
                coursecode=self.request.query_params['courseCode'])
        if 'courseNum' in self.request.query_params:
            queryset = queryset.filter(
                coursenum=self.request.query_params['courseNum'])
        return queryset


class TeacherListView(generics.ListAPIView):
    model = Teachers
    serializer_class = TeacherSerializer

    def get_queryset(self):
        queryset = Teachers.objects.all()
        if 'teacherName' in self.request.query_params:
            queryset = queryset.filter(
                teachername=self.request.query_params['teacherName'])
        if 'teacherNum' in self.request.query_params:
            queryset = queryset.filter(
                teaechernum=self.request.query_params['teacherNum'])
        return queryset


class SectionListView(generics.ListAPIView):
    model = Sections
    serializer_class = SectionSerializer

    def get_queryset(self):
        queryset = Teachers.objects.all()
        if 'sectionNum' in self.request.query_params:
            queryset = queryset.filter(
                sectionum=self.request.query_params['sectionNum'])
        if 'section' in self.request.query_params:
            queryset = queryset.filter(
                section=self.request.query_params['section'])
        if 'semester' in self.request.query_params:
            queryset = queryset.filter(
                semester=self.request.query_params['semester'])
        return queryset


class TimeslotListView(generics.ListAPIView):
    model = Timeslots
    serializer_class = TimeslotSerializer

    def get_queryset(self):
        queryset = Teachers.objects.all()
        if 'timeslotNum' in self.request.query_params:
            queryset = queryset.filter(
                timeslot=self.request.query_params['timeslotNum'])
        if 'starttime' in self.request.query_params:
            queryset = queryset.filter(
                starttime=self.request.query_params['starttime'])
        if 'endttime' in self.request.query_params:
            queryset = queryset.filter(
                endttime=self.request.query_params['endttime'])
        return queryset


class SlotListView(generics.ListAPIView):
    model = Slots
    serializer_class = SlotSerializer

    def get_queryset(self):
        queryset = Slots.objects.all()
        if 'dayNum' in self.request.query_params:
            queryset = queryset.filter(
                daynum=self.request.query_params['dayNum'])
        if 'venueNum' in self.request.query_params:
            queryset = queryset.filter(
                venuenum=self.request.query_params['venueNum'])
        elif 'venueName' in self.request.query_params:
            queryset = queryset.filter(
                venuenum__venuename=self.request.query_params['venueName'])
        if 'courseNum' in self.request.query_params:
            queryset = queryset.filter(
                coursenum=self.request.query_params['courseNum'])
        elif 'courseCode' in self.request.query_params:
            queryset = queryset.filter(
                coursenum__coursecode=self.request.query_params['courseCode'])
        if 'teacherNum' in self.request.query_params:
            queryset = queryset.filter(
                teachernum=self.request.query_params['teacherNum'])
        elif 'teacherName' in self.request.query_params:
            queryset = queryset.filter(
                teachernum__teachername__icontains=self.request.query_params['teacherName'])
        if 'sectionNum' in self.request.query_params:
            queryset = queryset.filter(
                sectionnum=self.request.query_params['sectionNum'])
        elif 'semester' in self.request.query_params:
            queryset = queryset.filter(
                sectionnum__semester=self.request.query_params['semester'])
            if 'section' in self.request.query_params:
                queryset = queryset.filter(
                    sectionum__section=self.request.query_params['section'])

        return queryset


class TimetableGenerateView(APIView):
    def get(self, request):
        slot_data = defaultdict(lambda: defaultdict(list))
        teacher_data = Teachers.objects.all()
        section_data = Sections.objects.all().order_by('semester', 'section')
        course_data = Courses.objects.all().order_by('coursecode')

        slots = Slots.objects.all().order_by('daynum', 'venuenum__venuename', 'timeslot')

        for slot in slots:
            slot_data[slot.daynum][slot.venuenum.venuename].append(
                SlotSerializer(slot).data)
        return Response(data={'slots': slot_data,
                              'teachers': TeacherSerializer(teacher_data, many=True).data,
                              'sections': SectionSerializer(section_data, many=True).data,
                              'courses': CourseSerializer(course_data, many=True).data})
