import { useParams } from 'next/navigation';
import Link from 'next/link';

// تعريف نوع البيانات للمحفظة
type Wallet = {
  id: string;
  name: string;
  bank: string;
  logo: string;
  logoColor: string;
  subscriptionSteps: {
    title: string;
    description: string;
  }[];
  requirements: string[];
  contactInfo: {
    website?: string;
    phone?: string;
    branches?: string;
  };
};

// بيانات المحافظ (ستأتي من قاعدة البيانات لاحقاً)
const wallets: Record<string, Wallet> = {
  'vodafone-cash': {
    id: 'vodafone-cash',
    name: 'فودافون كاش',
    bank: 'بنك الإسكندرية',
    logo: 'VC',
    logoColor: 'red',
    subscriptionSteps: [
      {
        title: 'زيارة منفذ فودافون',
        description: 'توجه إلى أقرب فرع فودافون أو وكيل معتمد'
      },
      {
        title: 'تقديم المستندات المطلوبة',
        description: 'قدم بطاقة الرقم القومي السارية ورقم الهاتف المحمول المسجل باسمك'
      },
      {
        title: 'ملء استمارة الاشتراك',
        description: 'قم بملء استمارة طلب الاشتراك في خدمة فودافون كاش'
      },
      {
        title: 'استلام الرقم السري',
        description: 'ستتلقى رسالة نصية تحتوي على رابط تحميل التطبيق والرقم السري المؤقت'
      },
      {
        title: 'تفعيل الخدمة',
        description: 'قم بتحميل تطبيق فودافون كاش وتسجيل الدخول باستخدام الرقم السري المؤقت، ثم قم بتغييره إلى رقم سري خاص بك'
      }
    ],
    requirements: [
      'بطاقة الرقم القومي السارية',
      'رقم هاتف محمول فودافون مسجل باسمك',
      'أن يكون عمرك 18 عاماً أو أكثر'
    ],
    contactInfo: {
      website: 'https://web.vodafone.com.eg/ar/vodafone-cash',
      phone: '888',
      branches: 'فروع فودافون المنتشرة في جميع أنحاء مصر'
    }
  },
  'bm-wallet': {
    id: 'bm-wallet',
    name: 'محفظة بنك مصر',
    bank: 'بنك مصر',
    logo: 'BM',
    logoColor: 'blue',
    subscriptionSteps: [
      {
        title: 'زيارة فرع بنك مصر',
        description: 'توجه إلى أقرب فرع من فروع بنك مصر'
      },
      {
        title: 'تقديم المستندات المطلوبة',
        description: 'قدم بطاقة الرقم القومي السارية ورقم الهاتف المحمول المسجل باسمك'
      },
      {
        title: 'ملء استمارة الاشتراك',
        description: 'قم بملء وتوقيع استمارة طلب الاشتراك في خدمة محفظة بنك مصر'
      },
      {
        title: 'استلام رابط التطبيق ورمز التفعيل',
        description: 'ستتلقى رسالة على رقم الهاتف، بها رابط تطبيق المحفظة ورمز التفعيل'
      },
      {
        title: 'تحديد الرقم السري',
        description: 'قم بتحديد رقم سري خاص لاستعماله في جميع المعاملات بكل سرية وأمان'
      }
    ],
    requirements: [
      'بطاقة الرقم القومي السارية',
      'رقم هاتف محمول مسجل باسمك',
      'أن يكون عمرك 16 عاماً أو أكثر'
    ],
    contactInfo: {
      website: 'https://www.banquemisr.com/ar/digital-banking/Pages/BM-Wallet',
      phone: '19888',
      branches: 'فروع بنك مصر المنتشرة في جميع أنحاء مصر'
    }
  },
  'nbe-phone-cash': {
    id: 'nbe-phone-cash',
    name: 'فون كاش',
    bank: 'البنك الأهلي المصري',
    logo: 'NBE',
    logoColor: 'green',
    subscriptionSteps: [
      {
        title: 'زيارة فرع البنك الأهلي المصري',
        description: 'توجه إلى أقرب فرع من فروع البنك الأهلي المصري'
      },
      {
        title: 'تقديم المستندات المطلوبة',
        description: 'قدم بطاقة الرقم القومي السارية ورقم الهاتف المحمول المسجل باسمك'
      },
      {
        title: 'ملء استمارة الاشتراك',
        description: 'قم بملء وتوقيع استمارة طلب الاشتراك في خدمة فون كاش'
      },
      {
        title: 'استلام رابط التطبيق ورمز التفعيل',
        description: 'ستتلقى رسالة على رقم الهاتف، بها رابط تطبيق المحفظة ورمز التفعيل'
      },
      {
        title: 'تحديد الرقم السري',
        description: 'قم بتحديد رقم سري خاص لاستعماله في جميع المعاملات بكل سرية وأمان'
      }
    ],
    requirements: [
      'بطاقة الرقم القومي السارية',
      'رقم هاتف محمول مسجل باسمك',
      'أن يكون عمرك 16 عاماً أو أكثر'
    ],
    contactInfo: {
      website: 'https://www.nbe.com.eg/NBE/E-Banking/Phone-Cash',
      phone: '19623',
      branches: 'فروع البنك الأهلي المصري المنتشرة في جميع أنحاء مصر'
    }
  }
};

