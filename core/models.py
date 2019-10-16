from django.db import models


class Courses(models.Model):
    coursenum = models.AutoField(db_column='coursenum', primary_key=True)
    coursecode = models.CharField(db_column='coursecode', max_length=10, blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'courses'


class Sections(models.Model):
    sectionnum = models.AutoField(db_column='sectionnum', primary_key=True)
    semester = models.CharField(max_length=1, blank=True, null=False)
    section = models.CharField(max_length=2, blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'sections'
        
class Teachers(models.Model):
    teachernum = models.AutoField(db_column='teachernum', primary_key=True)
    teachername = models.CharField(max_length=60, blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'teachers'


class Timeslots(models.Model):
    timeslotnum = models.AutoField(db_column='timeslotnum', primary_key=True)
    starttime = models.TimeField(db_column='starttime', blank=True, null=False)
    endtime = models.TimeField(db_column='endtime', blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'timeslots'


class Venues(models.Model):
    venuenum = models.AutoField(db_column='venuenum', primary_key=True)
    venuename = models.CharField(db_column='venuename', max_length=6, blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'venues'


class Slots(models.Model):
    daynum = models.IntegerField(db_column='daynum', primary_key=True)
    venuenum = models.ForeignKey(Venues, models.CASCADE, db_column='venuenum')
    timeslot = models.ForeignKey(Timeslots, models.CASCADE, db_column='timeslot')
    coursenum = models.ForeignKey(Courses, models.CASCADE, db_column='coursenum', blank=True, null=True)
    teachernum = models.ForeignKey(Teachers, models.CASCADE, db_column='teachernum', blank=True, null=True)
    sectionnum = models.ForeignKey(Sections, models.CASCADE, db_column='sectionnum', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'slots'
        unique_together = (('daynum', 'venuenum', 'timeslot'),)