"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base.model");
const userProfile_model_1 = require("./userProfile.model");
class UserModel extends base_model_1.BaseModel {
}
exports.UserModel = UserModel;
UserModel.tableName = 'users';
UserModel.relationMappings = () => ({
    userProfile: {
        relation: objection_1.Model.HasOneRelation,
        modelClass: userProfile_model_1.UserProfileModel,
        join: {
            from: 'users.id',
            to: 'userProfiles.userId',
        },
    },
});
//# sourceMappingURL=user.model.js.map