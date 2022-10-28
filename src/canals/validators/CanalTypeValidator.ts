import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CanalTypeValidator implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    return value === 1 || value === 2 || value === 3; // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Invalid canal type';
  }
}
