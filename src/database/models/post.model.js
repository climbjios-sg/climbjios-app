"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base.model");
const gym_model_1 = require("./gym.model");
const userProfile_model_1 = require("./userProfile.model");
class PostModel extends base_model_1.BaseModel {
}
exports.PostModel = PostModel;
PostModel.tableName = 'posts';
PostModel.relationMappings = () => ({
    creatorProfile: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: userProfile_model_1.UserProfileModel,
        filter: (query) => query.select(userProfile_model_1.UserProfileModel.relationWhitelist),
        join: {
            from: 'posts.creatorId',
            to: 'userProfiles.userId',
        },
    },
    gym: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: gym_model_1.GymModel,
        filter: (query) => query.select('id', 'name', 'shortName', 'permanentlyClosed'),
        join: {
            from: 'posts.gymId',
            to: 'gyms.id',
        },
    },
});
//# sourceMappingURL=post.model.js.map