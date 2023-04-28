"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE gym_groups RESTART IDENTITY CASCADE');
    await knex('gymGroups').insert([
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
        { name: 'Ground Up', permanentlyClosed: false },
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
}
exports.seed = seed;
//# sourceMappingURL=00-f01-add-gym-groups.js.map