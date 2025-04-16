// src/lib/affiliate/tracking.ts

/**
 * وحدة تتبع روابط الإحالة (التسويق بالعمولة)
 * تستخدم لتتبع النقرات على روابط الإحالة وتسجيل التحويلات
 */

// تكوين روابط الإحالة للمحافظ المختلفة
export const affiliateLinks = {
  'vodafone-cash': 'https://vodafone.com.eg/ar/vodafone-cash?ref=ewallets-comparison',
  'bm-wallet': 'https://www.banquemisr.com/ar/digital-banking/Pages/BM-Wallet?ref=ewallets-comparison',
  'nbe-phone-cash': 'https://www.nbe.com.eg/NBE/E-Banking/Phone-Cash?ref=ewallets-comparison',
  'cib-wallet': 'https://www.cibeg.com/ar/personal/accounts-and-cards/cib-smart-wallet?ref=ewallets-comparison',
  'qnb-wallet': 'https://www.qnb.com.eg/ar/personal/cards/qnb-alahli-mobile-wallet?ref=ewallets-comparison',
  'orange-cash': 'https://www.orange.eg/ar/orange-cash?ref=ewallets-comparison',
  'etisalat-cash': 'https://www.etisalat.eg/etisalat/StaticFiles/Portal/cash?ref=ewallets-comparison',
  'we-pay': 'https://te.eg/wepay/ar?ref=ewallets-comparison',
  'aman': 'https://www.aman.com.eg/?ref=ewallets-comparison',
  'fawry': 'https://fawry.com/ar/fawry-plus/?ref=ewallets-comparison'
};

// معدلات العمولة لكل محفظة (نسبة مئوية)
export const commissionRates = {
  'vodafone-cash': 5,
  'bm-wallet': 3,
  'nbe-phone-cash': 3,
  'cib-wallet': 4,
  'qnb-wallet': 3.5,
  'orange-cash': 4.5,
  'etisalat-cash': 4.5,
  'we-pay': 4,
  'aman': 3,
  'fawry': 3.5
};

// دالة للحصول على رابط الإحالة لمحفظة معينة
export function getAffiliateLink(walletId: string): string | null {
  return affiliateLinks[walletId as keyof typeof affiliateLinks] || null;
}

// دالة لتتبع النقرات على روابط الإحالة
export function trackAffiliateClick(walletId: string, walletName: string): void {
  // تسجيل النقرة في Google Analytics إذا كان متاحًا
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_link_click', {
      wallet_id: walletId,
      wallet_name: walletName,
      affiliate_link: getAffiliateLink(walletId)
    });
  }
  
  // يمكن إضافة منطق إضافي لتتبع النقرات في نظام خاص
  console.log(`Affiliate link click tracked for ${walletName} (${walletId})`);
}

// دالة لتسجيل التحويل (عندما يكمل المستخدم عملية التسجيل في المحفظة)
export function trackAffiliateConversion(walletId: string, walletName: string, conversionValue?: number): void {
  // تسجيل التحويل في Google Analytics إذا كان متاحًا
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_conversion', {
      wallet_id: walletId,
      wallet_name: walletName,
      conversion_value: conversionValue || 0
    });
  }
  
  // يمكن إضافة منطق إضافي لتسجيل التحويلات في نظام خاص
  console.log(`Affiliate conversion tracked for ${walletName} (${walletId})`);
}

// دالة لإنشاء رابط إحالة مخصص مع معرف المستخدم
export function createCustomAffiliateLink(walletId: string, userId?: string): string | null {
  const baseLink = getAffiliateLink(walletId);
  if (!baseLink) return null;
  
  // إضافة معرف المستخدم إلى الرابط إذا كان متاحًا
  if (userId) {
    return `${baseLink}&uid=${userId}`;
  }
  
  return baseLink;
}

// دالة لحساب العمولة المتوقعة
export function calculateExpectedCommission(walletId: string, conversionValue: number = 100): number {
  const rate = commissionRates[walletId as keyof typeof commissionRates] || 0;
  return (rate / 100) * conversionValue;
}

// واجهة لتكامل روابط الإحالة مع المكونات
export const AffiliateHelper = {
  getLink: getAffiliateLink,
  trackClick: trackAffiliateClick,
  trackConversion: trackAffiliateConversion,
  createCustomLink: createCustomAffiliateLink,
  calculateCommission: calculateExpectedCommission
};

export default AffiliateHelper;
