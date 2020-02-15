import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  passwordUpdated: Date,
  updated: Date,
  created: Date,
});
