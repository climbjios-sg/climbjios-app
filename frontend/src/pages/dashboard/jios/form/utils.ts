import { Jio, RequestJio } from '../../../../@types/jio';

import { getDateTimeString } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

export const JIOTYPE_OPTION = [
  { label: 'Buy', value: 'buyer' },
  { label: 'Sell', value: 'seller' },
  { label: 'None, just looking for friends to climb with', value: 'other' },
];
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

export type JioSearchFormValues = Pick<
  JioCreateEditFormValues,
  'gymId' | 'date' | 'startTiming' | 'endTiming' | 'type'
>;

export const jioFormValuesToRequestJio = ({
  type,
  numPasses,
  price,
  gymId,
  openToClimbTogether,
  optionalNote,
  date,
  startTiming,
  endTiming,
}: JioCreateEditFormValues): RequestJio => ({
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
