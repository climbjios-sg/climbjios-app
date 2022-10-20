"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateIsAfterConstraint = exports.DateIsAfter = void 0;
const class_validator_1 = require("class-validator");
const DateIsAfter = (type, property, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: DateIsAfterConstraint,
        });
    };
};
exports.DateIsAfter = DateIsAfter;
let DateIsAfterConstraint = class DateIsAfterConstraint {
    validate(value, args) {
        const [fn] = args.constraints;
        return new Date(fn(args.object)) < new Date(value);
    }
    defaultMessage(args) {
        const [constraintProperty] = args.constraints;
        return `${args.property} should be after ${constraintProperty}!`;
    }
};
DateIsAfterConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'DateIsAfter' })
], DateIsAfterConstraint);
exports.DateIsAfterConstraint = DateIsAfterConstraint;
//# sourceMappingURL=DateIsAfter.js.map