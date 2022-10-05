import { ClassConstructor } from 'class-transformer';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const DateMatch = <T>(
  type: ClassConstructor<T>,
  property: (o: T) => any,
  trueIfPropertyIsUndefined?: boolean,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property, trueIfPropertyIsUndefined],
      validator: DateMatchConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'DateMatch' })
export class DateMatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [fn, trueIfPropertyIsUndefined] = args.constraints;

    const other = fn(args.object);
    if (trueIfPropertyIsUndefined && other === undefined) {
      return true;
    }

    return new Date(other).toDateString() === new Date(value).toDateString();
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: (() => any)[] = args.constraints;
    return `${constraintProperty} and ${args.property} do not fall on the same day!`;
  }
}
