import { Document } from 'mongoose';

export interface Upload extends Document {
  readonly name: string;
  readonly fi: object;
  readonly thickness: number;
  readonly date_created: string;
}