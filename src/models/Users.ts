import mongoose, { Schema, Document } from 'mongoose';

const DATABASE_NAME = 'ronx';  // Change this to your actual database name
const COLLECTION_NAME = 'users';  // Name of the collection

interface IUser extends Document {
  userid: number;
  userWalletAddress: string;
  profilePic: string;
  personalLink: string;
  username: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    userid: { type: Number, required: true },
    userWalletAddress: { type: String, required: true },
    profilePic: { type: String, required: true },
    personalLink: { type: String, required: true },
    username: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Connect to the MongoDB server with the specific database
mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the model only if it hasn't already been created
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema, COLLECTION_NAME);

export default User;
