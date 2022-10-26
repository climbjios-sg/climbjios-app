export interface BoulderingGrade {
  id: number;
  name: string;
}

export type BoulderingGradeRequest = Partial<BoulderingGrade>;
export type BoulderingGradeResponse = BoulderingGrade;
