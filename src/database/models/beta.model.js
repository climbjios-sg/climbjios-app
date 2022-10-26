"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetaModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base.model");
const color_model_1 = require("./color.model");
const gym_model_1 = require("./gym.model");
const gymGrade_model_1 = require("./gymGrade.model");
const userProfile_model_1 = require("./userProfile.model");
const wall_model_1 = require("./wall.model");
class BetaModel extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.$afterFind = (context) => {
            const result = super.$afterFind(context);
            this.thumbnailUrl = `https://customer-${process.env.CLOUDFLARE_CUSTOMER_CODE}.cloudflarestream.com/${this.cloudflareVideoUid}/thumbnails/thumbnail.jpg?time=1s&height=640&width=360`;
            return result;
        };
    }
}
exports.BetaModel = BetaModel;
BetaModel.tableName = 'betas';
BetaModel.relationMappings = () => ({
    creatorProfile: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: userProfile_model_1.UserProfileModel,
        filter: (query) => query.select('*'),
        join: {
            from: 'betas.creatorId',
            to: 'userProfiles.userId',
        },
    },
    gym: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: gym_model_1.GymModel,
        filter: (query) => query.select('id', 'name', 'shortName'),
        join: {
            from: 'betas.gymId',
            to: 'gyms.id',
        },
    },
    color: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: color_model_1.ColorModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'betas.colorId',
            to: 'colors.id',
        },
    },
    wall: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: wall_model_1.WallModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'betas.wallId',
            to: 'walls.id',
        },
    },
    gymGrade: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: gymGrade_model_1.GymGradeModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'betas.gymGradeId',
            to: 'gymGrades.id',
        },
    },
});
//# sourceMappingURL=beta.model.js.map