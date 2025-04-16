import { Metadata } from 'next';
import Link from 'next/link';

// تعريف البيانات الوصفية للصفحة
export const metadata: Metadata = {
  title: 'مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر | الصفحة الرئيسية',
  description: 'قارن بين جميع المحافظ الإلكترونية وخدمات الدفع الرقمي في مصر. اكتشف أفضل المحافظ من حيث الرسوم والحدود والميزات واختر الأنسب لاحتياجاتك.',
  keywords: 'محافظ إلكترونية, خدمات دفع, مصر, فودافون كاش, محفظة بنك مصر, فون كاش, مقارنة, رسوم, حدود, ميزات',
  openGraph: {
    title: 'مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر',
    description: 'قارن بين جميع المحافظ الإلكترونية وخدمات الدفع الرقمي في مصر واختر الأنسب لاحتياجاتك',
    url: 'https://ewallets-comparison.com',
    siteName: 'مقارنة المحافظ الإلكترونية',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'مقارنة المحافظ الإلكترونية في مصر',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر',
    description: 'قارن بين جميع المحافظ الإلكترونية وخدمات الدفع الرقمي في مصر واختر الأنسب لاحتياجاتك',
    images: ['/images/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://ewallets-comparison.com',
  },
};

// مكون بطاقة المحفظة
const WalletCard = ({ 
  id, 
  name, 
  bank, 
  logo, 
  logoColor, 
  features, 
  affiliateLink 
}: { 
  id: string; 
  name: string; 
  bank: string; 
  logo: string; 
  logoColor: string; 
  features: string[]; 
  affiliateLink?: string;
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className={`h-2 bg-${logoColor}-500`}></div>
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${logoColor}-100 flex items-center justify-center ml-4`}>
          <span className={`text-${logoColor}-600 text-xl font-bold`}>{logo}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-gray-600 text-sm">{bank}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">أهم الميزات:</h4>
        <ul className="text-sm text-gray-600 space-y-1 mr-5 list-disc">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex flex-col space-y-2">
        <Link 
          href={`/wallets/${id}`}
          className="text-center px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
        >
          عرض التفاصيل
        </Link>
        
        {affiliateLink ? (
          <a 
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            data-affiliate="true"
            onClick={() => {
              // تتبع النقرات على روابط الإحالة
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'affiliate_link_click', {
                  wallet_name: name,
                  wallet_id: id
                });
              }
            }}
          >
            الاشتراك الآن
          </a>
        ) : (
          <Link 
            href={`/how-to-subscribe/${id}`}
            className="text-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            كيفية الاشتراك
          </Link>
        )}
      </div>
    </div>
  </div>
);

// مكون قسم المقارنة السريعة
const QuickComparisonSection = () => {
  // بيانات وهمية للمحافظ الأكثر شعبية
  const popularWallets = [
    {
      id: 'vodafone-cash',
      name: 'فودافون كاش',
      bank: 'بنك الإسكندرية',
      logo: 'VC',
      logoColor: 'red',
      features: [
        'رسوم تحويل منخفضة',
        'قبول واسع لدى التجار',
        'سهولة الاستخدام',
        'خدمة دفع الفواتير'
      ],
      affiliateLink: 'https://vodafone.com.eg/ar/vodafone-cash?ref=ewallets-comparison'
    },
    {
      id: 'bm-wallet',
      name: 'محفظة بنك مصر',
      bank: 'بنك مصر',
      logo: 'BM',
      logoColor: 'blue',
      features: [
        'حدود تحويل عالية',
        'أمان عالي',
        'خدمة عملاء متميزة',
        'ربط مع الحساب البنكي'
      ],
      affiliateLink: 'https://www.banquemisr.com/ar/digital-banking/Pages/BM-Wallet?ref=ewallets-comparison'
    },
    {
      id: 'nbe-phone-cash',
      name: 'فون كاش',
      bank: 'البنك الأهلي المصري',
      logo: 'NBE',
      logoColor: 'green',
      features: [
        'خدمات ادخار متميزة',
        'شبكة صراف آلي واسعة',
        'عروض ومكافآت متنوعة',
        'تأمين على المعاملات'
      ],
      affiliateLink: 'https://www.nbe.com.eg/NBE/E-Banking/Phone-Cash?ref=ewallets-comparison'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">المحافظ الإلكترونية الأكثر شعبية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            قارن بين أشهر المحافظ الإلكترونية في مصر واختر الأنسب لاحتياجاتك
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {popularWallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              id={wallet.id}
              name={wallet.name}
              bank={wallet.bank}
              logo={wallet.logo}
              logoColor={wallet.logoColor}
              features={wallet.features}
              affiliateLink={wallet.affiliateLink}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Link
            href="/comparison"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            مقارنة شاملة بين جميع المحافظ
          </Link>
        </div>
      </div>
    </section>
  );
};

// مكون قسم البحث عن المحفظة المناسبة
const FindWalletSection = () => (
  <section className="py-16 bg-blue-600 text-white">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">ابحث عن المحفظة الإلكترونية المناسبة لك</h2>
        <p className="text-blue-100 mb-8">
          أجب على بعض الأسئلة البسيطة وسنساعدك في العثور على المحفظة الإلكترونية التي تناسب احتياجاتك
        </p>
        <Link
          href="/recommendation"
          className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
        >
          ابدأ الآن
        </Link>
      </div>
    </div>
  </section>
);

// مكون قسم المميزات
const FeaturesSection = () => {
  const features = [
    {
      icon: '⚖️',
      title: 'مقارنة شاملة',
      description: 'قارن بين جميع المحافظ الإلكترونية وخدمات الدفع من حيث الرسوم والحدود والميزات'
    },
    {
      icon: '🔍',
      title: 'معلومات دقيقة',
      description: 'معلومات محدثة ودقيقة عن جميع المحافظ الإلكترونية وخدمات الدفع في مصر'
    },
    {
      icon: '👍',
      title: 'توصيات مخصصة',
      description: 'احصل على توصيات مخصصة بناءً على احتياجاتك وتفضيلاتك الشخصية'
    },
    {
      icon: '📱',
      title: 'كيفية الاشتراك',
      description: 'تعرف على خطوات الاشتراك في المحافظ الإلكترونية وخدمات الدفع المختلفة'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">لماذا تستخدم موقعنا؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نساعدك في اتخاذ القرار الصحيح عند اختيار المحفظة الإلكترونية أو خدمة الدفع المناسبة لك
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// مكون قسم المقالات والأخبار
const BlogSection = () => {
  const articles = [
    {
      id: 1,
      title: 'كيف تختار المحفظة الإلكترونية المناسبة لك؟',
      excerpt: 'دليل شامل لاختيار المحفظة الإلكترونية التي تناسب احتياجاتك ونمط حياتك...',
      date: '15 أبريل 2025',
      slug: 'how-to-choose-the-right-ewallet'
    },
    {
      id: 2,
      title: 'مقارنة بين أشهر 5 محافظ إلكترونية في مصر',
      excerpt: 'مقارنة تفصيلية بين أشهر المحافظ الإلكترونية في مصر من حيث الرسوم والميزات...',
      date: '10 أبريل 2025',
      slug: 'top-5-ewallets-in-egypt-comparison'
    },
    {
      id: 3,
      title: 'نصائح لحماية محفظتك الإلكترونية من الاختراق',
      excerpt: 'إليك أهم النصائح والإرشادات لحماية محفظتك الإلكترونية من محاولات الاختراق...',
      date: '5 أبريل 2025',
      slug: 'ewallet-security-tips'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">أحدث المقالات والأخبار</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تعرف على أحدث المعلومات والنصائح حول المحافظ الإلكترونية وخدمات الدفع في مصر
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  قراءة المزيد
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            عرض جميع المقالات
          </Link>
        </div>
      </div>
    </section>
  );
};

// مكون قسم الاشتراك في النشرة البريدية
const NewsletterSection = () => (
  <section className="py-16 bg-blue-900 text-white">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">اشترك في نشرتنا البريدية</h2>
        <p className="text-blue-200 mb-8">
          احصل على أحدث المعلومات والعروض الخاصة بالمحافظ الإلكترونية وخدمات الدفع في مصر
        </p>
        
        <form className="flex flex-col md:flex-row gap-2 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
          >
            اشتراك
          </button>
        </form>
        
        <p className="text-sm text-blue-300 mt-4">
          لن نقوم بمشاركة بريدك الإلكتروني مع أي جهة أخرى. يمكنك إلغاء الاشتراك في أي وقت.
        </p>
      </div>
    </div>
  </section>
);

// الصفحة الرئيسية
export default function Home() {
  return (
    <main>
      {/* قسم الترحيب الرئيسي */}
      <section className="py-20 bg-gradient-to-b from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              قارن بين المحافظ الإلكترونية وخدمات الدفع في مصر
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              اكتشف أفضل المحافظ الإلكترونية وخدمات الدفع التي تناسب احتياجاتك من خلال مقارنة شاملة للرسوم والميزات والحدود
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/comparison"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                مقارنة المحافظ
              </Link>
              <Link
                href="/recommendation"
                className="px-8 py-4 bg-blue-800 text-white rounded-lg font-bold hover:bg-blue-900 transition-colors"
              >
                اختر المحفظة المناسبة لك
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* أقسام الصفحة الرئيسية */}
      <FeaturesSection />
      <QuickComparisonSection />
      <FindWalletSection />
      <BlogSection />
      <NewsletterSection />
      
      {/* هيكل البيانات المنظمة لتحسين السيو */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر",
            "url": "https://ewallets-comparison.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://ewallets-comparison.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "description": "قارن بين جميع المحافظ الإلكترونية وخدمات الدفع الرقمي في مصر. اكتشف أفضل المحافظ من حيث الرسوم والحدود والميزات واختر الأنسب لاحتياجاتك.",
            "inLanguage": "ar-EG"
          })
        }}
      />
    </main>
  );
}
