import { PostType } from '../../utils/types';
export default class PatchPostDto {
    type: PostType;
    numPasses: number;
    price: number;
    gymId: number;
    startDateTime: Date;
    endDateTime: Date;
    openToClimbTogether: boolean;
    optionalNote: string;
    isClosed: boolean;
}
