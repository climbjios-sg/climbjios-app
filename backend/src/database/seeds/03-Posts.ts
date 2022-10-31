import { Knex } from 'knex';
import { PostStatus, PostType } from '../../utils/types';
import { UserModel } from '../models/user.model';

export const MOCK_POST_1_UUID = '1d1bd429-291e-449c-80fd-54cdb236a075';
export const MOCK_POST_2_UUID = '8a3b6b45-b956-42e7-bd16-1b6ac9891a53';
export async function seed(knex: Knex): Promise<void> {
  if (['staging', 'production'].includes(process.env.NODE_ENV)) {
    console.log('skipping post seeds');
    return;
  }

  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE posts RESTART IDENTITY CASCADE');

  const [alison, bob] = await knex.select<UserModel[]>().from('users');

  // Inserts seed entries
  await knex('posts').insert([
    // Today (buying)
    {
      id: MOCK_POST_1_UUID,
      creatorId: alison.id,
      type: PostType.BUYER,
      numPasses: 5,
      price: 15.5,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setHours(23, 59, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Hello! Nice to meet you!',
      status: PostStatus.OPEN,
    },
    // Today (selling)
    {
      id: MOCK_POST_2_UUID,
      creatorId: bob.id,
      type: PostType.SELLER,
      numPasses: 8,
      price: 18,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setHours(23, 59, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: "I'm selling tix!",
      status: PostStatus.OPEN,
    },
    // Today (other)
    {
      creatorId: bob.id,
      type: PostType.OTHER,
      numPasses: 0,
      price: 0,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setHours(23, 59, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'I love climbing! Open jio!',
      status: PostStatus.OPEN,
    },
    // Yesterday (buying)
    {
      creatorId: alison.id,
      type: PostType.BUYER,
      numPasses: 5,
      price: 15.5,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() - 1);
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() - 1);
        d.setHours(15, 15, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Hello! Nice to meet you!',
      status: PostStatus.CLOSED,
    },
    // Yesterday (selling)
    {
      creatorId: bob.id,
      type: PostType.SELLER,
      numPasses: 5,
      price: 12.5,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() - 1);
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() - 1);
        d.setHours(10, 0, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Im selling!',
      status: PostStatus.EXPIRED,
    },
    // Yesterday (other)
    {
      creatorId: bob.id,
      type: PostType.OTHER,
      numPasses: 0,
      price: 0,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() - 1);
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() - 1);
        d.setHours(10, 0, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Looking for climbing mates!',
      status: PostStatus.OPEN,
    },
    // Next week (buying)
    {
      creatorId: alison.id,
      type: PostType.BUYER,
      numPasses: 5,
      price: 20,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() + 7);
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() + 7);
        d.setHours(15, 15, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Hello! Looking for tix next week',
      status: PostStatus.OPEN,
    },
    // Next week (selling)
    {
      creatorId: bob.id,
      type: PostType.SELLER,
      numPasses: 8,
      price: 21,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() + 7);
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() + 7);
        d.setHours(10, 15, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Hello! Selling these tix next week',
      status: PostStatus.OPEN,
    },
    // Next week (other)
    {
      creatorId: bob.id,
      type: PostType.OTHER,
      numPasses: 0,
      price: 0,
      gymId: 1,
      startDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() + 7);
        d.setHours(8, 15, 0, 0);
        return d;
      })(),
      endDateTime: (() => {
        const d = new Date();
        d.setDate(new Date().getDate() + 7);
        d.setHours(10, 15, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Climb wif me!',
      status: PostStatus.OPEN,
    },
  ]);
}
