// import { OptionResponse } from '.';

export interface GymData {
  readonly id: number;
  readonly name: string;
  readonly shortName: string;
  readonly permanentlyClosed: boolean;
  readonly gymGroupId: number;
  readonly iconUrl?: string;
  readonly bannerUrl?: string;
  readonly address: string;
  readonly area: string;
  readonly passSharing: string;
  readonly boulder: boolean;
  readonly autoBelay: boolean;
  readonly topRope: boolean;
  readonly lead: boolean;
  readonly socialUrl: string;
  readonly website: string;
  readonly openNow: string;
  readonly operatingHours: string[];
}

export type GymPreviewData = Pick<GymData, 'id' | 'name' | 'permanentlyClosed' | 'address' | 'area' | 'iconUrl'>;
