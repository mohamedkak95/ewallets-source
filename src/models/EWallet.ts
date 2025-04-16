import mongoose, { Schema, Document } from 'mongoose';

// تعريف واجهة المحفظة الإلكترونية
export interface IEWallet extends Document {
  name: string;
  tradeName: string;
  logo: string;
  bankId: mongoose.Types.ObjectId;
  providerType: string;
  description: string;
  features: string[];
  limits: {
    maxBalance: number;
    dailyLimit: number;
    monthlyLimit: number;
    perTransactionLimit: number;
  };
  fees: {
    registration: number;
    annual: number;
    deposit: {
      atm: {
        sameBank: {
          percentage: number;
          minAmount: number;
          maxAmount: number;
        };
        otherBanks: {
          percentage: number;
          minAmount: number;
          maxAmount: number;
        };
      };
      branches: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
      };
      agents: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
      };
    };
    withdrawal: {
      atm: {
        sameBank: {
          percentage: number;
          minAmount: number;
          maxAmount: number;
        };
        otherBanks: {
          percentage: number;
          minAmount: number;
          maxAmount: number;
        };
      };
      branches: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
      };
      agents: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
      };
    };
    transfer: {
      sameWallet: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
        fixedAmount: number;
      };
      otherWallets: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
        fixedAmount: number;
      };
      bankAccounts: {
        percentage: number;
        minAmount: number;
        maxAmount: number;
        fixedAmount: number;
      };
    };
    billPayment: {
      percentage: number;
      minAmount: number;
      maxAmount: number;
      fixedAmount: number;
    };
    mobileRecharge: {
      percentage: number;
      minAmount: number;
      maxAmount: number;
      fixedAmount: number;
    };
  };
  services: {
    serviceId: mongoose.Types.ObjectId;
    isAvailable: boolean;
    additionalFee: number;
  }[];
  requirements: string[];
  registrationSteps: string[];
  appLinks: {
    android: string;
    ios: string;
    huawei: string;
  };
  contactInfo: {
    website: string;
    phone: string;
    email: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
  };
  ratings: {
    overall: number;
    userExperience: number;
    fees: number;
    customerService: number;
    features: number;
  };
  reviews: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    date: Date;
  }[];
  affiliateLink: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// إنشاء مخطط المحفظة الإلكترونية
const EWalletSchema: Schema = new Schema(
  {
    name: { type: String, required: true, index: true },
    tradeName: { type: String },
    logo: { type: String },
    bankId: { type: Schema.Types.ObjectId, ref: 'Bank', required: true, index: true },
    providerType: { type: String },
    description: { type: String },
    features: [{ type: String }],
    limits: {
      maxBalance: { type: Number },
      dailyLimit: { type: Number },
      monthlyLimit: { type: Number },
      perTransactionLimit: { type: Number },
    },
    fees: {
      registration: { type: Number, default: 0 },
      annual: { type: Number, default: 0 },
      deposit: {
        atm: {
          sameBank: {
            percentage: { type: Number, default: 0 },
            minAmount: { type: Number, default: 0 },
            maxAmount: { type: Number, default: 0 },
          },
          otherBanks: {
            percentage: { type: Number, default: 0 },
            minAmount: { type: Number, default: 0 },
            maxAmount: { type: Number, default: 0 },
          },
        },
        branches: {
          percentage: { type: Number, default: 0 },
          minAmount: { type: Number, default: 0 },
          maxAmount: { type: Number, default: 0 },
        },
        agents: {
          percentage: { type: Number, default: 0 },
          minAmount: { type: Number, default: 0 },
          maxAmount: { type: Number, default: 0 },
        },
      },
      withdrawal: {
        atm: {
          sameBank: {
            percentage: { type: Number, default: 0 },
            minAmount: { type: Number, default: 0 },
            maxAmount: { type: Number, default: 0 },
          },
          otherBanks: {
            percentage: { type: Number, default: 0 },
            minAmount: { type: Number, default: 0 },
            maxAmount: { type: Number, default: 0 },
          },
        },
        branches: {
          percentage: { type: Number, default: 0 },
          minAmount: { type: Number, default: 0 },
          maxAmount: { type: Number, default: 0 },
        },
        agents: {
          percentage: { type: Number, default: 0 },
          minAmount: { type: Number, default: 0 },
          maxAmount: { type: Number, default: 0 },
        },
      },
      transfer: {
        sameWallet: {
          percentage: { type: Number, default: 0 },
          minAmount: { type: Number, default: 0 },
          maxAmount: { type: Number, default: 0 },
          fixedAmount: { type: Number, default: 0 },
        },
        otherWallets: {
          percentage: { type: Number, default: 0 },
          minAmount: { type: Number, default: 0 },
          maxAmount: { type: Number, default: 0 },
          fixedAmount: { type: Number, default: 0 },
        },
        bankAccounts: {
          percentage: { type: Number, default: 0 },
          minAmount: { type: Number, default: 0 },
          maxAmount: { type: Number, default: 0 },
          fixedAmount: { type: Number, default: 0 },
        },
      },
      billPayment: {
        percentage: { type: Number, default: 0 },
        minAmount: { type: Number, default: 0 },
        maxAmount: { type: Number, default: 0 },
        fixedAmount: { type: Number, default: 0 },
      },
      mobileRecharge: {
        percentage: { type: Number, default: 0 },
        minAmount: { type: Number, default: 0 },
        maxAmount: { type: Number, default: 0 },
        fixedAmount: { type: Number, default: 0 },
      },
    },
    services: [
      {
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
        isAvailable: { type: Boolean, default: false },
        additionalFee: { type: Number, default: 0 },
      },
    ],
    requirements: [{ type: String }],
    registrationSteps: [{ type: String }],
    appLinks: {
      android: { type: String },
      ios: { type: String },
      huawei: { type: String },
    },
    contactInfo: {
      website: { type: String },
      phone: { type: String },
      email: { type: String },
      socialMedia: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
      },
    },
    ratings: {
      overall: { type: Number, default: 0 },
      userExperience: { type: Number, default: 0 },
      fees: { type: Number, default: 0 },
      customerService: { type: Number, default: 0 },
      features: { type: Number, default: 0 },
    },
    reviews: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true },
        comment: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    affiliateLink: { type: String },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// إنشاء وتصدير نموذج المحفظة الإلكترونية
export default mongoose.models.EWallet || mongoose.model<IEWallet>('EWallet', EWalletSchema);
