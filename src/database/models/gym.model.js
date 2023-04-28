"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymModel = void 0;
const AWS = require("aws-sdk");
const objection_1 = require("objection");
const types_1 = require("../../utils/types");
const base_model_1 = require("./base.model");
const gymGroup_model_1 = require("./gymGroup.model");
const gymPass_model_1 = require("./gymPass.model");
class GymModel extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.$afterFind = (context) => {
            const result = super.$afterFind(context);
            if (!context.getUrls) {
                return;
            }
            this.bannerUrl = GymModel.s3Instance.getSignedUrl('getObject', {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `gyms/${this.id}/banner/${types_1.S3UploadType.BANNER_PICTURE}`,
                Expires: 60,
            });
            this.iconUrl = GymModel.s3Instance.getSignedUrl('getObject', {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: `gyms/${this.id}/icon/${types_1.S3UploadType.ICON_PICTURE}`,
                Expires: 60,
            });
            return result;
        };
    }
}
exports.GymModel = GymModel;
GymModel.tableName = 'gyms';
GymModel.s3Instance = new AWS.S3();
GymModel.relationMappings = () => ({
    gymGroup: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: gymGroup_model_1.GymGroupModel,
        filter: (query) => query.select('*'),
        join: {
            from: 'gymGroups.id',
            to: 'gyms.gymGroupId',
        },
    },
    passGroup: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: gymPass_model_1.PassModel,
        filter: (query) => query.select('*'),
        join: {
            from: 'pass_groups.passGroupId',
            to: 'gyms.passGroupId',
        },
    },
});
//# sourceMappingURL=gym.model.js.map