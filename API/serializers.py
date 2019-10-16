from core.models import Slots, Teachers, Sections, Timeslots, Courses, Venues
from rest_framework import serializers


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teachers
        fields = ('teachernum', 'teachername')


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = ('sectionnum', 'semester', 'section')


class TimeslotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeslots
        fields = ('timeslotnum', 'starttime', 'endtime')


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ('coursenum', 'coursecode')


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venues
        fields = ('venuenum', 'venuename')


class SlotSerializer(serializers.ModelSerializer):
    venue = VenueSerializer(source="venuenum")
    timeslot = TimeslotSerializer()
    course = CourseSerializer(
        source="coursenum", allow_null=True, default=None)
    teacher = TeacherSerializer(
        source="teachernum", allow_null=True, default=None)
    section = SectionSerializer(
        source="sectionnum", allow_null=True, default=None)

    class Meta:
        model = Slots
        fields = ('daynum', 'venue', 'timeslot',
                  'course', 'teacher', 'section')
