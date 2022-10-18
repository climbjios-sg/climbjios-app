import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  if (['staging', 'production'].includes(process.env.NODE_ENV)) {
    console.log('skipping user profile seeds');
    return;
  }

  // Deletes ALL existing entries and reset primary key
  await knex.raw('TRUNCATE TABLE user_profiles RESTART IDENTITY CASCADE');

  const userIds = await knex('users')
    .select('id')
    .then((users) => users.map((u) => u.id));

  // Inserts seed entries
  await knex('userProfiles').insert([
    {
      userId: userIds[0],
      name: 'Alison',
      telegramHandle: 'alison123',
      height: 156,
      reach: -18,
      pronounId: 2,
      highestBoulderingGradeId: 1,
      highestTopRopeGradeId: 1,
      // highestLeadClimbingGradeId
      // sncsCertificationId
      profilePictureUrl:
        'https://img.freepik.com/free-photo/portrait-young-beautiful-woman-gesticulating_273609-40467.jpg',
    },
    {
      userId: userIds[1],
      name: 'Bob',
      telegramHandle: 'bob_da_best',
      // height: ,
      // reach: ,
      // pronounId: ,
      // highestBoulderingGradeId: ,
      // highestTopRopeGradeId: ,
      highestLeadClimbingGradeId: 2,
      sncsCertificationId: 2,
      profilePictureUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    },
  ]);
}
