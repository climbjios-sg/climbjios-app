import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema.table('gyms', (table) => {
      table
        .integer('gymGroupId')
        .notNullable()
        .references('id')
        .inTable('gym_groups')
        .defaultTo(1);
      table.string('iconUrl');
      table.string('address');
      table.string('area');
      table.string('passSharing');
      table.boolean('boulder');
      table.boolean('autoBelay');
      table.boolean('topRope');
      table.boolean('lead');
      table.string('mondayOpening');
      table.string('mondayClosing');
      table.string('tuedayOpening');
      table.string('tuedayClosing');
      table.string('wednesdayOpening');
      table.string('wednesdayClosing');
      table.string('thursdayOpening');
      table.string('thursdayClosing');
      table.string('fridayOpening');
      table.string('fridayClosing');
      table.string('saturdayOpening');
      table.string('saturdayClosing');
      table.string('sundayOpening');
      table.string('sundayClosing');
    });

    const data = [
      {
        name: 'Arête (By Upwall)',
        shortName: 'Arête',
        permanentlyClosed: false,
        id: 1,
        gymGroupId: 18,
        area: 'Expo',
        address:
          '5 Changi Business Park Central 1, #02-14/15/16, Singapore 486038',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Ark Bloc',
        shortName: 'Ark Bloc',
        permanentlyClosed: false,
        id: 2,
        gymGroupId: 1,
        area: 'Punggol/Tampines',
        address: 'Ark Bloc Punggol, 6 Tebing Lane, #01-05, Singapore 828835',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'b8A',
        shortName: 'b8A',
        permanentlyClosed: false,
        id: 3,
        gymGroupId: 2,
        area: 'Tampines West',
        address:
          '03-06, 6 Tampines Street 92, yo:HA Commercial @ Tampines, Singapore 528893',
        passSharing: '',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'BFF Climb (Bukit Timah)',
        shortName: 'BFF (Bkt Timah)',
        permanentlyClosed: false,
        id: 4,
        gymGroupId: 3,
        area: 'King Albert Park',
        address: '896 Dunearn Rd, #02-01D, Singapore 589472',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: true,
      },
      {
        name: 'BFF Climb (Bendemeer)',
        shortName: 'BFF (Bendmr)',
        permanentlyClosed: false,
        id: 5,
        gymGroupId: 3,
        area: 'Bendemeer',
        address: 'CT Hub, 2 Kallang Avenue, #01-20, Singapore 339407',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'boruda',
        shortName: 'boruda',
        permanentlyClosed: false,
        id: 6,
        gymGroupId: 4,
        area: 'Labrador Park',
        address: '991A Alexandra Rd, Singapore 119969',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder Movement (Bugis)',
        shortName: 'BM (Bugis)',
        permanentlyClosed: false,
        id: 7,
        gymGroupId: 5,
        area: 'Bugis',
        address: '201 Victoria Street #05-07, Bugis+, Singapore 188067',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder Movement (Downtown)',
        shortName: 'BM (OUE)',
        permanentlyClosed: false,
        id: 8,
        gymGroupId: 5,
        area: 'Downtown',
        address: '6A Shenton Way #B1-03 Downtown Gallery, 068815',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder Movement (Suntec)',
        shortName: 'BM (Suntec)',
        permanentlyClosed: false,
        id: 9,
        gymGroupId: 5,
        area: 'Suntec',
        address:
          '3 Temasek Boulevard, #01-484/85/86, Suntec City Mall (North Wing), Tower One, Singapore 038983',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder Movement (Tai Seng)',
        shortName: 'BM (Tai Seng)',
        permanentlyClosed: false,
        id: 10,
        gymGroupId: 5,
        area: 'Tai Seng',
        address: '18 Tai Seng St, #01-09, Singapore 539775',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder Movement (Rochor)',
        shortName: 'BM (Tekka)',
        permanentlyClosed: false,
        id: 11,
        gymGroupId: 5,
        area: 'Rochor',
        address: '2 Serangoon Rd, #02-12 Tekka Place, Singapore 218227',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder+ (Aperia Mall)',
        shortName: 'B+ (Aperia)',
        permanentlyClosed: false,
        id: 12,
        gymGroupId: 6,
        area: 'Lavender',
        address: '12 Kallang Ave, #03-17, The Aperia Mall, Singapore 339511',
        passSharing: 'Passholder must be present and checked in',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder+ (The Chevrons)',
        shortName: 'B+ (Chevrons)',
        permanentlyClosed: false,
        id: 13,
        gymGroupId: 6,
        area: 'Jurong East',
        address: '48 Boon Lay Way, 04-01 The Chevrons, Singapore 609961',
        passSharing: 'Passholder must be present and checked in',
        lead: true,
        boulder: false,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'Boulder Planet (Sembawang)',
        shortName: 'BP (Semb)',
        permanentlyClosed: false,
        id: 14,
        gymGroupId: 4,
        area: 'Canberra (Sembwanag Mall)',
        address:
          '604 Sembawang Road, Sembawang Shopping Centre, #B1, 22/23, 758459',
        passSharing: 'Passholder must be present and checked in',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder World (SingPost)',
        shortName: 'BW (SingPost)',
        permanentlyClosed: false,
        id: 15,
        gymGroupId: 7,
        area: 'Paya Lebar',
        address:
          '10 Eunos Rd 8, #01-205 SingPost Centre (Enrichment Zone, Singapore 408600',
        passSharing: 'Passholder must be present and checked in',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder World (Paragon)',
        shortName: 'BW (Paragon)',
        permanentlyClosed: false,
        id: 16,
        gymGroupId: 7,
        area: 'Orchard',
        address:
          '290 Orchard Rd, #06-25/26, Paragon Shopping Centre, Singapore 238859',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Climb Central (Katong)',
        shortName: 'CC (Katong)',
        permanentlyClosed: false,
        id: 17,
        gymGroupId: 8,
        area: 'Katong',
        address: 'i12 Katong, 112 East Coast Road, #04-01/02, Singapore 428802',
        passSharing: 'Passholder must be present and checked in',
        lead: true,
        boulder: true,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'Climb Central (Novena)',
        shortName: 'CC (Novena)',
        permanentlyClosed: false,
        id: 18,
        gymGroupId: 8,
        area: 'Novena',
        address: 'Novena Square, 238 Thomson Rd, #03-23/25, Singapore 307683',
        passSharing: 'Passholder must be present and checked in',
        lead: true,
        boulder: true,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'Climb Central (Sports Hub)',
        shortName: 'CC (Sports Hub)',
        permanentlyClosed: false,
        id: 19,
        gymGroupId: 8,
        area: 'Kallang',
        address: 'Kallang Wave Mall, 1 Stadium Place, #B1-01, Singapore 397628',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: true,
      },
      {
        name: 'Climb Central (Funan)',
        shortName: 'CC (Funan)',
        permanentlyClosed: false,
        id: 20,
        gymGroupId: 8,
        area: 'City Hall',
        address:
          'Funan Mall, 107 North Bridge Road, #B2-19/21, Singapore 179105',
        passSharing: 'Passholder must be present and checked in',
        lead: false,
        boulder: true,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'FitBloc (Depot Heights)',
        shortName: 'FitBloc (DH)',
        permanentlyClosed: false,
        id: 21,
        gymGroupId: 9,
        area: 'Redhill/Telok Blangah',
        address:
          '108 Depot Rd, #02-01 Depot Heights Shopping Centre, Singapore 100108',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: true,
      },
      {
        name: 'FitBloc (Kent Ridge)',
        shortName: 'FitBloc (KR)',
        permanentlyClosed: false,
        id: 22,
        gymGroupId: 9,
        area: 'Kent Ridge',
        address: '87 Science Park Dr, #03-02 The Oasis, Singapore 118260',
        passSharing: '',
        lead: true,
        boulder: true,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'Ground Up',
        shortName: 'GU',
        permanentlyClosed: false,
        id: 23,
        gymGroupId: 10,
        area: 'Farrer Park',
        address:
          '60 Tessensohn Road, CSC@Tessensohn, Level 2, Singapore 217664',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Kinetics',
        shortName: 'Kinetics',
        permanentlyClosed: false,
        id: 24,
        gymGroupId: 11,
        area: 'Farrer Park',
        address: '511 Serangoon Rd, Singapore 218153',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Lighthouse',
        shortName: 'Lighthouse',
        permanentlyClosed: false,
        id: 25,
        gymGroupId: 12,
        area: 'Pasir Panjang',
        address: '44 Pasir Panjang Road #B-02, 118504',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Origin Boulder',
        shortName: 'Origin',
        permanentlyClosed: false,
        id: 26,
        gymGroupId: 13,
        area: 'Telok Ayer',
        address:
          '18 Cross Street, Cross Street Exchange B1-117 & B1-118, 048423',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'OYEYO',
        shortName: 'OYEYO',
        permanentlyClosed: false,
        id: 27,
        gymGroupId: 14,
        area: 'Little India',
        address: '148 Mackenzie Rd, Singapore 228724',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Project Send',
        shortName: 'Project Send',
        permanentlyClosed: false,
        id: 28,
        gymGroupId: 15,
        area: 'Esplanade',
        address: '8 Raffles Ave., #02-29 Esplanade Mall, Singapore 039802',
        passSharing: '',
        lead: true,
        boulder: true,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'T-Hall',
        shortName: 'T-Hall',
        permanentlyClosed: false,
        id: 29,
        gymGroupId: 16,
        area: 'Lavender',
        address: '464 Crawford Ln, #01-464, Singapore 190464',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: true,
        boulder: true,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'The Rock School (Our Tampines Hub)',
        shortName: 'TRS',
        permanentlyClosed: false,
        id: 30,
        gymGroupId: 17,
        area: 'Tampines',
        address: 'Our Tampines Hub, 1 Tampines Walk, #02-81, Singapore 528523',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: true,
        boulder: true,
        topRope: true,
        autoBelay: true,
      },
      {
        name: 'Upwall',
        shortName: 'Upwall',
        permanentlyClosed: false,
        id: 31,
        gymGroupId: 18,
        area: 'Downtown East',
        address: '1 Pasir Ris Close, E!Hub@Downtown East, #01-105, 519599',
        passSharing:
          'Passholder does not need to present; Account passes shared on the spot',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Z-Vertigo',
        shortName: 'Z-Vertigo',
        permanentlyClosed: false,
        id: 32,
        gymGroupId: 19,
        area: 'Beauty World ',
        address:
          '170 Upper Bukit Timah Rd, B2-20B Z-Vertigo Boulder Gym, 588179',
        passSharing:
          'Passholder does not need to be present but accounts have to be linked beforehand',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
      {
        name: 'Boulder Planet (Tai Seng)',
        shortName: 'BP (Tai Seng)',
        permanentlyClosed: false,
        id: 33,
        gymGroupId: 4,
        area: 'Tai Seng',
        address:
          '601 MacPherson Rd, #02-07 Grantral Mall @ MacPherson, Singapore 368242',
        passSharing: 'Passholder must be present and checked in',
        lead: false,
        boulder: true,
        topRope: false,
        autoBelay: false,
      },
    ];

    await Promise.all(
      data.map((row) => {
        return knex('gyms').update(row).where('id', row.id);
      }),
    );

    await knex('gyms').update({ gymGroupId: 20 }).whereLike('name', 'Camp5%');
  } catch (error) {
    console.error(error);
  }
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('gyms', (table) => {
    table.dropColumn('gymGroupID');
    table.dropColumn('iconUrl');
    table.dropColumn('address');
    table.dropColumn('area');
    table.dropColumn('passSharing');
    table.dropColumn('boulder');
    table.dropColumn('autoBelay');
    table.dropColumn('topRope');
    table.dropColumn('lead');
    table.dropColumn('mondayOpening');
    table.dropColumn('mondayClosing');
    table.dropColumn('tuedayOpening');
    table.dropColumn('tuedayClosing');
    table.dropColumn('wednesdayOpening');
    table.dropColumn('wednesdayClosing');
    table.dropColumn('thursdayOpening');
    table.dropColumn('thursdayClosing');
    table.dropColumn('fridayOpening');
    table.dropColumn('fridayClosing');
    table.dropColumn('saturdayOpening');
    table.dropColumn('saturdayClosing');
    table.dropColumn('sundayOpening');
    table.dropColumn('sundayClosing');
  });
}
