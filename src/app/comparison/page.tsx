"use client";
import Link from 'next/link';
import { useState } from 'react';

// تعريف نوع البيانات للمحفظة
type Wallet = {
  id: string;
  name: string;
  bank: string;
  logo: string;
  maxBalance: string;
  dailyLimit: string;
  transferFee: string;
  withdrawalFee: string;
  features: string[];
};

// بيانات المحافظ للمقارنة (ستأتي من قاعدة البيانات لاحقاً)
const wallets: Wallet[] = [
  {
    id: 'vodafone-cash',
    name: 'فودافون كاش',
    bank: 'بنك الإسكندرية',
    logo: 'VC',
    maxBalance: 'غير محدد',
    dailyLimit: '50,000 ج.م',
    transferFee: '1 ج.م',
    withdrawalFee: '1% (حد أدنى 3 ج.م)',
    features: ['تحويل الأموال', 'دفع الفواتير', 'شحن رصيد الموبايل', 'السحب والإيداع النقدي', 'الدفع للتجار']
  },
  {
    id: 'bm-wallet',
    name: 'محفظة بنك مصر',
    bank: 'بنك مصر',
    logo: 'BM',
    maxBalance: '200,000 ج.م',
    dailyLimit: '60,000 ج.م',
    transferFee: '1 ج.م',
    withdrawalFee: '1% (حد أدنى 3 ج.م)',
    features: ['تحويل الأموال', 'دفع الفواتير', 'شحن رصيد الموبايل', 'السحب والإيداع النقدي', 'الدفع للتجار', 'شحن كارت الكهرباء باستخدام NFC']
  },
  {
    id: 'nbe-phone-cash',
    name: 'فون كاش',
    bank: 'البنك الأهلي المصري',
    logo: 'NBE',
    maxBalance: '100,000 ج.م',
    dailyLimit: '60,000 ج.م',
    transferFee: '1 ج.م',
    withdrawalFee: '1% (حد أدنى 2 ج.م)',
    features: ['تحويل الأموال', 'دفع الفواتير', 'شحن رصيد الموبايل', 'السحب والإيداع النقدي', 'الدفع للتجار']
  },
  {
    id: 'qnb-wallet',
    name: 'محفظة QNB',
    bank: 'بنك قطر الوطني',
    logo: 'QNB',
    maxBalance: '100,000 ج.م',
    dailyLimit: '50,000 ج.م',
    transferFee: '1 ج.م',
    withdrawalFee: '1% (حد أدنى 3 ج.م)',
    features: ['تحويل الأموال', 'دفع الفواتير', 'شحن رصيد الموبايل', 'السحب والإيداع النقدي']
  },
  {
    id: 'cairo-cash',
    name: 'القاهرة كاش',
    bank: 'بنك القاهرة',
    logo: 'CC',
    maxBalance: '200,000 ج.م',
    dailyLimit: '60,000 ج.م',
    transferFee: '1 ج.م',
    withdrawalFee: '1% (حد أدنى 3 ج.م)',
    features: ['تحويل الأموال', 'دفع الفواتير', 'شحن رصيد الموبايل', 'السحب والإيداع النقدي', 'الدفع للتجار']
  }
];

// معايير المقارنة
const comparisonCriteria = [
  { id: 'maxBalance', label: 'الحد الأقصى للرصيد' },
  { id: 'dailyLimit', label: 'الحد اليومي للمعاملات' },
  { id: 'transferFee', label: 'رسوم التحويل' },
  { id: 'withdrawalFee', label: 'رسوم السحب' },
  { id: 'features', label: 'الميزات المتاحة' }
];

