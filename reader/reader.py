from openpyxl import load_workbook
from datetime import time as Time


class TimeSlot():
    def __init__(self, startTime, endTime):
        self.startTime = startTime
        self.endTime = endTime
    def __repr__(self):
        return "TimeSlot(%s,%s)" % (self.startTime, self.endTime)
class Teacher():
    def __init__(self, teacherName):
        self.teacherName = teacherName
    def __repr__(self):
        return "Teacher(%s)" % (self.teacherName)
    def __eq__(self,other):
        return self.teacherName == other.teacherName
    def __hash__(self):
        return hash(self.__repr__())
class Slot():
    def __init__(self, courseNum, teacherNum, sectionNum):
        self.courseNum = courseNum
        self.teacherNum = teacherNum
        self.sectionNum = sectionNum
    def __repr__(self):
        return "Slot(%s,%s,%s)" % (self.courseNum,self.teacherNum,self.sectionNum)
    def __eq__(self, other):
        return (self.courseNum == other.courseNum) and (self.sectionNum == other.sectionNum) and (self.teacherNum == other.teacherNum)
    def __hash__(self):
        return hash(self.__repr__())
class Section():
    def __init__(self,semester,section):
        self.semester = semester
        self.section = section
    def __repr__(self):
        return "Section(%s,%s)" % (self.semester, self.section)
    def __eq__(self, other):
        return (self.semester == other.semester and self.section == other.section)
    def __hash__(self):
        return hash(self.__repr__())
class Course():
    def __init__(self,courseCode):
        self.courseCode = courseCode
    def __repr__(self):
        return "Course(%s)" % (self.courseCode)
    def __eq__(self, other):
        return (self.courseCode == other.courseCode)
    def __hash__(self):
        return hash(self.__repr__())



#dict for records which may be repeated
#list for records which are constant
venues = []
teachers = {}
timeslots = []
courses = {}
slots = []
sections = {}


def main():
    venues = set()
    teachers = set()
    timeslots = set()
    courses = set()
    sections = set()
    tt = load_workbook('timetable.xlsx')
    sheet = tt.worksheets[0]
    # read timeslots
    for cell in sheet[4][2:]:
        if(cell.value == None):
            break
        else:
            time = cell.value.split(' - ')
            start = time[0].split(':')
            end = time[1].split(':')
            timeslots.add(timeSlot(Time(int(start[0].strip()), int(
                start[1].strip())), Time(int(end[0].strip()), int(end[1].strip()))))
    # read venues
    for col in sheet.iter_cols(2, 2):
        empty = False
        for cell in col[4:]:
            if(cell.value is not None):
                venues.add(cell.value.strip().upper())
            elif(empty):
                break
            else:
                empty = True


if __name__ == "__main__":
    main()
