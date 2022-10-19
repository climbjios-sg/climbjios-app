import { Knex } from 'knex';
import { PostType } from '../../utils/types';
import { UserModel } from '../models/user.model';

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
        d.setHours(22, 15, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'Hello! Nice to meet you!',
      isClosed: false,
    },
    // Today (selling)
    {
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
        d.setHours(14, 30, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: "I'm selling tix!",
      isClosed: false,
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
        d.setHours(14, 30, 0, 0);
        return d;
      })(),
      openToClimbTogether: true,
      optionalNote: 'I love climbing! Open jio!',
      isClosed: false,
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
      isClosed: false,
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
      isClosed: false,
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
      isClosed: false,
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
      isClosed: false,
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
      isClosed: false,
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
      isClosed: false,
    },
  ]);
}
