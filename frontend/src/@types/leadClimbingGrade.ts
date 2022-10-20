export interface LeadClimbingGrade {
  id: number;
  name: string;
}

export type LeadClimbingGradeRequest = Partial<LeadClimbingGrade>;
export type LeadClimbingGradeResponse = LeadClimbingGrade;
