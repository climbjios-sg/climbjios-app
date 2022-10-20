import { ClassConstructor } from 'class-transformer';
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare const DateIsAfter: <T>(type: ClassConstructor<T>, property: (o: T) => any, validationOptions?: ValidationOptions) => (object: any, propertyName: string) => void;
export declare class DateIsAfterConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
