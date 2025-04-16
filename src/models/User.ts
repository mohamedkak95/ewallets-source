import mongoose, { Schema, Document } from 'mongoose';

// تعريف واجهة المستخدم
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  preferences: {
    favoriteWallets: mongoose.Types.ObjectId[];
    favoriteServices: mongoose.Types.ObjectId[];
  };
  history: {
    action: string;
    itemId: mongoose.Types.ObjectId;
    itemType: string;
    date: Date;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// إنشاء مخطط المستخدم
const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    preferences: {
      favoriteWallets: [{ type: Schema.Types.ObjectId, ref: 'EWallet' }],
      favoriteServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    },
    history: [
      {
        action: { type: String },
        itemId: { type: Schema.Types.ObjectId },
        itemType: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// إنشاء وتصدير نموذج المستخدم
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
