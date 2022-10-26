export interface TopRopeGrade {
  id: number;
  name: string;
}

export type TopRopeGradeRequest = Partial<TopRopeGrade>;
export type TopRopeGradeResponse = TopRopeGrade;
