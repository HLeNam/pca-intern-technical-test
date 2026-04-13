import { TransformFnParams } from 'class-transformer';

export const trimString = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.trim() : value;

export const trimLowerString = ({ value }: TransformFnParams): unknown =>
  typeof value === 'string' ? value.toLowerCase().trim() : value;
