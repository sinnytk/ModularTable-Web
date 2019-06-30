from django.db import models


class Courses(models.Model):
    coursenum = models.AutoField(db_column='courseNum', primary_key=True)
    coursecode = models.CharField(db_column='courseCode', max_length=10, blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'courses'


class Sections(models.Model):
    sectionnum = models.AutoField(db_column='sectionNum', primary_key=True)
    semester = models.CharField(max_length=1, blank=True, null=False)
    section = models.CharField(max_length=2, blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'sections'


class Slots(models.Model):
    daynum = models.IntegerField(db_column='dayNum', primary_key=True)
    venuenum = models.ForeignKey('Venues', models.CASCADE, db_column='venueNum')
    timeslot = models.ForeignKey('Timeslots', models.CASCADE, db_column='timeSlot')
    coursenum = models.ForeignKey(Courses, models.CASCADE, db_column='courseNum', blank=True, null=True)
    teachernum = models.ForeignKey('Teachers', models.CASCADE, db_column='teacherNum', blank=True, null=True)
    sectionnum = models.ForeignKey(Sections, models.CASCADE, db_column='sectionNum', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'slots'
        unique_together = (('daynum', 'venuenum', 'timeslot'),)


class Teachers(models.Model):
    teachernum = models.AutoField(db_column='teacherNum', primary_key=True)
    teachername = models.CharField(max_length=60, blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'teachers'


class Timeslots(models.Model):
    timeslotnum = models.AutoField(db_column='timeSlotNum', primary_key=True)
    starttime = models.TimeField(db_column='startTime', blank=True, null=False)
    endtime = models.TimeField(db_column='endTime', blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'timeslots'


class Venues(models.Model):
    venuenum = models.AutoField(db_column='venueNum', primary_key=True)
    venuename = models.CharField(db_column='venueName', max_length=6, blank=False, null=False)

    class Meta:
        managed = False
        db_table = 'venues'