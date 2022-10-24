import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE gyms RESTART IDENTITY CASCADE');

  // Inserts seed entries
  await knex('gyms').insert([
    { name: 'Arête (By Upwall)', shortName: 'Arête', permanentlyClosed: false },
    { name: 'b8A', shortName: 'b8A', permanentlyClosed: false },
    { name: 'Ark Bloc', shortName: 'Ark Bloc', permanentlyClosed: false },
    {
      name: 'BFF Climb (Bukit Timah)',
      shortName: 'BFF (Bkt Timah)',
      permanentlyClosed: false,
    },
    {
      name: 'BFF Climb (Bendemeer)',
      shortName: 'BFF (Bendemeer)',
      permanentlyClosed: false,
    },
    { name: 'Boruda', shortName: 'Boruda', permanentlyClosed: false },
    {
      name: 'Boulder Movement (Bugis+)',
      shortName: 'BM (Bugis)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder Movement (OUE Downtown)',
      shortName: 'BM (OUE)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder Movement (Suntec City Mall)',
      shortName: 'BM (Suntec)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder Movement (Tai Seng)',
      shortName: 'BM (Tai Seng)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder Movement (Tekka Place)',
      shortName: 'BM (Tekka)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder+ (Aperia Mall)',
      shortName: 'B+ (Aperia)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder+ (The Chevrons)',
      shortName: 'B+ (Chevrons)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder Planet (Sembawang)',
      shortName: 'BP',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder World (SingPost)',
      shortName: 'BW (SingPost)',
      permanentlyClosed: false,
    },
    {
      name: 'Boulder World (Paragon)',
      shortName: 'BW (Paragon)',
      permanentlyClosed: false,
    },
    {
      name: 'Climb Central (Katong)',
      shortName: 'CC (Katong)',
      permanentlyClosed: false,
    },
    {
      name: 'Climb Central (Novena)',
      shortName: 'CC (Novena)',
      permanentlyClosed: false,
    },
    {
      name: 'Climb Central (Sports Hub)',
      shortName: 'CC (Sports Hub)',
      permanentlyClosed: false,
    },
    {
      name: 'Climb Central (Funan)',
      shortName: 'CC (Funan)',
      permanentlyClosed: false,
    },
    {
      name: 'FitBloc (Depot Heights)',
      shortName: 'FitBloc (DH)',
      permanentlyClosed: false,
    },
    {
      name: 'FitBloc (Kent Ridge)',
      shortName: 'FitBloc (KR)',
      permanentlyClosed: false,
    },
    { name: 'Ground Up', shortName: 'GU', permanentlyClosed: false },
    { name: 'Kinetics', shortName: 'Kinetics', permanentlyClosed: false },
    {
      name: 'Lighthouse',
      shortName: 'Lighthouse',
      permanentlyClosed: false,
    },
    { name: 'Origin Boulder', shortName: 'Origin', permanentlyClosed: false },
    {
      name: 'OYEYO',
      shortName: 'OYEYO',
      permanentlyClosed: false,
    },
    {
      name: 'Project Send',
      shortName: 'Project Send',
      permanentlyClosed: false,
    },
    { name: 'T-Hall', shortName: 'T-Hall', permanentlyClosed: false },
    {
      name: 'The Rock School (Our Tampines Hub)',
      shortName: 'TRS',
      permanentlyClosed: false,
    },
    { name: 'Upwall', shortName: 'Upwall', permanentlyClosed: false },
    {
      name: 'Z-Vertigo',
      shortName: 'Z-Vertigo',
      permanentlyClosed: false,
    },
  ]);
}
