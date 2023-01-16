import { OptionResponse } from '.';

export interface GymData extends OptionResponse {
  readonly name: string;
  readonly shortName: string;
  readonly permanentlyClosed: boolean;
  readonly gymGroupId: number;
  readonly iconURL: string;
  readonly address: string;
  readonly area: string;
  readonly passSharing: string;
  readonly boulder: boolean;
  readonly autoBelay: boolean;
  readonly topRope: boolean;
  readonly lead: boolean;
  readonly mondayOpening: string;
  readonly mondayClosing: string;
  readonly tuedayOpening: string;
  readonly tuedayClosing: string;
  readonly wednesdayOpening: string;
  readonly wednesdayClosing: string;
  readonly thursdayOpening: string;
  readonly thursdayClosing: string;
  readonly fridayOpening: string;
  readonly fridayClosing: string;
  readonly saturdayOpening: string;
  readonly saturdayClosing: string;
  readonly sundayOpening: string;
  readonly sundayClosing: string;
}

export type GymDataRequest = Partial<GymData>;

export type GymDataResponse = GymData;
