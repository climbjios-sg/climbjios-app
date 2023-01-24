import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE gym_groups RESTART IDENTITY CASCADE');

  // Inserts seed entries
  // When inserting new entries, create a new entry at the end of the list, otherwise the records referencing gym_id foreign key will get messed up
  await knex('gym_groups').insert([
    { name: 'Ark Bloc', permanentlyClosed: false },
    { name: 'b8A', permanentlyClosed: false },
    {
      name: 'BFF Climb',
      permanentlyClosed: false,
    },
    { name: 'BP/boruda', permanentlyClosed: false },
    {
      name: 'Boulder Movement',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder+',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder World',
      permanentlyClosed: false,
    },
    {
      name: 'Climb Central',
      permanentlyClosed: false,
    },
    {
      name: 'FitBloc',
      permanentlyClosed: false,
    },
    { name: 'Ground Up', permanentlyClosed: false },
    { name: 'Kinetics', permanentlyClosed: false },
    {
      name: 'Lighthouse',
      permanentlyClosed: false,
    },
    { name: 'Origin Boulder', permanentlyClosed: false },
    {
      name: 'OYEYO',
      permanentlyClosed: false,
    },
    {
      name: 'Project Send',
      permanentlyClosed: false,
    },
    { name: 'T-Hall', permanentlyClosed: false },
    {
      name: 'The Rock School',
      permanentlyClosed: false,
    },
    { name: 'Upwall', permanentlyClosed: false },
    {
      name: 'Z-Vertigo',
      permanentlyClosed: false,
    },
    {
      name: 'Camp 5',
      permanentlyClosed: false,
    },
  ]);
}
