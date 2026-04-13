import { TransformFnParams } from 'class-transformer';

export const toInt = ({ value }: TransformFnParams): unknown => {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new Error(`Value "${value}" is not a valid integer`);
    }
    return parsed;
  }

  return value;
};
