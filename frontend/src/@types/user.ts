// ----------------------------------------------------------------------

export interface Contact extends User {
  whereWeMet?: string;
  whereWeMetLongitude?: string;
  whereWeMetLatitude?: string;
  notionUrl?: string;
}

export type User = {
  id?: string;
  name?: string;
  telegram?: string;
  username?: string;
};

export type NewUser = {
  name?: string;
  telegram?: string;
  username?: string;
};

// ApiUser represents user profile schema from backend api
export type ApiUser = {
  name?: string;
  telegramHandle?: string;
  username?: string;
};
