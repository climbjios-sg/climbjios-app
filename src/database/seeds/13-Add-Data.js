"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex('gymGrades').insert([
        { gymId: 4, name: '13', order: 130 },
        { gymId: 4, name: '14', order: 140 },
        { gymId: 4, name: '15', order: 150 },
    ]);
    await knex('gymGrades').insert([
        { gymId: 5, name: '13', order: 130 },
        { gymId: 5, name: '14', order: 140 },
        { gymId: 5, name: '15', order: 150 },
    ]);
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
    await knex('gyms').insert([
        {
            id: 34,
            name: 'Camp5 (Utama)',
            shortName: 'Camp5 (Utam)',
            permanentlyClosed: false,
        },
        {
            id: 35,
            name: 'Camp5 (KL Eco City)',
            shortName: 'Camp5 (KL)',
            permanentlyClosed: false,
        },
        {
            id: 36,
            name: 'Camp5 (Paradigm Jb)',
            shortName: 'Camp5 (JB)',
            permanentlyClosed: false,
        },
        {
            id: 37,
            name: 'Camp5 (Utropolis)',
            shortName: 'Camp5 (Utro)',
            permanentlyClosed: false,
        },
        {
            id: 38,
            name: 'Camp5 (Jumpa & Beastpark)',
            shortName: 'Camp5 (J & B)',
            permanentlyClosed: false,
        },
    ]);
    await knex('gymGrades').insert([
        { gymId: 34, name: 'Pink', order: 10 },
        { gymId: 34, name: 'Blue', order: 20 },
        { gymId: 34, name: 'Yellow', order: 30 },
        { gymId: 34, name: 'Orange', order: 40 },
        { gymId: 34, name: 'Green', order: 50 },
        { gymId: 34, name: 'Purple', order: 60 },
        { gymId: 34, name: 'Red', order: 70 },
        { gymId: 34, name: 'Black', order: 80 },
        { gymId: 35, name: 'Pink', order: 10 },
        { gymId: 35, name: 'Blue', order: 20 },
        { gymId: 35, name: 'Yellow', order: 30 },
        { gymId: 35, name: 'Orange', order: 40 },
        { gymId: 35, name: 'Green', order: 50 },
        { gymId: 35, name: 'Purple', order: 60 },
        { gymId: 35, name: 'Red', order: 70 },
        { gymId: 35, name: 'Black', order: 80 },
        { gymId: 36, name: 'Pink', order: 10 },
        { gymId: 36, name: 'Blue', order: 20 },
        { gymId: 36, name: 'Yellow', order: 30 },
        { gymId: 36, name: 'Orange', order: 40 },
        { gymId: 36, name: 'Green', order: 50 },
        { gymId: 36, name: 'Purple', order: 60 },
        { gymId: 36, name: 'Red', order: 70 },
        { gymId: 36, name: 'Black', order: 80 },
        { gymId: 37, name: 'Pink', order: 10 },
        { gymId: 37, name: 'Blue', order: 20 },
        { gymId: 37, name: 'Yellow', order: 30 },
        { gymId: 37, name: 'Orange', order: 40 },
        { gymId: 37, name: 'Green', order: 50 },
        { gymId: 37, name: 'Purple', order: 60 },
        { gymId: 37, name: 'Red', order: 70 },
        { gymId: 37, name: 'Black', order: 80 },
        { gymId: 38, name: 'Pink', order: 10 },
        { gymId: 38, name: 'Blue', order: 20 },
        { gymId: 38, name: 'Yellow', order: 30 },
        { gymId: 38, name: 'Orange', order: 40 },
        { gymId: 38, name: 'Green', order: 50 },
        { gymId: 38, name: 'Purple', order: 60 },
        { gymId: 38, name: 'Red', order: 70 },
        { gymId: 38, name: 'Black', order: 80 },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=13-Add-Data.js.map