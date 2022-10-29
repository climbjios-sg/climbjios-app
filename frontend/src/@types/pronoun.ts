import { OptionResponse } from '.';

export enum PronounName {
  HeHim = 'He/Him',
  SheHer = 'She/Her',
  TheyThem = 'They/Them',
  PreferNotToSay = 'Prefer not to say',
}

export interface Pronoun extends OptionResponse<PronounName> {}

export type PronounRequest = Partial<Pronoun>;
export type PronounResponse = Pronoun;
