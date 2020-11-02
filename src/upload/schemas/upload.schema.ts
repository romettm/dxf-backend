import * as mongoose from 'mongoose';

export const uploadSchema = new mongoose.Schema({
  name: String,
  fi: Object,
  thickness: Number,
  date_created: String,
});