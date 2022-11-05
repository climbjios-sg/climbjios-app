import * as Yup from 'yup';
import { isAfter, isEqual } from 'date-fns';
import { Jio, JioRequest } from '../../../../@types/jio';
import { dateToTimeString, getDateTimeString, zeroTime } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

export interface JioCreateEditFormValues {
  type: Jio['type'];
  numPasses: Jio['numPasses'];
  price: Jio['price'];
  gymId: Jio['gymId'];
  openToClimbTogether: Jio['openToClimbTogether'];
  optionalNote: Jio['optionalNote'];
  date: Date;
  // Time in 09:00 format
  startTiming: string;
  // Time in 09:00 format
  endTiming: string;
}

export type JioSearchFormValues = Partial<
  Pick<JioCreateEditFormValues, 'gymId' | 'date' | 'startTiming' | 'endTiming' | 'type'>
>;

export const jioFormValuesToJioRequest = ({
  type,
  numPasses,
  price,
  gymId,
  openToClimbTogether,
  optionalNote,
  date,
  startTiming,
  endTiming,
}: JioCreateEditFormValues): JioRequest => ({
  type,
  numPasses,
  price,
  gymId,
  openToClimbTogether,
  optionalNote,
  startDateTime: getDateTimeString(date, startTiming),
  endDateTime: getDateTimeString(date, endTiming),
});

// formatJioFormValues sets default values when type === 'other'
// type === 'other' means climber not buying/selling passes)
export const formatJioFormValues = (data: JioCreateEditFormValues): JioCreateEditFormValues => {
  if (data.type !== 'other') {
    return { ...data };
  }

  return {
    ...data,
    numPasses: 0,
    price: 0,
    openToClimbTogether: true,
  };
};

export const currentDateTimeZeroed = zeroTime(new Date());

// ------------- Yup validation objects -------------

export const yupDateTodayOrAfter = {
  message: 'Date must be today or after.',
  test: (value: Date | undefined) =>
    Boolean(
      value &&
        (isEqual(zeroTime(value), currentDateTimeZeroed) ||
          isAfter(zeroTime(value), currentDateTimeZeroed))
    ),
};

// Validates date, startTiming & endTiming
export const yupStartEndDateTimingObject = {
  date: Yup.date().required('Date is required.').test(yupDateTodayOrAfter),
  startTiming: Yup.string()
    .required('Start time is required.')
    .when('endTiming', (endTiming: string, schema) =>
      schema.test({
        name: 'startTiming',
        message: 'Start time must be before end time.',
        test: (value: string | undefined) => Boolean(value && value < endTiming),
      })
    )
    // If date is today, then start time must be after current time
    .when('date', {
      is: (value: Date) => Boolean(value && isEqual(zeroTime(value), currentDateTimeZeroed)),
      then: (schema) =>
        schema.test({
          name: 'startTiming',
          message: 'Start time must be after current time.',
          test: (value: string | undefined) =>
            Boolean(value && value > dateToTimeString(new Date())),
        }),
    }),
  endTiming: Yup.string().required('End time is required.'),
};
