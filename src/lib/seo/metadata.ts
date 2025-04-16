// src/lib/seo/metadata.ts

import { Metadata } from 'next';

// إنشاء الميتاداتا الأساسية للموقع
export const siteConfig = {
  name: 'مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر',
  description: 'قارن بين جميع المحافظ الإلكترونية وخدمات الدفع الرقمي في مصر. اكتشف أفضل المحافظ من حيث الرسوم والحدود والميزات واختر الأنسب لاحتياجاتك.',
  url: 'https://ewallets-comparison.com',
  ogImage: '/images/og-image.jpg',
  twitterImage: '/images/twitter-image.jpg',
  locale: 'ar_EG',
  keywords: 'محافظ إلكترونية, خدمات دفع, مصر, فودافون كاش, محفظة بنك مصر, فون كاش, مقارنة, رسوم, حدود, ميزات',
};

// دالة لإنشاء ميتاداتا للصفحات
export function generateMetadata({
  title,
  description,
  path = '',
  keywords = '',
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const fullKeywords = keywords ? `${keywords}, ${siteConfig.keywords}` : siteConfig.keywords;
  const url = `${siteConfig.url}${path}`;

  return {
    title: fullTitle,
    description: description,
    keywords: fullKeywords,
    openGraph: {
      title: fullTitle,
      description: description,
      url: url,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: [siteConfig.twitterImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

// دالة لإنشاء هيكل البيانات المنظمة للصفحة الرئيسية
export function generateHomePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': siteConfig.name,
    'url': siteConfig.url,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    },
    'description': siteConfig.description,
    'inLanguage': siteConfig.locale
  };
}

// دالة لإنشاء هيكل البيانات المنظمة لصفحة المقارنة
export function generateComparisonPageSchema(wallets: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': 'مقارنة المحافظ الإلكترونية في مصر',
    'url': `${siteConfig.url}/comparison`,
    'description': 'قارن بين المحافظ الإلكترونية وخدمات الدفع في مصر من حيث الرسوم والحدود والميزات',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': wallets.map((wallet, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'Product',
          'name': wallet.name,
          'description': wallet.description,
          'brand': {
            '@type': 'Organization',
            'name': wallet.bank
          },
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'EGP'
          }
        }
      }))
    }
  };
}

// دالة لإنشاء هيكل البيانات المنظمة لصفحة المحفظة
export function generateWalletPageSchema(wallet: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': wallet.name,
    'description': wallet.description,
    'brand': {
      '@type': 'Organization',
      'name': wallet.bank
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'EGP'
    },
    'review': {
      '@type': 'Review',
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': wallet.rating,
        'bestRating': '5'
      },
      'author': {
        '@type': 'Organization',
        'name': siteConfig.name
      }
    }
  };
}

// دالة لإنشاء هيكل البيانات المنظمة لصفحة المقالة
export function generateArticlePageSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.image || siteConfig.ogImage,
    'datePublished': article.date,
    'dateModified': article.updatedDate || article.date,
    'author': {
      '@type': 'Organization',
      'name': siteConfig.name,
      'url': siteConfig.url
    },
    'publisher': {
      '@type': 'Organization',
      'name': siteConfig.name,
      'logo': {
        '@type': 'ImageObject',
        'url': `${siteConfig.url}/images/logo.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${article.slug}`
    }
  };
}

// دالة لإنشاء هيكل البيانات المنظمة لصفحة الاتصال
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'اتصل بنا',
    'url': `${siteConfig.url}/contact`,
    'description': 'تواصل معنا للاستفسارات والاقتراحات حول المحافظ الإلكترونية وخدمات الدفع في مصر',
    'mainEntity': {
      '@type': 'Organization',
      'name': siteConfig.name,
      'url': siteConfig.url,
      'email': 'info@ewallets-comparison.com',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+20123456789',
        'contactType': 'customer service'
      }
    }
  };
}
