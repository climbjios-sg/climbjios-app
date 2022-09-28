// ----------------------------------------------------------------------

export interface Contact extends User {
  whereWeMet?: string;
  whereWeMetLongitude?: string;
  whereWeMetLatitude?: string;
  notionUrl?: string;
}

export type User = {
  id?: string;
  avatarUrl?: string;
  email?: string;
  name?: string;
  company?: string;
  role?: string;
  phoneNumber?: string;
  linkedin?: string;
  telegram?: string;
  notionDatabaseId?: string;
};

// ApiUser represents user profile schema from backend api
export type ApiUser = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  linkedInUrl?: string;
  telegramUsername?: string;
  instagramUsername?: string;
  crmDatabaseId?: string;
};

