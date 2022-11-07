import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Add grades 13-15 to BFF Bkt Timah
  await knex('gymGrades')
    .update({ gymId: 4, name: 'Wildcard', order: 160 })
    .where({ gymId: 4, name: 'Wildcard', order: 13 });
  await knex('gymGrades').insert([
    { gymId: 4, name: '13', order: 130 },
    { gymId: 4, name: '14', order: 140 },
    { gymId: 4, name: '15', order: 150 },
    { gymId: 4, name: 'Wildcard', order: 160 },
  ]);

  // Add grades 13-15 to BFF Bendemeer
  await knex('gymGrades')
    .update({ gymId: 5, name: 'Wildcard', order: 160 })
    .where({ gymId: 5, name: 'Wildcard', order: 13 });
  await knex('gymGrades').insert([
    { gymId: 5, name: '13', order: 130 },
    { gymId: 5, name: '14', order: 140 },
    { gymId: 5, name: '15', order: 150 },
    { gymId: 5, name: 'Wildcard', order: 160 },
  ]);

  // Add grades to Boulder Planet (Tai Seng)
  await knex('gymGrades').insert([
    { gymId: 33, name: '1', order: 10 },
    { gymId: 33, name: '2', order: 20 },
    { gymId: 33, name: '3', order: 30 },
    { gymId: 33, name: '4', order: 40 },
    { gymId: 33, name: '5', order: 50 },
    { gymId: 33, name: '6', order: 60 },
    { gymId: 33, name: '7', order: 70 },
    { gymId: 33, name: '8', order: 80 },
    { gymId: 33, name: '9', order: 90 },
    { gymId: 33, name: '10', order: 100 },
    { gymId: 33, name: '11', order: 110 },
    { gymId: 33, name: '12', order: 120 },
    { gymId: 33, name: 'Wildcard', order: 130 },
  ]);
}

export async function down(knex: Knex): Promise<void> {
  // Add grades 13-15 to BFF Bkt Timah
  await knex('gymGrades')
    .update({ gymId: 4, name: 'Wildcard', order: 13 })
    .where({ gymId: 4, name: 'Wildcard', order: 160 });

  await knex('gymGrades').delete().where({ gymId: 4, name: '13', order: 130 });
  await knex('gymGrades').delete().where({ gymId: 4, name: '14', order: 140 });
  await knex('gymGrades').delete().where({ gymId: 4, name: '15', order: 150 });
  await knex('gymGrades')
    .delete()
    .where({ gymId: 4, name: 'Wildcard', order: 160 });

  // Add grades 13-15 to BFF Bendemeer
  await knex('gymGrades')
    .update({ gymId: 5, name: 'Wildcard', order: 13 })
    .where({ gymId: 5, name: 'Wildcard', order: 160 });

  await knex('gymGrades').delete().where({ gymId: 5, name: '13', order: 130 });
  await knex('gymGrades').delete().where({ gymId: 5, name: '14', order: 140 });
  await knex('gymGrades').delete().where({ gymId: 5, name: '15', order: 150 });
  await knex('gymGrades')
    .delete()
    .where({ gymId: 5, name: 'Wildcard', order: 160 });

  // Add grades to Boulder Planet (Tai Seng)
  await knex('gymGrades').delete().where({ gymId: 33, name: '1', order: 10 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '2', order: 20 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '3', order: 30 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '4', order: 40 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '5', order: 50 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '6', order: 60 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '7', order: 70 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '8', order: 80 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '9', order: 90 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '10', order: 100 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '11', order: 110 });
  await knex('gymGrades').delete().where({ gymId: 33, name: '12', order: 120 });
  await knex('gymGrades')
    .delete()
    .where({ gymId: 33, name: 'Wildcard', order: 130 });
}
