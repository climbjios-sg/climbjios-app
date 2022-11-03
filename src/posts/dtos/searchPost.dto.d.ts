import { PostType } from '../../utils/types';
export default class SearchPostDto {
    type: PostType;
    numPasses: number;
    price: number;
    gymId: number;
    startDateTime: Date;
    endDateTime: Date;
}
