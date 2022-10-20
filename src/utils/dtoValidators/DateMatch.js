"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateMatchConstraint = exports.DateMatch = void 0;
const class_validator_1 = require("class-validator");
const DateMatch = (type, property, trueIfPropertyIsUndefined, validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property, trueIfPropertyIsUndefined],
            validator: DateMatchConstraint,
        });
    };
};
exports.DateMatch = DateMatch;
let DateMatchConstraint = class DateMatchConstraint {
    validate(value, args) {
        const [fn, trueIfPropertyIsUndefined] = args.constraints;
        const other = fn(args.object);
        if (trueIfPropertyIsUndefined && other === undefined) {
            return true;
        }
        return new Date(other).toDateString() === new Date(value).toDateString();
    }
    defaultMessage(args) {
        const [constraintProperty] = args.constraints;
        return `${constraintProperty} and ${args.property} do not fall on the same day!`;
    }
};
DateMatchConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'DateMatch' })
], DateMatchConstraint);
exports.DateMatchConstraint = DateMatchConstraint;
//# sourceMappingURL=DateMatch.js.map