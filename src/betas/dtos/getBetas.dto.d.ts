export type GetBetasQuery = GetBetasDto & {
    creatorId?: string;
};
export default class GetBetasDto {
    gymId: number;
    gymGradeId: number;
    wallId: number;
    colorId: number;
    limit: number;
    page: number;
    pageSize: number;
}
