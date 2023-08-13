import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as dotenv from 'dotenv';
import { AppModule } from '../src/app/app.module';
import {
  ConstantsService,
  IConstantsService,
} from '../src/utils/constants/constants.service';
import knex from 'knex';
import knexConfig from '../knexfile';
import { TelegramOauthStrategy } from '../src/auth/telegramOauth/telegramOauth.strategy';
import { MOCK_USER_1_UUID } from '../src/database/seeds/02-Users';
import { GoogleOauthStrategy } from '../src/auth/googleOauth/googleOauth.strategy';
import { JwtAuthService } from '../src/auth/jwtAuth/jwtAuth.service';
import { TelegramService } from '../src/utils/telegram/telegram.service';
import { getMockedTelegramOAuthStrategy } from './mocks/MockTelegramOauthStrategy';
import { getDateFromNow } from './helpers';
import {
  MOCK_POST_1_UUID,
  MOCK_POST_2_UUID,
} from '../src/database/seeds/03-Posts';
import { PostStatus } from '../src/utils/types';

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

  const mockConstantsService: Partial<IConstantsService> = {
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
    NODE_ENV: 'test',
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
      .overrideProvider(TelegramService) // silence Telegram alerts module
      .useValue({
        sendViaAlertsBot: jest.fn(),
        sendViaOAuthBot: jest.fn().mockResolvedValue({
          data: {
            result: {
              message_id: 1,
            },
          },
        }),
        editViaOAuthBot: jest.fn().mockResolvedValue({
          data: {
            result: {
              message_id: 1,
            },
          },
        }),
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

  afterEach(async () => {
    await app.close();
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
          /https:\/\/app\.climbjios\.com\/authRedirect\?accessToken=.+&refreshToken=.*/,
        );

      const insertedUser = await knex(knexTestDatabaseConfig)
        .select()
        .from('users')
        .where('authProviderId', 'auth_provider_id')
        .first();
      expect(insertedUser).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          authProvider: 'telegram',
          authProviderId: 'auth_provider_id',
          email: null,
          oauthName: 'first_name last_name',
        }),
      );

      const refreshToken = (
        await knex(knexTestDatabaseConfig)
          .select()
          .from('refreshTokens')
          .where('userId', insertedUser.id)
          .first()
      ).refreshToken;

      const { body } = await request(app.getHttpServer())
        .post(`${prefix}/refresh`)
        .send({ refreshToken })
        .expect(201);

      expect(body).toEqual(
        expect.objectContaining({
          accessToken: expect.anything(),
          refreshToken: expect.anything(),
        }),
      );
    });

    it('telegram/redirect (GET) updates telegram username only if it changes', async () => {
      await request(app.getHttpServer())
        .get(`${prefix}/telegram/redirect`)
        .expect(302)
        .expect(
          'Location',
          /https:\/\/app\.climbjios\.com\/authRedirect\?accessToken=.+&refreshToken=.+/,
        );

      await createBaseTestingModule()
        .overrideProvider(TelegramOauthStrategy)
        .useClass(getMockedTelegramOAuthStrategy(true, 'telegramHandle2'))
        .compile();

      await request(app.getHttpServer())
        .get(`${prefix}/telegram/redirect`)
        .expect(302)
        .expect(
          'Location',
          /https:\/\/app\.climbjios\.com\/authRedirect\?accessToken=.+&refreshToken=.+&updatedTelegramUsername=true/,
        );

      const insertedUser = await knex(knexTestDatabaseConfig)
        .select()
        .from('users')
        .where('auth_provider_id', 'auth_provider_id')
        .first();
      const insertedUserProfile = await knex(knexTestDatabaseConfig)
        .select()
        .from('userProfiles')
        .where('user_id', insertedUser.id)
        .first();
      expect(insertedUserProfile).toEqual(
        expect.objectContaining({
          userId: insertedUser.id,
          telegramHandle: 'telegramHandle2',
          bio: null,
          hasProfilePicture: false,
          height: null,
          highestBoulderingGradeId: null,
          highestLeadClimbingGradeId: null,
          highestTopRopeGradeId: null,
          id: 3,
          name: null,
          pronounId: null,
          reach: null,
          sncsCertificationId: null,
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

      expect(body.length).toBeGreaterThan(0);
      expect(body).toEqual(
        expect.arrayContaining([
          { id: 1, name: 'Arête (By Upwall)' },
          { name: 'Boulder Planet (Sembawang)', id: 14 },
          { id: 2, name: 'Ark Bloc' },
          { name: 'Boulder World (Paragon)', id: 16 },
        ]),
      );
      expect(body).toEqual(
        expect.not.arrayContaining([
          { name: 'Boulder World (SingPost)', id: 15 }, //closed
        ]),
      );
    });

    it('/:id? (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}/${1}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
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
          socialUrl: 'https://instagram.com/arete.climbing?igshid=NDk5N2NlZjQ=',
          website: 'https://upwallclimbing.sg/',
          lead: false,
          boulder: true,
          topRope: false,
          autoBelay: false,
        }),
      );
    });

    it('/:id/passes (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}/${4}/passes`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body).toEqual(
        expect.objectContaining({
          gymOutletPasses: expect.arrayContaining([
            expect.objectContaining({
              id: 26,
              passGroupId: 5,
              passName: 'Adult Entry',
              numberOfPasses: 1,
              price: 23.76,
              discountedPrice: null,
              paymentFrequency: '',
              initiationFee: null,
              discountedInitiationFee: null,
              freezingFee: null,
              ageRestriction: '',
              sharingPolicy: '',
              timeRestriction: '',
              validityPeriod: '',
              infoUrl: 'https://bffclimb.com/rates/',
              remarks: '',
            }),
          ]),

          gymGroupPasses: expect.arrayContaining([
            expect.objectContaining({
              id: 21,
              passGroupId: 4,
              passName: 'Youth Entry',
              numberOfPasses: 1,
              price: 17.28,
              discountedPrice: null,
              paymentFrequency: '',
              initiationFee: null,
              discountedInitiationFee: null,
              freezingFee: null,
              ageRestriction: '< 19',
              sharingPolicy: '',
              timeRestriction:
                'Weekday 9.30am - 6pm, excluding Public Holidays',
              validityPeriod: '',
              infoUrl: 'https://bffclimb.com/rates/',
              remarks: '',
            }),
          ]),
        }),
      );
    });

    it('/search/:substring? (GET)', async () => {
      const substring = 'chevrons';
      const { body } = await request(app.getHttpServer())
        .get(`${prefix}/search/${substring}`)
        .set('Authorization', 'Bearer ' + TEST_USER_JWT)
        .expect(200);

      expect(body.length).toBeGreaterThan(0);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 6,
            name: 'Boulder+',
            gymOutlets: expect.arrayContaining([
              expect.objectContaining({
                address:
                  '12 Kallang Ave, #03-17, The Aperia Mall, Singapore 339511',
                area: 'Lavender',
                id: 12,
                name: 'Boulder+ (Aperia Mall)',
              }),
              expect.objectContaining({
                address:
                  '48 Boon Lay Way, 04-01 The Chevrons, Singapore 609961',
                area: 'Jurong East',
                id: 13,
                name: 'Boulder+ (The Chevrons)',
              }),
            ]),
          }),
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
          startDateTime: getDateFromNow(1, 0, 0).toISOString(),
          endDateTime: getDateFromNow(1, 0, 1).toISOString(),
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
            status: PostStatus.OPEN,
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
          '{"statusCode":400,"message":["type should not be null or undefined","numPasses should not be null or undefined","endDateTime should be after (dto) => dto.startDateTime!"],"error":"Bad Request"}',
        );
      });
    });

    describe('/search (GET)', () => {
      it('without parameters - returns all open posts', async () => {
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}/search`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        body.forEach((obj) => {
          expect(obj).toEqual(
            expect.objectContaining({
              status: 'open',
            }),
          );
        });
      });

      it('with search params - returns filtered posts', async () => {
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}/search?type=buyer`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        body.forEach((obj) => {
          expect(obj).toEqual(
            expect.objectContaining({
              type: 'buyer',
            }),
          );
        });
      });
    });

    describe(':postId (GET)', () => {
      it('success', async () => {
        const postId = MOCK_POST_1_UUID;
        const { body } = await request(app.getHttpServer())
          .get(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);

        expect(body).toEqual(
          expect.objectContaining({
            id: MOCK_POST_1_UUID,
            creatorId: MOCK_USER_1_UUID,
            numPasses: 5,
            price: 15.5,
            gymId: 1,
            openToClimbTogether: true,
            optionalNote: 'Hello! Nice to meet you!',
            isClosed: false,
            status: PostStatus.OPEN,
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
        const postId = '9884e38a-bddd-4cd0-ad4d-e36e1e67944e';
        return request(app.getHttpServer())
          .get(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(404);
      });

      it('does not belong to user', () => {
        const postId = MOCK_POST_2_UUID;
        return request(app.getHttpServer())
          .get(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(200);
      });

      it('invalid uuid', () => {
        const postId = '1';
        return request(app.getHttpServer())
          .get(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(400)
          .expect(`{"message":"Invalid post id!"}`);
      });
    });

    describe(':postId (PATCH)', () => {
      it('success', async () => {
        const postId = MOCK_POST_1_UUID;
        const data = {
          type: 'seller',
          numPasses: 3,
          price: 18,
          gymId: 3,
          startDateTime: getDateFromNow(1, 0, 0).toISOString(),
          endDateTime: getDateFromNow(1, 0, 1).toISOString(),
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
            id: MOCK_POST_1_UUID,
            creatorId: MOCK_USER_1_UUID,
            status: PostStatus.OPEN,
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
        const postId = '9884e38a-bddd-4cd0-ad4d-e36e1e67944e';
        return request(app.getHttpServer())
          .patch(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(403);
      });

      it('does not belong to user', () => {
        const postId = MOCK_POST_2_UUID;
        return request(app.getHttpServer())
          .patch(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(403);
      });

      it('invalid uuid', () => {
        const postId = 1;
        return request(app.getHttpServer())
          .patch(`${prefix}/${postId}`)
          .set('Authorization', 'Bearer ' + TEST_USER_JWT)
          .expect(400)
          .expect(`{"message":"Invalid post id!"}`);
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
                shortName: 'BFF (Bendmr)',
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
