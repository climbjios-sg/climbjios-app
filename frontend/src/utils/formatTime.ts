// ----------------------------------------------------------------------

import { addHours, format } from 'date-fns';

export function utcDateToLocaleDate(date: Date): Date {
  const minutesBeforeUtc = new Date().getTimezoneOffset(); // Difference in minutes UTC & climber's timezone, e.g. For GMT+8, it's -480
  const minutesAfterUtc = -minutesBeforeUtc;
  return addHours(date, minutesAfterUtc);
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
  return displayDateTimeString
}