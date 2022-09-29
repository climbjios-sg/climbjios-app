import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('gyms').del();
  await knex.raw('TRUNCATE TABLE gyms RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('gyms').insert([
    { name: 'Arête (By Upwall)', permanentlyClosed: false },
    { name: 'Ark Bloc', permanentlyClosed: false },
    { name: 'b8A', permanentlyClosed: false },
    { name: 'BFF Climb (Bukit Timah)', permanentlyClosed: false },
    { name: 'BFF Climb (Bendemeer)', permanentlyClosed: false },
    { name: 'Boruda', permanentlyClosed: false },
    { name: 'Boulder Movement (Bugis+)', permanentlyClosed: false },
    { name: 'Boulder Movement (OUE Downtown)', permanentlyClosed: false },
    { name: 'Boulder Movement (Suntec City Mall)', permanentlyClosed: false },
    { name: 'Boulder Movement (Tai Seng)', permanentlyClosed: false },
    { name: 'Boulder Movement (Tekka Place)', permanentlyClosed: false },
    { name: 'Boulder+ (Aperia Mall)', permanentlyClosed: false },
    { name: 'Boulder+ (The Chevrons)', permanentlyClosed: false },
    { name: 'Boulder Planet (Sembawang)', permanentlyClosed: false },
    { name: 'Boulder World (SingPost)', permanentlyClosed: false },
    { name: 'Boulder World (Paragon)', permanentlyClosed: false },
    { name: 'Climb Central (Katong)', permanentlyClosed: false },
    { name: 'Climb Central (Novena)', permanentlyClosed: false },
    { name: 'Climb Central (Sports Hub)', permanentlyClosed: false },
    { name: 'Climb Central (Funan)', permanentlyClosed: false },
    { name: 'Fit Bloc (Depot Heights)', permanentlyClosed: false },
    { name: 'Fit Bloc (Kent Ridge)', permanentlyClosed: false },
    { name: 'Ground Up Climbing', permanentlyClosed: false },
    { name: 'Kinetics', permanentlyClosed: false },
    { name: 'Lighthouse Climbing', permanentlyClosed: false },
    { name: 'Origin Boulder', permanentlyClosed: false },
    { name: 'OYEYO Bouldering Home', permanentlyClosed: false },
    { name: 'Project Send', permanentlyClosed: false },
    { name: 'T-Hall', permanentlyClosed: false },
    { name: 'The Rock School (Our Tampines Hub)', permanentlyClosed: false },
    { name: 'Up Wall Climbing', permanentlyClosed: false },
    { name: 'Z-Vertigo Boulder Gym', permanentlyClosed: false },
  ]);
}
