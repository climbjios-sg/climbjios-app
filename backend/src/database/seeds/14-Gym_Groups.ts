import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE gym_groups RESTART IDENTITY CASCADE');

  // Inserts seed entries
  // When inserting new entries, create a new entry at the end of the list, otherwise the records referencing gym_id foreign key will get messed up
  await knex('gym_groups').insert([
    { name: 'Ark Bloc', id: 'Ark Bloc', permanentlyClosed: false },
    { id: 'b8A', name: 'b8A', permanentlyClosed: false },
    {
      id: 'BFF',
      name: 'BFF Climb',
      permanentlyClosed: false,
    },
    { id: 'BP/boruda', name: 'BP/boruda', permanentlyClosed: false },
    {
      id: 'BM',
      name: 'Boulder Movement',
      permanentlyClosed: false,
    },
    {
      id: 'B+',
      name: 'Boulder+',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder World',
      id: 'BW',
      permanentlyClosed: false,
    },
    {
      id: 'CC',
      name: 'Climb Central',
      permanentlyClosed: false,
    },
    {
      id: 'FitBloc',
      name: 'FitBloc',
      permanentlyClosed: false,
    },
    { id: 'GU', name: 'Ground Up', permanentlyClosed: false },
    { id: 'Kinetics', name: 'Kinetics', permanentlyClosed: false },
    {
      id: 'Lighthouse',
      name: 'Lighthouse',
      permanentlyClosed: false,
    },
    { id: 'Origin', name: 'Origin Boulder', permanentlyClosed: false },
    {
      id: 'OYEYO',
      name: 'OYEYO',
      permanentlyClosed: false,
    },
    {
      id: 'Project Send',
      name: 'Project Send',
      permanentlyClosed: false,
    },
    { id: 'T-Hall', name: 'T-Hall', permanentlyClosed: false },
    {
      id: 'TRS',
      name: 'The Rock School',
      permanentlyClosed: false,
    },
    { id: 'Upwall', name: 'Upwall', permanentlyClosed: false },
    {
      id: 'Z-Vertigo',
      name: 'Z-Vertigo',
      permanentlyClosed: false,
    },
  ]);
}
