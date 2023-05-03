import mixpanel from 'mixpanel-browser';
import { MIXPANEL_API_TOKEN } from 'src/config';
import { User } from 'src/@types/user';
import {
  REGISTRATION_CLIMBING_CERT,
  REGISTRATION_CLIMBING_GRADE,
  REGISTRATION_GYMS,
  REGISTRATION_PROFILE_PHOTO,
  REGISTRATION_USERNAME,
  REGISTRATION_USER_DETAILS,
} from './labels';
mixpanel.init(MIXPANEL_API_TOKEN);

const mixpanel_actions = {
  identify: (userId: string) => {
    mixpanel.identify(userId);
  },
  track: (eventName: string) => {
    mixpanel.track(eventName);
  },
  trackRegistration: (step: number) => {
    let eventName = '';
    switch (step) {
      case 1:
        eventName = REGISTRATION_USERNAME;
        break;
      case 2:
        eventName = REGISTRATION_USER_DETAILS;
        break;
      case 3:
        eventName = REGISTRATION_GYMS;
        break;
      case 4:
        eventName = REGISTRATION_CLIMBING_GRADE;
        break;
      case 5:
        eventName = REGISTRATION_CLIMBING_CERT;
        break;
      case 6:
        eventName = REGISTRATION_PROFILE_PHOTO;
    }
    if (eventName.length > 0) mixpanel.track(eventName);
  },
  people: {
    set: (user: Partial<User>) => {
      mixpanel.people.set({
        'User ID': user.userId,
        Bio: user.bio,
        Name: user.name,
        'Telegram Handle': user.telegramHandle,
        Height: user.height,
        Reach: user.reach,
        'Created At': user.createdAt,
        'Updated At': user.updatedAt,
        'SNCS Certification': user.sncsCertification?.name,
        Pronoun: user.pronoun,
        'Highest Bouldering Grade': user.highestBoulderingGrade?.name,
        'Highest Top Rope Grade': user.highestTopRopeGrade?.name,
        'Highest Lead Climbing Grade': user.highestLeadClimbingGrade?.name,
        'Favourite Gyms': user.favouriteGyms?.map((gymObject) => gymObject.name),
      });
    },
  },
};

export default mixpanel_actions;
