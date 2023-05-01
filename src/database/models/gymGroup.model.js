"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymGroupModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base.model");
const gym_model_1 = require("./gym.model");
class GymGroupModel extends base_model_1.BaseModel {
}
exports.GymGroupModel = GymGroupModel;
GymGroupModel.tableName = 'gymGroups';
GymGroupModel.relationMappings = () => ({
    gymOutlets: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: gym_model_1.GymModel,
        filter: (query) => query.select('id', 'name', 'address', 'iconURL'),
        join: {
            from: 'gymGroups.id',
            to: 'gyms.gymGroupId',
        },
    },
});
//# sourceMappingURL=gymGroup.model.js.map