import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('gym_groups', function (table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('iconUrl');
      // table.string('passSharingConditions');
      table.boolean('permanentlyClosed').notNullable();
      table.timestamps(true, true);
    })
    .then(async () => {
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
        { name: 'Ground Up', permanentlyClosed: false, iconUrl: 'https://static.wixstatic.com/media/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png/v1/fill/w_102,h_102,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8b92f2_1fb25d945b3f45f0bc807b642fa98b26~mv2.png' },
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
    });
}

// exports.up = function (knex, Promise) {
//   return Promise.all([
//       knex.schema.createTableIfNotExists("payment_paypal_status", function (table) {
//           table.increments(); // integer id

//           // name
//           table.string('name');

//           //description
//           table.string('description');
//       }).then(function () {
//               return knex("payment_paypal_status").insert([
//                   {name: "A", description: "A"},
//                   {name: "B", description: "BB"},
//                   {name: "C", description: "CCC"},
//                   {name: "D", description: "DDDD"}
//               ]);
//           }
//       ),
//   ]);
// };

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('gym_groups');
}