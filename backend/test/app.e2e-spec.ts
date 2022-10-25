import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
import { AppModule } from '../src/app/app.module';
import { ConstantsService } from '../src/utils/constants/constants.service';
import knex from 'knex';
import knexConfig from '../knexfile';
import { TelegramOauthStrategy } from '../src/auth/telegramOauth/telegramOauth.strategy';
import { MOCK_USER_1_UUID } from '../src/database/seeds/02-Users';
import { GoogleOauthStrategy } from '../src/auth/googleOauth/googleOauth.strategy';
import { JwtAuthService } from '../src/auth/jwtAuth/jwtAuth.service';
import { TelegramAlertsService } from '../src/utils/telegramAlerts/telegramAlerts.service';
import { getMockedTelegramOAuthStrategy } from './mocks/MockTelegramOauthStrategy';
import { getDateFromNow } from './helpers';

dotenv.config();
describe('Backend (e2e)', () => {
  let app: INestApplication;

  const TEST_DATABASE_NAME = 'climbjios-development-test';
  const getKnexConfig = (database?: string) => ({
    ...knexConfig,
    connection: {
      ...knexConfig.connection,
      database: database,
    },
  });
  const knexTestDatabaseConfig = getKnexConfig(TEST_DATABASE_NAME);
  const knexTestConfig = getKnexConfig();

  const TEST_USER_JWT_PAYLOAD = {
    id: MOCK_USER_1_UUID,
  };
  let TEST_USER_JWT;

  const mockConstantsService = {
    ACCESS_TOKEN_SECRET: 'dummy-placeholder-1',
    ACCESS_TOKEN_EXPIRY: '1d',
    REFRESH_TOKEN_SECRET: 'dummy-placeholder-1',
    REFRESH_TOKEN_EXPIRY: '1d',
    OAUTH_TELEGRAM_BOT_TOKEN: 'dummy-bot-token',
    CORS_ORIGIN: 'https://app.climbjios.com',
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: TEST_DATABASE_NAME,
  };

  const createBaseTestingModule = () =>
    Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConstantsService)
      .useValue(mockConstantsService)
      .overrideProvider(GoogleOauthStrategy)
      .useValue({})
      .overrideProvider(TelegramOauthStrategy)
      .useClass(getMockedTelegramOAuthStrategy(true))
      .overrideProvider(TelegramAlertsService) // silence Telegram alerts module
      .useValue({
        error: jest.fn(),
      });

  beforeAll(async () => {
    const moduleFixture: TestingModule =
      await createBaseTestingModule().compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        whitelist: true,
      }),
    );
    await app.init();

    // Create database if it does not yet exist
    const knexInstance = knex(knexTestConfig);
    const r = await knexInstance.raw(
      `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${TEST_DATABASE_NAME}'`,
    );
    if (!r.rowCount) {
      await knexInstance.raw(`CREATE DATABASE ??`, TEST_DATABASE_NAME);
    }
  });

  beforeEach(async () => {
    // Rerun migrations and seeds
    const knexInstance = knex(knexTestDatabaseConfig);
    await knexInstance.migrate.latest();
    await knexInstance.seed.run();

    // Mock user auth details
    const jwtAuthService = app.get(JwtAuthService);
    TEST_USER_JWT = (await jwtAuthService.generateJwts(TEST_USER_JWT_PAYLOAD))
      .accessToken;
  });

  describe('AppController (e2e)', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('AuthController (e2e)', () => {
    const prefix = '/auth';

    it('telegram/redirect (GET) and refresh (POST) success', async () => {
      await request(app.getHttpServer())
        .get(`${prefix}/telegram/redirect`)
        .expect(302)
        .expect(
          'Location',
          /https:\/\/app\.climbjios\.com\?accessToken=.+&refreshToken=.*/,
        );

      const insertedUser = await knex(knexTestDatabaseConfig)
        .select()
        .from('users')
        .where('authProviderId', 'telegram_id')
        .first();
      expect(insertedUser).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          authProvider: 'telegram',
          refreshToken: expect.anything(),
          authProviderId: 'telegram_id',
          email: null,
          oauthName: 'first_name last_name',
        }),
      );

      const { body } = await request(app.getHttpServer())
        .post(`${prefix}/refresh`)
        .send({ refreshToken: insertedUser.refreshToken })
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          accessToken: expect.anything(),
          refreshToken: expect.anything(),
        }),
      );
    });

    it('telegram/redirect (GET) redirects to instruction page if no telegram username', async () => {
      await createBaseTestingModule()
        .overrideProvider(TelegramOauthStrategy)
        .useClass(getMockedTelegramOAuthStrategy(false))
        .compile();

      return request(app.getHttpServer())
        .get(`${prefix}/telegram/redirect`)
        .expect(302)
        .expect(
          'Location',
          /https:\/\/app\.climbjios\.com\/updateTelegramUsername/,
        );
    });
  });

  describe('BetasController (e2e)', () => {
    const prefix = '/betas';

    it('/ (POST)', async () => {
      const data = {
        gymId: 1,
        gymGradeId: 1,
        wallId: 1,
        colorId: 1,
        cloudflareVideoUid: 'placeholder url',
      };
      const { body } = await request(app.getHttpServer())
        .post(`${prefix}`)
        .send(data)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          ...data,
          creatorId: '4394cce2-7f04-41f2-8ade-8b21cad1cb20',
        }),
      );
    });
  });

  describe('BoulderingGradesController (e2e)', () => {
    const prefix = '/boulderingGrades';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(10);
      expect(body).toEqual(expect.arrayContaining([{ id: 1, name: 'v1' }]));
    });
  });

  describe('ColorsController (e2e)', () => {
    const prefix = '/colors';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(11);
      expect(body).toEqual(expect.arrayContaining([{ id: 1, name: 'Red' }]));
    });
  });

  describe('GymsController (e2e)', () => {
    const prefix = '/gyms';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(32);
      expect(body).toEqual(
        expect.arrayContaining([
          { id: 1, name: 'Arête (By Upwall)', permanentlyClosed: false },
        ]),
      );
    });

    describe(':id/grades (GET)', () => {
      const gymId = 1;
      it('success', async () => {
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}/${gymId}/grades`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body.length).toEqual(13);
        expect(body).toEqual(expect.arrayContaining([{ id: 1, name: '1' }]));
      });

      it('gymId does not exist', async () => {
        return request(app.getHttpServer())
          .get(`${prefix}/1000/grades`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(400)
          .expect({
            message: 'Invalid gym id!',
          });
      });
    });
  });

  describe('LeadClimbingGradesController (e2e)', () => {
    const prefix = '/leadClimbingGrades';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(21);
      expect(body).toEqual(expect.arrayContaining([{ id: 2, name: '5c' }]));
    });
  });

  describe('PostsController (e2e)', () => {
    const prefix = '/posts';

    describe('/ (GET)', () => {
      it('success', async () => {
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body.length).toEqual(3);
        body.forEach((post) => {
          expect(post.creatorProfile.userId).toEqual(MOCK_USER_1_UUID);
        });
      });
    });

    describe('/ (POST)', () => {
      it('success', async () => {
        const data = {
          type: 'seller',
          numPasses: 3,
          price: 18,
          gymId: 3,
          startDateTime: getDateFromNow(1, 0).toISOString(),
          endDateTime: getDateFromNow(1, 1).toISOString(),
          openToClimbTogether: true,
          optionalNote: 'Hi there! Nice to meet u',
        };

        const { body } = await request(app.getHttpServer())
          .post(`${prefix}`)
          .send(data)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(201);

        expect(body).toEqual(
          expect.objectContaining({
            ...data,
            creatorId: MOCK_USER_1_UUID,
            isClosed: false,
          }),
        );
      });

      it('fails if missing fields', async () => {
        const data = {
          // type: "seller",
          // numPasses: 3,
          price: 18,
          gymId: 3,
          // startDateTime: "2022-10-16T16:28:07.027Z",
          endDateTime: '2022-10-16T19:28:07.027Z',
          openToClimbTogether: true,
          optionalNote: 'Hi there! Nice to meet u',
        };

        const res: any = await request(app.getHttpServer())
          .post(`${prefix}`)
          .send(data)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(400);

        expect(res.error.text).toEqual(
          '{"statusCode":400,"message":["type should not be null or undefined","numPasses should not be null or undefined","startDateTime should not be null or undefined","endDateTime should be after (dto) => dto.startDateTime!"],"error":"Bad Request"}',
        );
      });
    });

    describe('/search (GET)', () => {
      it('without parameters - returns all open posts', async () => {
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}/search`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body.length).toEqual(9);
        expect(body[2]).toEqual(
          expect.objectContaining({
            creatorId: MOCK_USER_1_UUID,
            numPasses: 5,
            price: 15.5,
            gymId: 1,
            openToClimbTogether: true,
            optionalNote: 'Hello! Nice to meet you!',
            isClosed: false,
            startDateTime: expect.anything(),
            endDateTime: expect.anything(),
            type: 'buyer',
            creatorProfile: {
              userId: MOCK_USER_1_UUID,
              name: 'Alison',
              telegramHandle: 'alison123',
              height: 156,
              reach: -18,
              bio: null,
              pronoun: {
                id: 2,
                name: 'She/Her',
              },
              highestTopRopeGrade: {
                id: 1,
                name: '4',
              },
              highestLeadClimbingGrade: null,
              highestBoulderingGrade: {
                id: 1,
                name: 'v1',
              },
              sncsCertification: null,
              favouriteGyms: [],
              hasProfilePicture: false,
            },
            gym: {
              id: 1,
              name: 'Arête (By Upwall)',
              shortName: 'Arête',
              permanentlyClosed: false,
            },
          }),
        );
      });

      it('with search params - returns filtered open posts', async () => {
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}/search?type=buyer&numPasses=3`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body.length).toEqual(3);
        expect(body[0]).toEqual(
          expect.objectContaining({
            creatorId: expect.anything(),
            numPasses: 5,
            price: 12.5,
            gymId: 1,
            openToClimbTogether: true,
            optionalNote: 'Im selling!',
            isClosed: false,
            type: 'seller',
            creatorProfile: {
              userId: expect.anything(),
              name: 'Bob',
              telegramHandle: 'bob_da_best',
              height: null,
              reach: null,
              bio: null,
              pronoun: null,
              highestBoulderingGrade: null,
              highestTopRopeGrade: null,
              highestLeadClimbingGrade: {
                id: 2,
                name: '5c',
              },
              sncsCertification: {
                id: 2,
                name: 'Level 2',
              },
              favouriteGyms: [],
              hasProfilePicture: true,
              profilePictureUrl: expect.anything(),
            },
            gym: {
              id: 1,
              name: 'Arête (By Upwall)',
              shortName: 'Arête',
              permanentlyClosed: false,
            },
          }),
        );
      });
    });

    describe(':postId (GET)', () => {
      it('success', async () => {
        const postId = 1;
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body).toEqual(
          expect.objectContaining({
            id: 1,
            creatorId: MOCK_USER_1_UUID,
            numPasses: 5,
            price: 15.5,
            gymId: 1,
            openToClimbTogether: true,
            optionalNote: 'Hello! Nice to meet you!',
            isClosed: false,
            startDateTime: expect.anything(),
            endDateTime: expect.anything(),
            type: 'buyer',
            creatorProfile: {
              userId: MOCK_USER_1_UUID,
              name: 'Alison',
              telegramHandle: 'alison123',
              height: 156,
              reach: -18,
              bio: null,
              highestLeadClimbingGrade: null,
              sncsCertification: null,
              pronoun: { id: 2, name: 'She/Her' },
              highestBoulderingGrade: { id: 1, name: 'v1' },
              highestTopRopeGrade: { id: 1, name: '4' },
              favouriteGyms: [],
              hasProfilePicture: false,
            },
            gym: {
              id: 1,
              name: 'Arête (By Upwall)',
              shortName: 'Arête',
              permanentlyClosed: false,
            },
          }),
        );
      });

      it('does not exist', () => {
        const postId = 1000;
        return request(app.getHttpServer())
          .get(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(403);
      });

      it('does not belong to user', () => {
        const postId = 2;
        return request(app.getHttpServer())
          .get(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(403);
      });
    });

    describe(':postId (PATCH)', () => {
      it('success', async () => {
        const postId = 1;
        const data = {
          type: 'seller',
          numPasses: 3,
          price: 18,
          gymId: 3,
          startDateTime: getDateFromNow(1, 0).toISOString(),
          endDateTime: getDateFromNow(1, 1).toISOString(),
          openToClimbTogether: true,
          optionalNote: 'Hi there! Nice to meet u',
        };
        const { body } = await request(app.getHttpServer())
          .patch(`${prefix}/${postId}`)
          .send(data)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body).toEqual(
          expect.objectContaining({
            ...data,
            id: 1,
            creatorId: MOCK_USER_1_UUID,
            isClosed: false,
            creatorProfile: {
              userId: MOCK_USER_1_UUID,
              name: 'Alison',
              telegramHandle: 'alison123',
              height: 156,
              reach: -18,
              bio: null,
              highestLeadClimbingGrade: null,
              sncsCertification: null,
              pronoun: { id: 2, name: 'She/Her' },
              highestBoulderingGrade: { id: 1, name: 'v1' },
              highestTopRopeGrade: { id: 1, name: '4' },
              favouriteGyms: [],
              hasProfilePicture: false,
            },
            gym: {
              id: 3,
              name: 'b8A',
              shortName: 'b8A',
              permanentlyClosed: false,
            },
          }),
        );
      });

      it('does not exist', () => {
        const postId = 1000;
        return request(app.getHttpServer())
          .patch(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(403);
      });

      it('does not belong to user', () => {
        const postId = 2;
        return request(app.getHttpServer())
          .patch(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(403);
      });
    });
  });

  describe('PronounsController (e2e)', () => {
    const prefix = '/pronouns';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(4);
      expect(body).toEqual(
        expect.arrayContaining([{ id: 4, name: 'Prefer not to say' }]),
      );
    });
  });

  describe('SncsCertificationsController (e2e)', () => {
    const prefix = '/sncsCertifications';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(3);
      expect(body).toEqual(
        expect.arrayContaining([{ id: 1, name: 'Level 1' }]),
      );
    });
  });

  describe('TopRopeGradesController (e2e)', () => {
    const prefix = '/topRopeGrades';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(21);
      expect(body).toEqual(expect.arrayContaining([{ id: 1, name: '4' }]));
    });
  });

  describe('UserController (e2e)', () => {
    const prefix = '/user';

    describe('/ (GET)', () => {
      it('success', async () => {
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body).toEqual(
          expect.objectContaining({
            userId: MOCK_USER_1_UUID,
            name: 'Alison',
            telegramHandle: 'alison123',
            height: 156,
            reach: -18,
            pronounId: 2,
            highestBoulderingGradeId: 1,
            highestTopRopeGradeId: 1,
            highestLeadClimbingGradeId: null,
            sncsCertificationId: null,
            bio: null,
            highestLeadClimbingGrade: null,
            sncsCertification: null,
            pronoun: { id: 2, name: 'She/Her' },
            highestBoulderingGrade: { id: 1, name: 'v1' },
            highestTopRopeGrade: { id: 1, name: '4' },
            favouriteGyms: [],
            hasProfilePicture: false,
          }),
        );
      });
    });

    describe('/ (PATCH)', () => {
      it('success', async () => {
        const { body } = await request(app.getHttpServer())
          .patch(`${prefix}`)
          .send({
            name: 'John Doe',
            height: 171,
            reach: 2,
            pronounId: 1,
            highestBoulderingGradeId: 10,
            highestTopRopeGradeId: 10,
            highestLeadClimbingGradeId: 1,
            sncsCertificationId: 1,
            bio: 'this is my bio',
            favouriteGymIds: [4, 5],
          })
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body).toEqual(
          expect.objectContaining({
            userId: MOCK_USER_1_UUID,
            name: 'John Doe',
            telegramHandle: 'alison123',
            height: 171,
            reach: 2,
            pronounId: 1,
            highestBoulderingGradeId: 10,
            highestTopRopeGradeId: 10,
            highestLeadClimbingGradeId: 1,
            sncsCertificationId: 1,
            bio: 'this is my bio',
            pronoun: { id: 1, name: 'He/Him' },
            highestBoulderingGrade: { id: 10, name: 'v10' },
            highestTopRopeGrade: { id: 10, name: '7a+' },
            highestLeadClimbingGrade: { id: 1, name: '4' },
            sncsCertification: { id: 1, name: 'Level 1' },
            favouriteGyms: [
              {
                id: 4,
                name: 'BFF Climb (Bukit Timah)',
                shortName: 'BFF (Bkt Timah)',
                permanentlyClosed: false,
              },
              {
                id: 5,
                name: 'BFF Climb (Bendemeer)',
                shortName: 'BFF (Bendemeer)',
                permanentlyClosed: false,
              },
            ],
          }),
        );
      });

      it('does not patch telegram handle', async () => {
        const { body } = await request(app.getHttpServer())
          .patch(`${prefix}`)
          .send({
            telegramHandle: 'telegramHandle',
          })
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body).toEqual(
          expect.objectContaining({
            telegramHandle: 'alison123',
          }),
        );
      });
    });
  });

  describe('WallsController (e2e)', () => {
    const prefix = '/walls';

    it('/ (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toEqual(3);
      expect(body).toEqual(
        expect.arrayContaining([{ id: 2, name: 'Overhang' }]),
      );
    });
  });
});
