import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const DateIsAfterNow = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: DateIsAfterNowConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'DateIsAfterNow' })
export class DateIsAfterNowConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return new Date(value) > new Date();
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be after now!`;
  }
}
