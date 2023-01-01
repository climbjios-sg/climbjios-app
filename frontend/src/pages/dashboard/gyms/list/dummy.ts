import { clone } from "lodash";
import { GymCardData } from "./types/gymCard";

export const dummyGym: GymCardData = {
  id: '1',
  name: 'BoulderRealm',
  logoUrl:
    'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
  gymOutlets: [
    {
      isClosed: false,
      gymId: '123',
      name: 'BlocHead Bedok',
      address: 'Bedok North Road',
    },
    {
      isClosed: false,
      gymId: '321',
      name: 'BlocHead Aljunied',
      address: 'Aljunied Address',
    },
  ],
};

const a: GymCardData[] = new Array(14).fill(null);
export const dummyGymsList = a.map((value, index) => {
  const data = clone(dummyGym);
  data.name += index.toString();
  data.id = index.toString();

  return data;
});

// const oldDummyData = [
//   {
//     id: 1,
//     name: 'BlocHead',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderRealm',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderUniverse',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderCosmos',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderCosmos',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderCosmos',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderCosmos',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderCosmos',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderCosmos',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: 'BoulderCosmos',
//     logoUrl:
//       'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png',
//     gymOutlets: [
//       {
//         isClosed: false,
//         gymId: 123,
//         name: 'BlocHead Bedok',
//         address: 'Bedok North Road',
//       },
//       {
//         isClosed: false,
//         gymId: 321,
//         name: 'BlocHead Aljunied',
//         address: 'Aljunied Address',
//       },
//     ],
//   },
// ];
