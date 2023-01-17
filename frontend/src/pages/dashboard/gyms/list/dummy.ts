import { clone } from "lodash";
import { GymGroupCardData } from "../../../../@types/gymGroupCard";

export const dummyGym: GymGroupCardData = {
  id: '1',
  name: 'BoulderRealm',
  permanentlyClosed: false,
  iconUrl:
    'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
  gymOutlets: [
    {
      permanentlyClosed: false,
      id: '123',
      name: 'BlocHead Bedok',
      address: 'Bedok North Road',
    },
    {
      permanentlyClosed: false,
      id: '321',
      name: 'BlocHead Aljunied',
      address: 'Aljunied Address',
    },
  ],
};

const a: GymGroupCardData[] = new Array(14).fill(null);
export const dummyGymsList = a.map((value, index) => {
  const data = clone(dummyGym);
  data.name += index.toString();
  data.id = index.toString();

  return data;
});