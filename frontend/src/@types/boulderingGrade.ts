import { OptionResponse } from '.';

export interface BoulderingGrade extends OptionResponse {}

export type BoulderingGradeRequest = Partial<BoulderingGrade>;
export type BoulderingGradeResponse = BoulderingGrade;
