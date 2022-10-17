"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const types_1 = require("../../utils/types");
async function seed(knex) {
    if (['staging', 'production'].includes(process.env.NODE_ENV)) {
        console.log('skipping post seeds');
        return;
    }
    await knex.raw('TRUNCATE TABLE posts RESTART IDENTITY CASCADE');
    const [alison, bob] = await knex.select().from('users');
    await knex('posts').insert([
        {
            userId: alison.id,
            type: types_1.PostType.BUYER,
            numPasses: 5,
            price: 15.5,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setHours(22, 15, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'Hello! Nice to meet you!',
            isClosed: false,
        },
        {
            userId: bob.id,
            type: types_1.PostType.SELLER,
            numPasses: 8,
            price: 18,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setHours(14, 30, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: "I'm selling tix!",
            isClosed: false,
        },
        {
            userId: bob.id,
            type: types_1.PostType.OTHER,
            numPasses: 0,
            price: 0,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setHours(14, 30, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'I love climbing! Open jio!',
            isClosed: false,
        },
        {
            userId: alison.id,
            type: types_1.PostType.BUYER,
            numPasses: 5,
            price: 15.5,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() - 1);
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() - 1);
                d.setHours(15, 15, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'Hello! Nice to meet you!',
            isClosed: false,
        },
        {
            userId: bob.id,
            type: types_1.PostType.SELLER,
            numPasses: 5,
            price: 12.5,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() - 1);
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() - 1);
                d.setHours(10, 0, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'Im selling!',
            isClosed: false,
        },
        {
            userId: bob.id,
            type: types_1.PostType.OTHER,
            numPasses: 0,
            price: 0,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() - 1);
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() - 1);
                d.setHours(10, 0, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'Looking for climbing mates!',
            isClosed: false,
        },
        {
            userId: alison.id,
            type: types_1.PostType.BUYER,
            numPasses: 5,
            price: 20,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() + 7);
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() + 7);
                d.setHours(15, 15, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'Hello! Looking for tix next week',
            isClosed: false,
        },
        {
            userId: bob.id,
            type: types_1.PostType.SELLER,
            numPasses: 8,
            price: 21,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() + 7);
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() + 7);
                d.setHours(10, 15, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'Hello! Selling these tix next week',
            isClosed: false,
        },
        {
            userId: bob.id,
            type: types_1.PostType.OTHER,
            numPasses: 0,
            price: 0,
            gymId: 1,
            startDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() + 7);
                d.setHours(8, 15, 0, 0);
                return d;
            })(),
            endDateTime: (() => {
                const d = new Date();
                d.setDate(new Date().getDate() + 7);
                d.setHours(10, 15, 0, 0);
                return d;
            })(),
            openToClimbTogether: true,
            optionalNote: 'Climb wif me!',
            isClosed: false,
        },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=03-Posts.js.map