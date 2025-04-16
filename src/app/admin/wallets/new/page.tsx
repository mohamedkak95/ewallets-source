'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewWallet() {
  // حالة النموذج
  const [formData, setFormData] = useState({
    name: '',
    tradeName: '',
    bankId: '',
    providerType: 'bank',
    description: '',
    features: [''],
    limits: {
      maxBalance: 0,
      dailyLimit: 0,
      monthlyLimit: 0,
      perTransactionLimit: 0
    },
    fees: {
      registration: 0,
      annual: 0,
      transfer: {
        sameWallet: {
          percentage: 0,
          fixedAmount: 0
        },
        otherWallets: {
          percentage: 0,
          fixedAmount: 0
        }
      }
    },
    requirements: [''],
    registrationSteps: [''],
    appLinks: {
      android: '',
      ios: '',
      huawei: ''
    },
    contactInfo: {
      website: '',
      phone: '',
      email: ''
    },
    isActive: true
  });

  // بيانات وهمية للبنوك
  const banks = [
    { id: '1', name: 'بنك الإسكندرية' },
    { id: '2', name: 'بنك مصر' },
    { id: '3', name: 'البنك الأهلي المصري' },
    { id: '4', name: 'البنك التجاري الدولي' },
    { id: '5', name: 'بنك قطر الوطني الأهلي' },
  ];

  // وظيفة تحديث الحقول البسيطة
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // وظيفة تحديث الحقول المتداخلة
  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>, category: string, subcategory?: string, field?: string) => {
    const { name, value } = e.target;
    
    if (subcategory && field) {
      // تحديث حقل متداخل ثلاثي المستوى (مثل fees.transfer.sameWallet.percentage)
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [subcategory]: {
            ...prev[category as keyof typeof prev][subcategory as any],
            [field]: {
              ...prev[category as keyof typeof prev][subcategory as any][field as any],
              [name]: parseFloat(value)
            }
          }
        }
      }));
    } else if (subcategory) {
      // تحديث حقل متداخل ثنائي المستوى (مثل limits.maxBalance)
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [subcategory]: isNaN(parseFloat(value)) ? value : parseFloat(value)
        }
      }));
    }
  };

  // وظيفة تحديث المصفوفات
  const handleArrayChange = (index: number, value: string, field: string) => {
    setFormData(prev => {
      const newArray = [...prev[field as keyof typeof prev] as string[]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  // وظيفة إضافة عنصر جديد للمصفوفة
  const handleAddArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev] as string[], '']
    }));
  };

  // وظيفة حذف عنصر من المصفوفة
  const handleRemoveArrayItem = (index: number, field: string) => {
    setFormData(prev => {
      const newArray = [...prev[field as keyof typeof prev] as string[]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  // وظيفة إرسال النموذج
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('بيانات المحفظة المرسلة:', formData);
    // هنا سيتم إرسال البيانات إلى API
    alert('تم إضافة المحفظة بنجاح!');
    // إعادة التوجيه إلى صفحة المحافظ
    window.location.href = '/admin/wallets';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">إضافة محفظة إلكترونية جديدة</h1>
        <p className="text-gray-600">أدخل بيانات المحفظة الإلكترونية الجديدة</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* المعلومات الأساسية */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">المعلومات الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">اسم المحفظة <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="tradeName" className="block text-sm font-medium text-gray-700 mb-1">الاسم التجاري</label>
              <input
                type="text"
                id="tradeName"
                name="tradeName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.tradeName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="bankId" className="block text-sm font-medium text-gray-700 mb-1">البنك <span className="text-red-500">*</span></label>
              <select
                id="bankId"
                name="bankId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.bankId}
                onChange={handleChange}
              >
                <option value="">اختر البنك</option>
                {banks.map(bank => (
                  <option key={bank.id} value={bank.id}>{bank.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="providerType" className="block text-sm font-medium text-gray-700 mb-1">نوع المزود</label>
              <select
                id="providerType"
                name="providerType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.providerType}
                onChange={handleChange}
              >
                <option value="bank">بنك</option>
                <option value="telecom">شركة اتصالات</option>
                <option value="fintech">شركة تكنولوجيا مالية</option>
                <option value="other">أخرى</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">وصف المحفظة</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* الميزات */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">الميزات</h2>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={feature}
                onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                placeholder="أدخل ميزة"
              />
              <button
                type="button"
                className="mr-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                onClick={() => handleRemoveArrayItem(index, 'features')}
              >
                حذف
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            onClick={() => handleAddArrayItem('features')}
          >
            إضافة ميزة
          </button>
        </div>

        {/* الحدود */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">الحدود</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="maxBalance" className="block text-sm font-medium text-gray-700 mb-1">الحد الأقصى للرصيد</label>
              <input
                type="number"
                id="maxBalance"
                name="maxBalance"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.limits.maxBalance}
                onChange={(e) => handleNestedChange(e, 'limits', 'maxBalance')}
              />
            </div>
            <div>
              <label htmlFor="dailyLimit" className="block text-sm font-medium text-gray-700 mb-1">الحد اليومي</label>
              <input
                type="number"
                id="dailyLimit"
                name="dailyLimit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.limits.dailyLimit}
                onChange={(e) => handleNestedChange(e, 'limits', 'dailyLimit')}
              />
            </div>
            <div>
              <label htmlFor="monthlyLimit" className="block text-sm font-medium text-gray-700 mb-1">الحد الشهري</label>
              <input
                type="number"
                id="monthlyLimit"
                name="monthlyLimit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.limits.monthlyLimit}
                onChange={(e) => handleNestedChange(e, 'limits', 'monthlyLimit')}
              />
            </div>
            <div>
              <label htmlFor="perTransactionLimit" className="block text-sm font-medium text-gray-700 mb-1">الحد لكل معاملة</label>
              <input
                type="number"
                id="perTransactionLimit"
                name="perTransactionLimit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.limits.perTransactionLimit}
                onChange={(e) => handleNestedChange(e, 'limits', 'perTransactionLimit')}
              />
            </div>
          </div>
        </div>

        {/* الرسوم */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">الرسوم</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="registration" className="block text-sm font-medium text-gray-700 mb-1">رسوم التسجيل</label>
              <input
                type="number"
                id="registration"
                name="registration"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.fees.registration}
                onChange={(e) => handleNestedChange(e, 'fees', 'registration')}
              />
            </div>
            <div>
              <label htmlFor="annual" className="block text-sm font-medium text-gray-700 mb-1">الرسوم السنوية</label>
              <input
                type="number"
                id="annual"
                name="annual"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.fees.annual}
                onChange={(e) => handleNestedChange(e, 'fees', 'annual')}
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">رسوم التحويل</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sameWalletPercentage" className="block text-sm font-medium text-gray-700 mb-1">نسبة التحويل لنفس المحفظة (%)</label>
                <input
                  type="number"
                  id="sameWalletPercentage"
                  name="percentage"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fees.transfer.sameWallet.percentage}
                  onChange={(e) => handleNestedChange(e, 'fees', 'transfer', 'sameWallet')}
                />
              </div>
              <div>
                <label htmlFor="sameWalletFixed" className="block text-sm font-medium text-gray-700 mb-1">رسوم ثابتة للتحويل لنفس المحفظة</label>
                <input
                  type="number"
                  id="sameWalletFixed"
                  name="fixedAmount"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fees.transfer.sameWallet.fixedAmount}
                  onChange={(e) => handleNestedChange(e, 'fees', 'transfer', 'sameWallet')}
                />
              </div>
              <div>
                <label htmlFor="otherWalletsPercentage" className="block text-sm font-medium text-gray-700 mb-1">نسبة التحويل لمحافظ أخرى (%)</label>
                <input
                  type="number"
                  id="otherWalletsPercentage"
                  name="percentage"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fees.transfer.otherWallets.percentage}
                  onChange={(e) => handleNestedChange(e, 'fees', 'transfer', 'otherWallets')}
                />
              </div>
              <div>
                <label htmlFor="otherWalletsFixed" className="block text-sm font-medium text-gray-700 mb-1">رسوم ثابتة للتحويل لمحافظ أخرى</label>
                <input
                  type="number"
                  id="otherWalletsFixed"
                  name="fixedAmount"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.fees.transfer.otherWallets.fixedAmount}
                  onChange={(e) => handleNestedChange(e, 'fees', 'transfer', 'otherWallets')}
                />
              </div>
            </div>
          </div>
        </div>

        {/* متطلبات الاشتراك */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">متطلبات الاشتراك</h2>
          {formData.requirements.map((requirement, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={requirement}
                onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                placeholder="أدخل متطلب"
              />
              <button
                type="button"
                className="mr-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                onClick={() => handleRemoveArrayItem(index, 'requirements')}
              >
                حذف
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            onClick={() => handleAddArrayItem('requirements')}
          >
            إضافة متطلب
          </button>
        </div>

        {/* خطوات الاشتراك */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">خطوات الاشتراك</h2>
          {formData.registrationSteps.map((step, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={step}
                onChange={(e) => handleArrayChange(index, e.target.value, 'registrationSteps')}
                placeholder="أدخل خطوة"
              />
              <button
                type="button"
                className="mr-2 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
                onClick={() => handleRemoveArrayItem(index, 'registrationSteps')}
              >
                حذف
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
            onClick={() => handleAddArrayItem('registrationSteps')}
          >
            إضافة خطوة
          </button>
        </div>

        {/* روابط التطبيقات */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">روابط التطبيقات</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="android" className="block text-sm font-medium text-gray-700 mb-1">رابط تطبيق Android</label>
              <input
                type="url"
                id="android"
                name="android"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.appLinks.android}
                onChange={(e) => handleNestedChange(e, 'appLinks', 'android')}
              />
            </div>
            <div>
              <label htmlFor="ios" className="block text-sm font-medium text-gray-700 mb-1">رابط تطبيق iOS</label>
              <input
                type="url"
                id="ios"
                name="ios"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.appLinks.ios}
                onChange={(e) => handleNestedChange(e, 'appLinks', 'ios')}
              />
            </div>
            <div>
              <label htmlFor="huawei" className="block text-sm font-medium text-gray-700 mb-1">رابط تطبيق Huawei</label>
              <input
                type="url"
                id="huawei"
                name="huawei"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.appLinks.huawei}
                onChange={(e) => handleNestedChange(e, 'appLinks', 'huawei')}
              />
            </div>
          </div>
        </div>

        {/* معلومات الاتصال */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">معلومات الاتصال</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">الموقع الإلكتروني</label>
              <input
                type="url"
                id="website"
                name="website"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contactInfo.website}
                onChange={(e) => handleNestedChange(e, 'contactInfo', 'website')}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contactInfo.phone}
                onChange={(e) => handleNestedChange(e, 'contactInfo', 'phone')}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contactInfo.email}
                onChange={(e) => handleNestedChange(e, 'contactInfo', 'email')}
              />
            </div>
          </div>
        </div>

        {/* الحالة */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 pb-2 border-b">الحالة</h2>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            <label htmlFor="isActive" className="mr-2 block text-sm font-medium text-gray-700">
              نشط
            </label>
          </div>
        </div>

        {/* أزرار الإرسال والإلغاء */}
        <div className="flex justify-end space-x-2 space-x-reverse">
          <Link
            href="/admin/wallets"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            إلغاء
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            حفظ المحفظة
          </button>
        </div>
      </form>
    </div>
  );
}
