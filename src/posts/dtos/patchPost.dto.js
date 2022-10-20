"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const types_1 = require("../../utils/types");
const DateIsAfterNow_1 = require("../../utils/dtoValidators/DateIsAfterNow");
const DateMatch_1 = require("../../utils/dtoValidators/DateMatch");
class PatchPostDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(types_1.PostType)),
    __metadata("design:type", String)
], PatchPostDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PatchPostDto.prototype, "numPasses", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PatchPostDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PatchPostDto.prototype, "gymId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, DateIsAfterNow_1.DateIsAfterNow)(),
    (0, DateMatch_1.DateMatch)(PatchPostDto, (dto) => dto.endDateTime, true),
    __metadata("design:type", Date)
], PatchPostDto.prototype, "startDateTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, DateIsAfterNow_1.DateIsAfterNow)(),
    (0, DateMatch_1.DateMatch)(PatchPostDto, (dto) => dto.startDateTime, true),
    __metadata("design:type", Date)
], PatchPostDto.prototype, "endDateTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PatchPostDto.prototype, "openToClimbTogether", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatchPostDto.prototype, "optionalNote", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PatchPostDto.prototype, "isClosed", void 0);
exports.default = PatchPostDto;
//# sourceMappingURL=patchPost.dto.js.map