import mongoose, { Schema, Document } from 'mongoose';

// تعريف واجهة البنك
export interface IBank extends Document {
  name: string;
  logo: string;
  description: string;
  website: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// إنشاء مخطط البنك
const BankSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    logo: { type: String },
    description: { type: String },
    website: { type: String },
    contactInfo: {
      phone: { type: String },
      email: { type: String },
      address: { type: String },
    },
    socialMedia: {
      facebook: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// إنشاء وتصدير نموذج البنك
export default mongoose.models.Bank || mongoose.model<IBank>('Bank', BankSchema);
