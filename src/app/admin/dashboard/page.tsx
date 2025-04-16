'use client';

import { useState } from 'react';
import Link from 'next/link';

// مكونات الإحصائيات
const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 border-t-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')} flex items-center justify-center`}>
        <span className={`text-xl ${color.replace('border-', 'text-')}`}>{icon}</span>
      </div>
    </div>
  </div>
);

// مكون الرسم البياني
const Chart = ({ title }: { title: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
      <p className="text-gray-500">بيانات الرسم البياني ستظهر هنا</p>
    </div>
  </div>
);

// مكون آخر المقارنات
const RecentComparisons = () => {
  // بيانات وهمية للمقارنات الأخيرة
  const comparisons = [
    { id: 1, wallets: ['فودافون كاش', 'محفظة بنك مصر'], date: '16 أبريل 2025', user: 'زائر' },
    { id: 2, wallets: ['فون كاش', 'محفظة QNB'], date: '15 أبريل 2025', user: 'أحمد محمد' },
    { id: 3, wallets: ['محفظة CIB', 'فودافون كاش', 'فون كاش'], date: '15 أبريل 2025', user: 'زائر' },
    { id: 4, wallets: ['محفظة بنك مصر', 'محفظة QNB'], date: '14 أبريل 2025', user: 'سارة أحمد' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">آخر المقارنات</h3>
        <Link href="/admin/comparisons" className="text-blue-500 hover:text-blue-700 text-sm">
          عرض الكل
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المحافظ
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التاريخ
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المستخدم
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparisons.map((comparison) => (
              <tr key={comparison.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {comparison.wallets.join(' vs ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {comparison.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {comparison.user}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// مكون آخر التوصيات
const RecentRecommendations = () => {
  // بيانات وهمية للتوصيات الأخيرة
  const recommendations = [
    { id: 1, wallet: 'فودافون كاش', score: 95, date: '16 أبريل 2025', user: 'زائر' },
    { id: 2, wallet: 'محفظة بنك مصر', score: 92, date: '15 أبريل 2025', user: 'محمد علي' },
    { id: 3, wallet: 'فون كاش', score: 88, date: '15 أبريل 2025', user: 'زائر' },
    { id: 4, wallet: 'محفظة CIB', score: 85, date: '14 أبريل 2025', user: 'نورا أحمد' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">آخر التوصيات</h3>
        <Link href="/admin/recommendations" className="text-blue-500 hover:text-blue-700 text-sm">
          عرض الكل
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المحفظة الموصى بها
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                درجة التوصية
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                التاريخ
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المستخدم
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recommendations.map((recommendation) => (
              <tr key={recommendation.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {recommendation.wallet}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-2 w-16 bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${recommendation.score}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-900">{recommendation.score}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recommendation.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recommendation.user}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [period, setPeriod] = useState('today');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">لوحة التحكم</h1>
        <p className="text-gray-600">مرحباً بك في لوحة تحكم موقع مقارنة المحافظ الإلكترونية</p>
      </div>

      {/* فلتر الفترة الزمنية */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPeriod('today')}
            className={`px-4 py-2 rounded-md text-sm ${
              period === 'today' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            اليوم
          </button>
          <button
            onClick={() => setPeriod('week')}
            className={`px-4 py-2 rounded-md text-sm ${
              period === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            هذا الأسبوع
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`px-4 py-2 rounded-md text-sm ${
              period === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            هذا الشهر
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-4 py-2 rounded-md text-sm ${
              period === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            هذا العام
          </button>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="إجمالي الزيارات"
          value="1,254"
          icon="👁️"
          color="border-blue-500"
        />
        <StatCard
          title="المقارنات"
          value="328"
          icon="⚖️"
          color="border-green-500"
        />
        <StatCard
          title="التوصيات"
          value="156"
          icon="👍"
          color="border-yellow-500"
        />
        <StatCard
          title="المستخدمين"
          value="42"
          icon="👤"
          color="border-purple-500"
        />
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Chart title="إحصائيات الزيارات" />
        <Chart title="المقارنات والتوصيات" />
      </div>

      {/* آخر المقارنات والتوصيات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentComparisons />
        <RecentRecommendations />
      </div>

      {/* روابط سريعة */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/wallets/new"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ml-3">
              <span className="text-blue-600">+</span>
            </div>
            <div>
              <p className="font-medium">إضافة محفظة جديدة</p>
            </div>
          </Link>
          <Link
            href="/admin/banks/new"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center ml-3">
              <span className="text-green-600">+</span>
            </div>
            <div>
              <p className="font-medium">إضافة بنك جديد</p>
            </div>
          </Link>
          <Link
            href="/admin/services/new"
            className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center ml-3">
              <span className="text-yellow-600">+</span>
            </div>
            <div>
              <p className="font-medium">إضافة خدمة جديدة</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
