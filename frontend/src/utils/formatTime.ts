// ----------------------------------------------------------------------

import { addHours, format } from 'date-fns';

export function utcDateToLocaleDate(date: Date): Date {
  const minutesBeforeUtc = new Date().getTimezoneOffset(); // Difference in minutes UTC & climber's timezone, e.g. For GMT+8, it's -480
  const minutesAfterUtc = -minutesBeforeUtc;
  return addHours(date, minutesAfterUtc);
}

// getLocaleDateTime returns a datetime object with the date set to the time specified
// e.g. date = 13/10/2022, time = 12:00
// returns 13/10/2022 12:00
export function setDateTime(date: Date, time: string): Date {
  const newDate = new Date(date);
  const timeArr = time.split(':');
  const hour = timeArr[0];
  const minute = timeArr[1];
  newDate.setHours(+hour);
  newDate.setMinutes(+minute);
  return newDate;
}

// formatStartEndDate takes a start and end date ISO string, and converts it into a string display in UI
// e.g. 12 Dec, Wed 9am-9pm
export function formatStartEndDate(startISOString: string, endISOString: string): string {
  const startDateTimeObject = utcDateToLocaleDate(new Date(startISOString));
  const endDateTimeObject = utcDateToLocaleDate(new Date(endISOString));
  const dateString = format(startDateTimeObject, 'E, d MMM'); // e.g. Wed,12 Dec
  const startTimeString = format(startDateTimeObject, 'haaa'); // e.g. 9am
  const endTimeString = format(endDateTimeObject, 'haaa'); // e.g. 9pm
  const displayDateTimeString = `${dateString}, ${startTimeString} - ${endTimeString}`;
  return displayDateTimeString;
}

export function isStartTimeEarlier(startDate: Date, endDate: Date): boolean {
  const startTimeHours = startDate.getHours();
  const endTimeHours = endDate.getHours();
  const startTimeMinutes = startDate.getMinutes();
  const endTimeMinutes = endDate.getMinutes();
  return (
    startTimeHours < endTimeHours ||
    (startTimeHours === endTimeHours && startTimeMinutes < endTimeMinutes)
  );
}
