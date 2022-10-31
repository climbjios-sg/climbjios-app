export const getDateFromNow = (
  daysIntoTheFuture: number,
  hoursIntoTheFuture: number,
  minutesIntoTheFuture: number,
) => {
  let date = new Date();
  date.setDate(new Date().getDate() + daysIntoTheFuture);
  date.setTime(
    date.getTime() +
      hoursIntoTheFuture * 60 * 60 * 1000 +
      minutesIntoTheFuture * 1000 * 60,
  );
  return date;
};