export default function ComparisonPage() {
  // حالة المحافظ المختارة للمقارنة
  const [selectedWallets, setSelectedWallets] = useState<string[]>(['vodafone-cash', 'bm-wallet', 'nbe-phone-cash']);

  // تغيير حالة اختيار المحفظة
  const toggleWallet = (walletId: string) => {
    if (selectedWallets.includes(walletId)) {
      setSelectedWallets(selectedWallets.filter(id => id !== walletId));
    } else {
      setSelectedWallets([...selectedWallets, walletId]);
    }
  };

  // الحصول على المحافظ المختارة
  const getSelectedWalletsData = () => {
    return wallets.filter(wallet => selectedWallets.includes(wallet.id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">مقارنة المحافظ الإلكترونية</h1>
      
      {/* قسم اختيار المحافظ */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">اختر المحافظ للمقارنة</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {wallets.map(wallet => (
            <div 
              key={wallet.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedWallets.includes(wallet.id) 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => toggleWallet(wallet.id)}
            >
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  selectedWallets.includes(wallet.id) ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}>
                  <span className="font-bold">{wallet.logo}</span>
                </div>
                <h3 className="font-semibold text-center">{wallet.name}</h3>
                <p className="text-xs text-gray-500 text-center">{wallet.bank}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* جدول المقارنة */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">جدول المقارنة</h2>
        
        {selectedWallets.length === 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <p className="text-yellow-700">الرجاء اختيار محفظة واحدة على الأقل للمقارنة</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-right">معيار المقارنة</th>
                  {getSelectedWalletsData().map(wallet => (
                    <th key={wallet.id} className="border p-3 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                          <span className="font-bold">{wallet.logo}</span>
                        </div>
                        <span>{wallet.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonCriteria.map(criterion => (
                  <tr key={criterion.id} className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">{criterion.label}</td>
                    {getSelectedWalletsData().map(wallet => (
                      <td key={`${wallet.id}-${criterion.id}`} className="border p-3 text-center">
                        {criterion.id === 'features' ? (
                          <ul className="list-disc list-inside text-right">
                            {(wallet[criterion.id as keyof Wallet] as string[]).map((feature, index) => (
                              <li key={index} className="mb-1">{feature}</li>
                            ))}
                          </ul>
                        ) : (
                          wallet[criterion.id as keyof Wallet]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="border p-3 font-semibold">كيفية الاشتراك</td>
                  {getSelectedWalletsData().map(wallet => (
                    <td key={`${wallet.id}-subscription`} className="border p-3 text-center">
                      <Link 
                        href={`/how-to-subscribe/${wallet.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg inline-block transition-colors"
                      >
                        عرض الخطوات
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>
      
      {/* قسم التوصيات */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">احصل على توصية شخصية</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <p className="mb-4">أجب على بعض الأسئلة البسيطة للحصول على توصية بأفضل محفظة إلكترونية تناسب احتياجاتك</p>
          <Link 
            href="/recommendation"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block transition-colors"
          >
            ابدأ الآن
          </Link>
        </div>
      </section>
      
      {/* قسم الأسئلة الشائعة */}
      <section>
        <h2 className="text-xl font-bold mb-4">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">ما هي المحفظة الإلكترونية؟</h3>
            <p className="text-gray-700">
              المحفظة الإلكترونية هي خدمة تتيح لك إجراء المعاملات المالية من خلال هاتفك المحمول، مثل تحويل الأموال ودفع الفواتير وشحن رصيد الموبايل والسحب والإيداع النقدي.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">كيف يمكنني الاشتراك في محفظة إلكترونية؟</h3>
            <p className="text-gray-700">
              يمكنك الاشتراك في محفظة إلكترونية من خلال زيارة أقرب فرع للبنك المقدم للخدمة أو من خلال وكلاء البنوك أو مشغلي شبكات الهاتف المحمول. ستحتاج إلى بطاقة الرقم القومي السارية ورقم هاتف محمول مسجل باسمك.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">ما هو الحد الأقصى للمعاملات اليومية؟</h3>
            <p className="text-gray-700">
              يختلف الحد الأقصى للمعاملات اليومية من محفظة لأخرى، ولكنه يتراوح عادة بين 30,000 و60,000 جنيه مصري. يمكنك الاطلاع على الحدود الخاصة بكل محفظة في جدول المقارنة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
