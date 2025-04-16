import mongoose, { Schema, Document } from 'mongoose';

// تعريف واجهة التوصية
export interface IRecommendation extends Document {
  userId: mongoose.Types.ObjectId | null;
  sessionId: string;
  userPreferences: {
    usageType: string;
    transactionVolume: string;
    priorityFeatures: string[];
    priorityServices: string[];
  };
  recommendedItems: {
    itemId: mongoose.Types.ObjectId;
    itemType: string;
    score: number;
    reasons: string[];
  }[];
  date: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// إنشاء مخطط التوصية
const RecommendationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null, index: true },
    sessionId: { type: String, index: true },
    userPreferences: {
      usageType: { type: String },
      transactionVolume: { type: String },
      priorityFeatures: [{ type: String }],
      priorityServices: [{ type: String }],
    },
    recommendedItems: [
      {
        itemId: { type: Schema.Types.ObjectId, required: true },
        itemType: { type: String, required: true },
        score: { type: Number, required: true },
        reasons: [{ type: String }],
      },
    ],
    date: { type: Date, default: Date.now, index: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// إنشاء وتصدير نموذج التوصية
export default mongoose.models.Recommendation || mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);
