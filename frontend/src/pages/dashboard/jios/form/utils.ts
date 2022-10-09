import { JioFormValues } from './JiosForm';
import { RequestJio } from '../../../../@types/jio';
import { getDateTimeString } from '../../../../utils/formatTime';


export const jioFormValuesToRequestJio = ({
  type, numPasses, price, gymId, openToClimbTogether, optionalNote, date, startTiming, endTiming,
}: JioFormValues): RequestJio => ({
  type,
  numPasses,
  price,
  gymId,
  openToClimbTogether,
  optionalNote,
  startDateTime: getDateTimeString(date, startTiming),
  endDateTime: getDateTimeString(date, endTiming),
});
