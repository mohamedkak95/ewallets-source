import mongoose, { Schema, Document } from 'mongoose';

// تعريف واجهة المقارنة
export interface IComparison extends Document {
  userId: mongoose.Types.ObjectId | null;
  sessionId: string;
  items: {
    itemId: mongoose.Types.ObjectId;
    itemType: string;
  }[];
  criteria: string[];
  date: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// إنشاء مخطط المقارنة
const ComparisonSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
    sessionId: { type: String, index: true },
    items: [
      {
        itemId: { type: Schema.Types.ObjectId, required: true },
        itemType: { type: String, required: true },
      },
    ],
    criteria: [{ type: String }],
    date: { type: Date, default: Date.now, index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// إنشاء وتصدير نموذج المقارنة
export default mongoose.models.Comparison || mongoose.model<IComparison>('Comparison', ComparisonSchema);
