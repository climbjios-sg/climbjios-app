import { differenceInDays, format } from 'date-fns';

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

// Set time to 0 for a date object
export function zeroTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getDateTimeString(date: Date, time: string): string {
  return setDateTime(date, time).toISOString();
}

export function formatDate(date: Date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

// isAutofilledDateTime returns true
// iff endDateTime - startDateTime > 0 days
// When user doesn't fill up the date for the Jio, backend will auto set
// endDateTime to be 2 months after current time
// We use this behaviour to detect if the datetime is autofilled by backend
export function isJioAutofilledDateTime({
  startDateTime,
  endDateTime,
}: {
  startDateTime: Date;
  endDateTime: Date;
}) {
  // endDateTime - startDateTime > 0 days
  // Note: Larger date must be on the left for differenceInDays
  return differenceInDays(endDateTime, startDateTime) > 0;
}

// formatStartEndDate takes a start and end date ISO string, and converts it into a string display in UI
// Note: Browser automatically display local timezone based on utc date string
// e.g. Wed, 12 Dec, 9am-9pm
export function formatStartEndDate(startISOString: string, endISOString: string): string {
  const fDate = (date: Date) => format(date, 'E, d MMM'); // e.g. Wed, 12 Dec
  const fTime = (date: Date) => format(date, 'h:mmaaa'); // e.g. 9:59pm

  const startDateTime = new Date(startISOString);
  const endDateTime = new Date(endISOString);

  if (isJioAutofilledDateTime({ startDateTime, endDateTime })) {
    return `Anytime until ${fDate(endDateTime)}`;
  }

  return `${fDate(startDateTime)}, ${fTime(startDateTime)} - ${fTime(endDateTime)}`;
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

// e.g.
// date = Date(12 Dec), startTime = 09:00, endTime = 21:00
// returns 12 Dec, 09:00-21:00
export function formatPrettyDate(date: Date, startTime: string, endTime: string): string {
  return `${format(date, 'd MMM')}, ${startTime}-${endTime}`;
}

// dateToTimeString returns time of date in 24hr format
// e.g.
// date = Date(12 Dec, 09:00)
// returns 09:00
// e.g.
// date = Date(12 Dec, 23:00)
// returns 23:00
export function dateToTimeString(date: Date): string {
  return format(date, 'HH:mm');
}
