"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base.model");
const boulderingGrade_model_1 = require("./boulderingGrade.model");
const pronoun_model_1 = require("./pronoun.model");
const gym_model_1 = require("./gym.model");
const leadClimbingGrade_model_1 = require("./leadClimbingGrade.model");
const sncsCertification_model_1 = require("./sncsCertification.model");
const topRopeGrade_model_1 = require("./topRopeGrade.model");
const AWS = require("aws-sdk");
const types_1 = require("../../utils/types");
AWS.config.update({ region: process.env.AWS_REGION });
class UserProfileModel extends base_model_1.BaseModel {
    constructor() {
        super(...arguments);
        this.$afterFind = (context) => {
            const result = super.$afterFind(context);
            if (this.hasProfilePicture) {
                this.profilePictureUrl = UserProfileModel.s3Instance.getSignedUrl('getObject', {
                    Bucket: process.env.AWS_S3_BUCKET_NAME,
                    Key: `${this.userId}/${types_1.S3UploadType.PROFILE_PICTURE}`,
                    Expires: 60,
                });
            }
            return result;
        };
    }
}
exports.UserProfileModel = UserProfileModel;
UserProfileModel.tableName = 'userProfiles';
UserProfileModel.s3Instance = new AWS.S3();
UserProfileModel.relationWhitelist = [
    'userId',
    'name',
    'telegramHandle',
    'bio',
    'height',
    'reach',
    'hasProfilePicture',
];
UserProfileModel.relationMappings = () => ({
    pronoun: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: pronoun_model_1.PronounModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'userProfiles.pronounId',
            to: 'pronouns.id',
        },
    },
    highestBoulderingGrade: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: boulderingGrade_model_1.BoulderingGradeModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'userProfiles.highestBoulderingGradeId',
            to: 'boulderingGrades.id',
        },
    },
    highestTopRopeGrade: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: topRopeGrade_model_1.TopRopeGradeModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'userProfiles.highestTopRopeGradeId',
            to: 'topRopeGrades.id',
        },
    },
    highestLeadClimbingGrade: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: leadClimbingGrade_model_1.LeadClimbingGradeModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'userProfiles.highestLeadClimbingGradeId',
            to: 'leadClimbingGrades.id',
        },
    },
    sncsCertification: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: sncsCertification_model_1.SncsCertificationModel,
        filter: (query) => query.select('id', 'name'),
        join: {
            from: 'userProfiles.sncsCertificationId',
            to: 'sncsCertifications.id',
        },
    },
    favouriteGyms: {
        relation: objection_1.Model.ManyToManyRelation,
        modelClass: gym_model_1.GymModel,
        filter: (query) => query.select('id', 'name', 'shortName', 'permanentlyClosed'),
        join: {
            from: 'userProfiles.id',
            through: {
                from: 'userProfileFavouriteGyms.userProfileId',
                to: 'userProfileFavouriteGyms.gymId',
            },
            to: 'gyms.id',
        },
    },
});
//# sourceMappingURL=userProfile.model.js.map