from openpyxl import load_workbook
from datetime import time as Time


class timeSlot():
    def __init__(self, startTime, endTime):
        self.startTime = startTime
        self.endTime = endTime


def main():
    venues = set()
    teachers = set()
    timeslots = set()
    courses = set()
    sections = set()
    tt = load_workbook('timetable.xlsx')
    sheet = tt.worksheets[0]
    for cell in sheet[4][2:]:
        if(cell.value == None):
            break
        else:
            time = cell.value.split(' - ')
            start = time[0].split(':')
            end = time[1].split(':')
            timeslots.add(timeSlot(Time(int(start[0].strip()), int(
                start[1].strip())), Time(int(end[0].strip()), int(end[1].strip()))))
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
