"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex.raw('TRUNCATE TABLE sncs_certifications RESTART IDENTITY CASCADE');
    await knex('sncsCertifications').insert([
        { name: 'Level 1' },
        { name: 'Level 2' },
        { name: 'Level 3' },
    ]);
}
exports.seed = seed;
//# sourceMappingURL=07-SCNS_Certifications.js.map