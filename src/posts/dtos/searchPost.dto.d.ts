import { PostType } from '../../utils/types';
export default class SearchPostDto {
    type: PostType;
    gymId: number;
    startDateTime: Date;
    endDateTime: Date;
    numPasses: number;
    price: number;
}
