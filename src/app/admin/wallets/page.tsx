'use client';

import { useState } from 'react';
import Link from 'next/link';

// مكون بطاقة المحفظة
const WalletCard = ({ wallet, onEdit, onDelete }: { 
  wallet: { 
    id: string; 
    name: string; 
    bank: string; 
    logo: string; 
    isActive: boolean;
  }; 
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void;
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg bg-${wallet.logo === 'VC' ? 'red' : wallet.logo === 'BM' ? 'blue' : 'green'}-100 flex items-center justify-center ml-3`}>
          <span className={`text-${wallet.logo === 'VC' ? 'red' : wallet.logo === 'BM' ? 'blue' : 'green'}-600 font-bold`}>{wallet.logo}</span>
        </div>
        <div>
          <h3 className="font-semibold">{wallet.name}</h3>
          <p className="text-sm text-gray-600">{wallet.bank}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${wallet.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {wallet.isActive ? 'نشط' : 'غير نشط'}
        </span>
      </div>
    </div>
    <div className="flex justify-end space-x-2 space-x-reverse">
      <button
        onClick={() => onEdit(wallet.id)}
        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
      >
        تعديل
      </button>
      <button
        onClick={() => onDelete(wallet.id)}
        className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
      >
        حذف
      </button>
    </div>
  </div>
);

export default function AdminWallets() {
  // حالة البحث والتصفية
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBank, setFilterBank] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // بيانات وهمية للمحافظ
  const [wallets, setWallets] = useState([
    { id: '1', name: 'فودافون كاش', bank: 'بنك الإسكندرية', logo: 'VC', isActive: true },
    { id: '2', name: 'محفظة بنك مصر', bank: 'بنك مصر', logo: 'BM', isActive: true },
    { id: '3', name: 'فون كاش', bank: 'البنك الأهلي المصري', logo: 'NBE', isActive: true },
    { id: '4', name: 'محفظة CIB', bank: 'البنك التجاري الدولي', logo: 'CIB', isActive: false },
    { id: '5', name: 'محفظة QNB', bank: 'بنك قطر الوطني الأهلي', logo: 'QNB', isActive: true },
  ]);

  // بيانات وهمية للبنوك
  const banks = [
    { id: '1', name: 'بنك الإسكندرية' },
    { id: '2', name: 'بنك مصر' },
    { id: '3', name: 'البنك الأهلي المصري' },
    { id: '4', name: 'البنك التجاري الدولي' },
    { id: '5', name: 'بنك قطر الوطني الأهلي' },
  ];

  // وظائف التعديل والحذف
  const handleEdit = (id: string) => {
    // سيتم تنفيذ هذه الوظيفة لاحقاً
    console.log(`تعديل المحفظة رقم ${id}`);
  };

  const handleDelete = (id: string) => {
    // تنفيذ حذف المحفظة
    if (window.confirm('هل أنت متأكد من رغبتك في حذف هذه المحفظة؟')) {
      setWallets(wallets.filter(wallet => wallet.id !== id));
    }
  };

  // تصفية المحافظ بناءً على البحث والفلاتر
  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = wallet.name.includes(searchTerm) || wallet.bank.includes(searchTerm);
    const matchesBank = filterBank ? wallet.bank === filterBank : true;
    const matchesStatus = filterStatus === 'active' ? wallet.isActive : 
                          filterStatus === 'inactive' ? !wallet.isActive : true;
    
    return matchesSearch && matchesBank && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">إدارة المحافظ الإلكترونية</h1>
        <p className="text-gray-600">إضافة وتعديل وحذف المحافظ الإلكترونية</p>
      </div>

      {/* شريط الأدوات */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">بحث</label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ابحث عن اسم المحفظة أو البنك..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">البنك</label>
            <select
              id="bank"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterBank}
              onChange={(e) => setFilterBank(e.target.value)}
            >
              <option value="">جميع البنوك</option>
              {banks.map(bank => (
                <option key={bank.id} value={bank.name}>{bank.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select
              id="status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
          <div className="w-full sm:w-auto flex items-end">
            <Link
              href="/admin/wallets/new"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              إضافة محفظة جديدة
            </Link>
          </div>
        </div>
      </div>

      {/* قائمة المحافظ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWallets.length > 0 ? (
          filteredWallets.map(wallet => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-500">لا توجد محافظ تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  );
}
