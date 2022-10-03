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
  name: apiUser.name,
  telegram: apiUser.telegramHandle,
  username: apiUser.username,
});

// userToApiUser converts User to ApiUser
export const userToApiUser = (user: User): ApiUser => ({
  name: user.name,
  telegramHandle: user.telegram,
  username: user.username,
});

export const apiContactToContact = (apiContact: any): Contact => {
  const returnObj: Contact = {
    id: apiContact.id,
    name: apiContact.name,
    telegram: apiContact.telegramUsername,
    username: apiContact.climbJiosUsername,
  };

  if (apiContact.meetingLatLong) {
    const latLongArr = apiContact.meetingLatLong.split(',');
    if (latLongArr.length === 2) {
      returnObj.whereWeMetLatitude = latLongArr[0];
      returnObj.whereWeMetLongitude = latLongArr[1];
    }
  }

  return returnObj;
};
