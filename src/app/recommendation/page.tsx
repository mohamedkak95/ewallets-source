'use client';

import { useState } from 'react';
import Link from 'next/link';

// مكون بطاقة المحفظة الموصى بها
const RecommendedWalletCard = ({ wallet, score, reasons }: { 
  wallet: { 
    id: string; 
    name: string; 
    bank: string; 
    logo: string; 
  }; 
  score: number;
  reasons: string[];
}) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
    <div className="flex items-center mb-4">
      <div className={`w-16 h-16 rounded-lg bg-${wallet.logo === 'VC' ? 'red' : wallet.logo === 'BM' ? 'blue' : 'green'}-100 flex items-center justify-center ml-4`}>
        <span className={`text-${wallet.logo === 'VC' ? 'red' : wallet.logo === 'BM' ? 'blue' : 'green'}-600 text-2xl font-bold`}>{wallet.logo}</span>
      </div>
      <div>
        <h3 className="text-xl font-bold">{wallet.name}</h3>
        <p className="text-gray-600">{wallet.bank}</p>
      </div>
    </div>
    
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${score}%` }}></div>
        </div>
        <span className="text-sm font-medium text-gray-700">{score}%</span>
      </div>
      <p className="text-sm text-gray-500">درجة التوافق مع احتياجاتك</p>
    </div>
    
    <div className="mb-4">
      <h4 className="font-medium mb-2">لماذا نوصي بهذه المحفظة:</h4>
      <ul className="text-sm text-gray-700 space-y-1 mr-5 list-disc">
        {reasons.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
    
    <div className="flex justify-between">
      <Link 
        href={`/wallets/${wallet.id}`}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        عرض التفاصيل
      </Link>
      <Link 
        href={`/how-to-subscribe/${wallet.id}`}
        className="text-green-600 hover:text-green-800 text-sm font-medium"
      >
        كيفية الاشتراك
      </Link>
    </div>
  </div>
);

export default function RecommendationSystem() {
  // حالة الاستبيان
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    usageType: '',
    transactionVolume: '',
    priorityFeatures: [] as string[],
    priorityServices: [] as string[],
  });
  
  // حالة النتائج
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  // بيانات الاستبيان
  const usageTypes = [
    { id: 'personal', label: 'استخدام شخصي', description: 'للمعاملات اليومية والمشتريات الشخصية' },
    { id: 'business', label: 'استخدام تجاري', description: 'لإدارة المدفوعات والمعاملات التجارية' },
    { id: 'savings', label: 'ادخار', description: 'للادخار وتنمية الأموال' },
    { id: 'transfers', label: 'تحويلات', description: 'لإرسال واستقبال الأموال بشكل متكرر' },
  ];
  
  const transactionVolumes = [
    { id: 'low', label: 'منخفض', description: 'أقل من 5,000 جنيه شهرياً' },
    { id: 'medium', label: 'متوسط', description: 'بين 5,000 و 20,000 جنيه شهرياً' },
    { id: 'high', label: 'مرتفع', description: 'أكثر من 20,000 جنيه شهرياً' },
  ];
  
  const features = [
    { id: 'low_fees', label: 'رسوم منخفضة' },
    { id: 'high_limits', label: 'حدود تحويل عالية' },
    { id: 'security', label: 'أمان عالي' },
    { id: 'ease_of_use', label: 'سهولة الاستخدام' },
    { id: 'customer_service', label: 'خدمة عملاء متميزة' },
    { id: 'rewards', label: 'مكافآت وعروض' },
    { id: 'wide_acceptance', label: 'قبول واسع لدى التجار' },
    { id: 'international', label: 'إمكانية الاستخدام الدولي' },
  ];
  
  const services = [
    { id: 'bill_payment', label: 'دفع الفواتير' },
    { id: 'online_shopping', label: 'التسوق عبر الإنترنت' },
    { id: 'money_transfer', label: 'تحويل الأموال' },
    { id: 'mobile_recharge', label: 'شحن رصيد الهاتف' },
    { id: 'atm_withdrawal', label: 'السحب من أجهزة الصراف الآلي' },
    { id: 'merchant_payments', label: 'الدفع للتجار' },
    { id: 'subscriptions', label: 'الاشتراكات الدورية' },
    { id: 'savings', label: 'خدمات الادخار' },
  ];
  
  // وظائف التعامل مع النموذج
  const handleUsageTypeChange = (usageType: string) => {
    setFormData({ ...formData, usageType });
  };
  
  const handleTransactionVolumeChange = (transactionVolume: string) => {
    setFormData({ ...formData, transactionVolume });
  };
  
  const handleFeatureToggle = (featureId: string) => {
    const currentFeatures = [...formData.priorityFeatures];
    if (currentFeatures.includes(featureId)) {
      setFormData({
        ...formData,
        priorityFeatures: currentFeatures.filter(id => id !== featureId)
      });
    } else {
      if (currentFeatures.length < 3) {
        setFormData({
          ...formData,
          priorityFeatures: [...currentFeatures, featureId]
        });
      }
    }
  };
  
  const handleServiceToggle = (serviceId: string) => {
    const currentServices = [...formData.priorityServices];
    if (currentServices.includes(serviceId)) {
      setFormData({
        ...formData,
        priorityServices: currentServices.filter(id => id !== serviceId)
      });
    } else {
      if (currentServices.length < 3) {
        setFormData({
          ...formData,
          priorityServices: [...currentServices, serviceId]
        });
      }
    }
  };
  
  // وظيفة التقدم للخطوة التالية
  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  // وظيفة الرجوع للخطوة السابقة
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // وظيفة إرسال النموذج والحصول على التوصيات
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // محاكاة طلب API للحصول على التوصيات
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // بيانات وهمية للتوصيات (في الإنتاج، ستأتي من API)
      const mockRecommendations = [
        {
          wallet: {
            id: 'vodafone-cash',
            name: 'فودافون كاش',
            bank: 'بنك الإسكندرية',
            logo: 'VC',
          },
          score: 95,
          reasons: [
            'رسوم تحويل منخفضة',
            'قبول واسع لدى التجار',
            'سهولة الاستخدام والوصول',
            'خدمة دفع الفواتير متاحة'
          ]
        },
        {
          wallet: {
            id: 'bm-wallet',
            name: 'محفظة بنك مصر',
            bank: 'بنك مصر',
            logo: 'BM',
          },
          score: 88,
          reasons: [
            'حدود تحويل عالية',
            'أمان عالي',
            'خدمة عملاء متميزة'
          ]
        },
        {
          wallet: {
            id: 'nbe-phone-cash',
            name: 'فون كاش',
            bank: 'البنك الأهلي المصري',
            logo: 'NBE',
          },
          score: 82,
          reasons: [
            'خدمات ادخار متميزة',
            'شبكة صراف آلي واسعة',
            'عروض ومكافآت متنوعة'
          ]
        }
      ];
      
      setRecommendations(mockRecommendations);
      setShowResults(true);
    } catch (error) {
      console.error('خطأ في الحصول على التوصيات:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // وظيفة إعادة تعيين النموذج
  const handleReset = () => {
    setFormData({
      usageType: '',
      transactionVolume: '',
      priorityFeatures: [],
      priorityServices: [],
    });
    setStep(1);
    setShowResults(false);
  };
  
  // عرض نتائج التوصيات
  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">توصياتنا لك</h1>
          <p className="text-gray-600">بناءً على احتياجاتك وتفضيلاتك، نوصي بالمحافظ الإلكترونية التالية</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recommendations.map((recommendation, index) => (
            <RecommendedWalletCard
              key={index}
              wallet={recommendation.wallet}
              score={recommendation.score}
              reasons={recommendation.reasons}
            />
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            بدء استبيان جديد
          </button>
        </div>
        
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">هل تريد مقارنة هذه المحافظ؟</h2>
          <p className="mb-4">يمكنك مقارنة المحافظ الموصى بها جنباً إلى جنب لاتخاذ قرار أفضل.</p>
          <Link
            href={`/comparison?wallets=${recommendations.map(r => r.wallet.id).join(',')}`}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-block"
          >
            مقارنة المحافظ الموصى بها
          </Link>
        </div>
      </div>
    );
  }
  
  // عرض الاستبيان
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">اختر المحفظة الإلكترونية المناسبة لك</h1>
        <p className="text-gray-600">أجب على بعض الأسئلة لمساعدتنا في اقتراح أفضل محفظة إلكترونية تناسب احتياجاتك</p>
      </div>
      
      {/* شريط التقدم */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNumber === step
                  ? 'bg-blue-600 text-white'
                  : stepNumber < step
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {stepNumber < step ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                stepNumber
              )}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* الخطوة 1: نوع الاستخدام */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">ما هو الغرض الرئيسي من استخدامك للمحفظة الإلكترونية؟</h2>
            <p className="text-gray-600 mb-6">اختر نوع الاستخدام الذي يناسبك أكثر</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {usageTypes.map((type) => (
                <div
                  key={type.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.usageType === type.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => handleUsageTypeChange(type.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        formData.usageType === type.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      } flex items-center justify-center ml-3`}
                    >
                      {formData.usageType === type.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{type.label}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* الخطوة 2: حجم المعاملات */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">ما هو متوسط حجم معاملاتك الشهرية؟</h2>
            <p className="text-gray-600 mb-6">اختر حجم المعاملات الذي يناسب استخدامك</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {transactionVolumes.map((volume) => (
                <div
                  key={volume.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.transactionVolume === volume.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => handleTransactionVolumeChange(volume.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        formData.transactionVolume === volume.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      } flex items-center justify-center ml-3`}
                    >
                      {formData.transactionVolume === volume.id && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{volume.label}</h3>
                      <p className="text-sm text-gray-600">{volume.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* الخطوة 3: الميزات ذات الأولوية */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-4">ما هي أهم الميزات بالنسبة لك؟</h2>
            <p className="text-gray-600 mb-6">اختر حتى 3 ميزات تعتبرها الأكثر أهمية</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    formData.priorityFeatures.includes(feature.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => handleFeatureToggle(feature.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded border ${
                        formData.priorityFeatures.includes(feature.id)
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300'
                      } flex items-center justify-center ml-3`}
                    >
                      {formData.priorityFeatures.includes(feature.id) && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{feature.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {formData.priorityFeatures.length === 3 && (
              <p className="text-sm text-blue-600">لقد اخترت الحد الأقصى من الميزات (3)</p>
            )}
          </div>
        )}
        
        {/* الخطوة 4: الخدمات المطلوبة */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4">ما هي الخدمات التي تحتاجها؟</h2>
            <p className="text-gray-600 mb-6">اختر حتى 3 خدمات تعتبرها ضرورية</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    formData.priorityServices.includes(service.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded border ${
                        formData.priorityServices.includes(service.id)
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300'
                      } flex items-center justify-center ml-3`}
                    >
                      {formData.priorityServices.includes(service.id) && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{service.label}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {formData.priorityServices.length === 3 && (
              <p className="text-sm text-blue-600">لقد اخترت الحد الأقصى من الخدمات (3)</p>
            )}
          </div>
        )}
        
        {/* أزرار التنقل */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevStep}
            className={`px-4 py-2 border border-gray-300 rounded-md ${
              step === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
            disabled={step === 1}
          >
            السابق
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={
              (step === 1 && !formData.usageType) ||
              (step === 2 && !formData.transactionVolume) ||
              (step === 3 && formData.priorityFeatures.length === 0) ||
              (step === 4 && formData.priorityServices.length === 0) ||
              isLoading
            }
            className={`px-4 py-2 bg-blue-600 text-white rounded-md ${
              ((step === 1 && !formData.usageType) ||
              (step === 2 && !formData.transactionVolume) ||
              (step === 3 && formData.priorityFeatures.length === 0) ||
              (step === 4 && formData.priorityServices.length === 0) ||
              isLoading)
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التحميل...
              </div>
            ) : step < 4 ? (
              'التالي'
            ) : (
              'الحصول على التوصيات'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
