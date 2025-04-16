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

// صفحة كيفية الاشتراك العامة
export default function HowToSubscribePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">كيفية الاشتراك في المحافظ الإلكترونية</h1>
      
      {/* قسم المقدمة */}
      <section className="mb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">خطوات عامة للاشتراك في المحافظ الإلكترونية</h2>
          <p className="mb-4">
            على الرغم من اختلاف إجراءات الاشتراك من محفظة لأخرى، إلا أن هناك خطوات عامة مشتركة بين معظم المحافظ الإلكترونية في مصر:
          </p>
          <ol className="list-decimal list-inside space-y-2 mr-4">
            <li>زيارة أقرب فرع من فروع البنك أو مُشغلي شبكات الهاتف المحمول أو وكلاء البنوك.</li>
            <li>تقديم بطاقة الرقم القومي السارية ورقم الهاتف المحمول المسجل باسمك.</li>
            <li>ملء وتوقيع استمارة الاشتراك في الخدمة.</li>
            <li>استلام رسالة على رقم الهاتف، بها رابط تطبيق المحفظة ورمز التفعيل.</li>
            <li>تحديد رقم سري خاص لاستعماله في جميع المعاملات بِكُل سرية وأمان.</li>
          </ol>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">ملاحظات هامة</h3>
          <ul className="list-disc list-inside space-y-2 mr-4">
            <li>يمكن تفعيل حساب محفظة إلكترونية واحدة فقط لكل رقم هاتف محمول.</li>
            <li>الحد الأقصى هو 3 محافظ للرقم القومي الواحد.</li>
            <li>يجب أن يكون رقم الهاتف المحمول مسجلاً باسمك وبنفس بيانات بطاقة الرقم القومي.</li>
            <li>يجب أن يكون عمرك 16 عاماً أو أكثر (قد تختلف بعض المحافظ).</li>
          </ul>
        </div>
      </section>
      
      {/* قسم المحافظ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">اختر محفظة للاطلاع على خطوات الاشتراك التفصيلية</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(wallets).map(wallet => (
            <Link 
              key={wallet.id} 
              href={`/how-to-subscribe/${wallet.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <div className={`bg-${wallet.logoColor}-100 p-2 rounded-lg ml-3`}>
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className={`text-${wallet.logoColor}-600 font-bold`}>{wallet.logo}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{wallet.name}</h3>
                    <p className="text-gray-600">{wallet.bank}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700 mb-4">عدد خطوات الاشتراك: {wallet.subscriptionSteps.length}</p>
                <div className="flex justify-end">
                  <span className="text-blue-600 hover:text-blue-800 font-semibold">عرض التفاصيل &larr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* قسم الأسئلة الشائعة */}
      <section>
        <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة حول الاشتراك في المحافظ الإلكترونية</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">هل يمكنني الاشتراك في أكثر من محفظة إلكترونية؟</h3>
            <p className="text-gray-700">
              نعم، يمكنك الاشتراك في حتى 3 محافظ إلكترونية مختلفة باستخدام نفس الرقم القومي، ولكن كل محفظة يجب أن تكون مرتبطة برقم هاتف محمول مختلف مسجل باسمك.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">هل يمكنني الاشتراك في المحفظة الإلكترونية عبر الإنترنت؟</h3>
            <p className="text-gray-700">
              في معظم الحالات، يتطلب الاشتراك في المحفظة الإلكترونية زيارة فرع البنك أو وكيل معتمد للتحقق من هويتك. ومع ذلك، بدأت بعض البنوك في توفير خدمة الاشتراك عبر الإنترنت للعملاء الحاليين.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">ما هي المستندات المطلوبة للاشتراك في محفظة إلكترونية؟</h3>
            <p className="text-gray-700">
              المستندات الأساسية المطلوبة هي بطاقة الرقم القومي السارية ورقم الهاتف المحمول المسجل باسمك. قد تطلب بعض البنوك مستندات إضافية مثل إثبات العنوان أو مستندات أخرى.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold mb-2">هل هناك رسوم للاشتراك في المحفظة الإلكترونية؟</h3>
            <p className="text-gray-700">
              معظم المحافظ الإلكترونية في مصر لا تفرض رسوماً على الاشتراك في الخدمة. ومع ذلك، قد تكون هناك رسوم على بعض المعاملات مثل السحب والتحويل.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
