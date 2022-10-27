import { OptionResponse } from '.';

export interface SncsCertification extends OptionResponse {}

export type SncsCertificationRequest = Partial<SncsCertification>;
export type SncsCertificationResponse = SncsCertification;
