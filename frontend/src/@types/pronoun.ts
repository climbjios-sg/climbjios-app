export interface Pronoun {
  id: number;
  name: string;
}

export type PronounRequest = Partial<Pronoun>;
export type PronounResponse = Pronoun;
