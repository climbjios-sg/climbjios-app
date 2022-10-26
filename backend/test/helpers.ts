export const getDateFromNow = (
  daysIntoTheFuture: number,
  hoursIntoTheFuture: number,
) => {
  let date = new Date();
  date.setDate(new Date().getDate() + daysIntoTheFuture);
  date.setTime(date.getTime() + hoursIntoTheFuture * 60 * 60 * 1000);
  return date;
};
