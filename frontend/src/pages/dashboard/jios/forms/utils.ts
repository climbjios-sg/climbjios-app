import { isAfter, isEqual } from 'date-fns';
import { Jio, JioRequest } from '../../../../@types/jio';
import { getDateTimeString, zeroTime } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

export interface JioCreateEditFormValues {
  type: Jio['type'];
  numPasses: Jio['numPasses'];
  price: Jio['price'];
  gymId: Jio['gymId'];
  openToClimbTogether: Jio['openToClimbTogether'];
  optionalNote: Jio['optionalNote'];
  date: Date | null;
  // Time in 09:00 format
  startTiming?: string;
  // Time in 09:00 format
  endTiming?: string;
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
}: JioCreateEditFormValues): JioRequest => {
  const returnObj: JioRequest = {
    type,
    numPasses,
    price,
    gymId,
    openToClimbTogether,
    optionalNote,
  };

  if (date) {
    returnObj.startDateTime = getDateTimeString(date, startTiming);
    returnObj.endDateTime = getDateTimeString(date, endTiming);
  }

  return returnObj;
};

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
