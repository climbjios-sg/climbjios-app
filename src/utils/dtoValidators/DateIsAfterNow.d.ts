import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare const DateIsAfterNow: (validationOptions?: ValidationOptions) => (object: any, propertyName: string) => void;
export declare class DateIsAfterNowConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