// صفحة كيفية الاشتراك لمحفظة محددة
export default function WalletSubscriptionPage({ params }: { params: { walletId: string } }) {
  const walletId = params.walletId;
  const wallet = wallets[walletId];

  if (!wallet) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">المحفظة غير موجودة</h1>
          <p className="mb-4">عذراً، لم نتمكن من العثور على المحفظة المطلوبة.</p>
          <Link href="/how-to-subscribe" className="text-blue-600 hover:text-blue-800 font-semibold">
            العودة إلى صفحة كيفية الاشتراك
          </Link>
        </div>
      </div>
    );
  }

  // تحديد لون الخلفية بناءً على لون المحفظة
  const getBgColor = () => {
    switch (wallet.logoColor) {
      case 'red':
        return 'bg-red-100';
      case 'blue':
        return 'bg-blue-100';
      case 'green':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };

  // تحديد لون النص بناءً على لون المحفظة
  const getTextColor = () => {
    switch (wallet.logoColor) {
      case 'red':
        return 'text-red-600';
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* رأس الصفحة */}
      <div className="mb-8">
        <Link href="/how-to-subscribe" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          &larr; العودة إلى قائمة المحافظ
        </Link>
        <div className="flex items-center">
          <div className={`${getBgColor()} p-3 rounded-lg ml-4`}>
            <div className="w-16 h-16 flex items-center justify-center">
              <span className={`${getTextColor()} text-2xl font-bold`}>{wallet.logo}</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">كيفية الاشتراك في {wallet.name}</h1>
            <p className="text-gray-600 text-xl">{wallet.bank}</p>
          </div>
        </div>
      </div>

      {/* قسم المتطلبات */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">المتطلبات الأساسية</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="list-disc list-inside space-y-2 mr-4">
            {wallet.requirements.map((requirement, index) => (
              <li key={index} className="text-gray-700">{requirement}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* قسم خطوات الاشتراك */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">خطوات الاشتراك</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ol className="relative border-r-2 border-gray-200 mr-6">
            {wallet.subscriptionSteps.map((step, index) => (
              <li key={index} className="mb-10 mr-10">
                <div className={`absolute -right-9 ${getBgColor()} w-16 h-16 rounded-full flex items-center justify-center border-4 border-white`}>
                  <span className={`${getTextColor()} text-xl font-bold`}>{index + 1}</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* قسم معلومات الاتصال */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">معلومات الاتصال</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wallet.contactInfo.website && (
              <div className="flex flex-col items-center">
                <div className={`${getBgColor()} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <svg className={`w-8 h-8 ${getTextColor()}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2">الموقع الإلكتروني</h3>
                <a href={wallet.contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  زيارة الموقع
                </a>
              </div>
            )}
            
            {wallet.contactInfo.phone && (
              <div className="flex flex-col items-center">
                <div className={`${getBgColor()} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <svg className={`w-8 h-8 ${getTextColor()}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2">رقم الهاتف</h3>
                <p className="text-gray-700">{wallet.contactInfo.phone}</p>
              </div>
            )}
            
            {wallet.contactInfo.branches && (
              <div className="flex flex-col items-center">
                <div className={`${getBgColor()} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  <svg className={`w-8 h-8 ${getTextColor()}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="font-bold mb-2">الفروع</h3>
                <p className="text-gray-700 text-center">{wallet.contactInfo.branches}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* قسم المقارنة */}
      <section>
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-4">هل تريد مقارنة {wallet.name} مع محافظ أخرى؟</h2>
          <Link 
            href={`/comparison?wallets=${wallet.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg inline-block transition-colors"
          >
            مقارنة المحافظ
          </Link>
        </div>
      </section>
    </div>
  );
}
