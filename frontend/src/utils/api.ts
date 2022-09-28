import { ApiUser, Contact, User } from '../@types/user';
// BE_API contains api endpoints we use to query our host backend
export const BE_API = {
  auth: {
    notion: '/api/Auth/signin-notion',
    linkedin: '/api/Auth/signin-linkedin',
  },
  profile: '/api/Profile',
  contacts: '/api/Contacts',
};

// apiUserToUser converts User object fetched from be api to user object used in fe
export const apiUserToUser = (apiUser: ApiUser): User => ({
  avatarUrl: apiUser.avatarUrl,
  email: apiUser.email,
  name: apiUser.name,
  company: apiUser.company,
  role: apiUser.role,
  phoneNumber: apiUser.phoneNumber,
  linkedin: apiUser.linkedInUrl,
  telegram: apiUser.telegramUsername,
  notionDatabaseId: apiUser.crmDatabaseId,
});

// userToApiUser converts User to ApiUser
export const userToApiUser = (user: User): ApiUser => ({
  avatarUrl: user.avatarUrl,
  email: user.email,
  name: user.name,
  company: user.company,
  role: user.role,
  phoneNumber: user.phoneNumber,
  linkedInUrl: user.linkedin,
  telegramUsername: user.telegram,
  crmDatabaseId: user.notionDatabaseId,
});

export const apiContactToContact = (apiContact: any): Contact => {
  const returnObj: Contact = {
    id: apiContact.id,
    avatarUrl: apiContact.linkedInAvatarImage,
    email: apiContact.email,
    name: apiContact.name,
    company: apiContact.company,
    role: apiContact.role,
    phoneNumber: apiContact.phoneNumber,
    linkedin: apiContact.linkedInUrl,
    telegram: apiContact.telegramUsername,
    whereWeMet: apiContact.meetingLocation,
    notionUrl: apiContact.crmUrl,
  }

  if (apiContact.meetingLatLong) {
    const latLongArr = apiContact.meetingLatLong.split(',');
    if (latLongArr.length === 2) {
      returnObj.whereWeMetLatitude = latLongArr[0]
      returnObj.whereWeMetLongitude = latLongArr[1]
    }
  }
  
  return returnObj;
};
