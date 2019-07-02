from django.contrib import admin
from .models import Teachers,Slots,Timeslots,Venues,Sections,Courses

admin.site.register(Teachers)
admin.site.register(Slots)
admin.site.register(Timeslots)
admin.site.register(Venues)
admin.site.register(Sections)
admin.site.register(Courses)

