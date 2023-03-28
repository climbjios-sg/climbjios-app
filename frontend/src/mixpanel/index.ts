import mixpanel from 'mixpanel-browser';
import { MIXPANEL_API_TOKEN } from 'src/config';
import { User } from 'src/@types/user';
mixpanel.init(MIXPANEL_API_TOKEN);

const mixpanel_actions = {
  identify: (userId: string) => {
    mixpanel.identify(userId);
  },
  track: (eventName: string) => {
    mixpanel.track(eventName);
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
