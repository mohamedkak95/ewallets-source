import mongoose, { Schema, Document } from 'mongoose';

// تعريف واجهة الخدمة
export interface IService extends Document {
  name: string;
  icon: string;
  category: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// إنشاء مخطط الخدمة
const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    icon: { type: String },
    category: { type: String, index: true },
    description: { type: String },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// إنشاء وتصدير نموذج الخدمة
export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
