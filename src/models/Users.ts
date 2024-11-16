// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import { COLLECTION_NAME } from '../lib/mongodb';

export interface IUser extends Document {
  userid: number;
  userWalletAddress: string;
  profilePic: string;
  personalLink: string;
}

const UserSchema: Schema = new Schema({
  userid: { type: Number, required: true },
  userWalletAddress: { type: String, required: true },
  profilePic: { type: String, required: true },
  personalLink: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema, COLLECTION_NAME);

export default User;
