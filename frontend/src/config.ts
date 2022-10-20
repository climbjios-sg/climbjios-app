import XRegExp from 'xregexp';
import { AuthProviderType } from './@types/auth';

// API

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API;

export const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// LAYOUT

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SUPPORT EMAIL
export const SUPPORT_EMAIL = 'rizhaow@gmail.com';
export const SUPPORT_TELEGRAM = 'https://t.me/rizhaow';

// NEW USER SIGNUP
// Form validation

// Name
export const MIN_NAME_LEN = 3;
export const MAX_NAME_LEN = 30;
/*
Note: Name can only consist of uppercase & lowercase alphabets, 
characters from other languages (e.g. Chinese, accented Latin alphabets), blank spaces
as well as special characters dot(.), dash(-) and apostrophe('). No other special characters
allowed.
Name must also be between 3 to 30 characters. Update this regex when length limitations change
*/
export const REGEX_NAME = XRegExp(/^[\p{L}\p{M}\p{Zs}.'-]{3,30}$/u);

// Telegram Handle
export const REGEX_TELEGRAM =
  /^(?=.{5,32}$)(?!.*__)(?!^(telegram|admin|support))[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z0-9]$/;

// Username
export const MIN_USERNAME_LEN = 3;
export const MAX_USERNAME_LEN = 30;

/*
Note: username can only consist of uppercase & lowercase alphabets and numbers, 
and must be between 3 to 30 characters. Update this regex when length limitations change
*/
export const REGEX_USERNAME = /^([A-Za-z0-9]){3,30}$/;

export const MAX_UPLOAD_SIZE = 3145728;

// Error messages
export const NAME_LEN_ERROR = `Name must be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} characters long`;
export const NAME_REGEX_ERROR = `Name cannot contain numbers and special characters other than dot(.), dash(-), apostrophe(') and spaces( )`;
export const TELEGRAM_REGEX_ERROR = `Invalid Telegram handle. Please check your entry and try again`;
export const USERNAME_LEN_ERROR = `Username must be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} characters long`;
export const USERNAME_REGEX_ERROR = `Username can only contain alphabets and numbers. It cannot contain blank spaces`;

export const DEFAULT_AUTH_PROVIDER: AuthProviderType = 'jwt';

export enum CacheKey {
  User = 'User',
  Gyms = 'Gyms',
  Pronouns = 'Pronouns',
  LeadClimbingGrades = 'LeadClimbingGrades',
  TopRopeGrades = 'TopRopeGrades',
  BoulderingGrades = 'BoulderingGrades',
  SncsCertifications = 'SncsCertifications',
}
