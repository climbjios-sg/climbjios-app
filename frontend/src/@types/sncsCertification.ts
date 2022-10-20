export interface SncsCertification {
  id: number;
  name: string;
}

export type SncsCertificationRequest = Partial<SncsCertification>;
export type SncsCertificationResponse = SncsCertification;
