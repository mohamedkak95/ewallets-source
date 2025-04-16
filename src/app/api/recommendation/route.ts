import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import Recommendation from '@/models/Recommendation';
import EWallet from '@/models/EWallet';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // استخراج بيانات التوصية من الطلب
    const body = await request.json();
    const { userId, sessionId, userPreferences } = body;
    
    // التحقق من صحة البيانات
    if (!userPreferences) {
      return NextResponse.json(
        { error: 'تفضيلات المستخدم مطلوبة' },
        { status: 400 }
      );
    }
    
    // الحصول على جميع المحافظ النشطة
    const wallets = await EWallet.find({ isActive: true })
      .populate('bankId', 'name')
      .select('name bankId features limits fees services');
    
    // حساب درجة التوصية لكل محفظة بناءً على تفضيلات المستخدم
    const scoredWallets = wallets.map(wallet => {
      let score = 0;
      const reasons = [];
      
      // حساب الدرجة بناءً على نوع الاستخدام
      if (userPreferences.usageType === 'personal') {
        // للاستخدام الشخصي، نفضل المحافظ ذات الرسوم المنخفضة
        if (wallet.fees.transfer.sameWallet.fixedAmount <= 1) {
          score += 10;
          reasons.push('رسوم تحويل منخفضة');
        }
      } else if (userPreferences.usageType === 'business') {
        // للاستخدام التجاري، نفضل المحافظ ذات الحدود العالية
        if (wallet.limits.dailyLimit >= 50000) {
          score += 15;
          reasons.push('حدود يومية عالية مناسبة للأعمال التجارية');
        }
      }
      
      // حساب الدرجة بناءً على حجم المعاملات
      if (userPreferences.transactionVolume === 'high') {
        if (wallet.limits.monthlyLimit >= 200000) {
          score += 15;
          reasons.push('حدود شهرية عالية مناسبة لحجم المعاملات الكبير');
        }
      } else if (userPreferences.transactionVolume === 'low') {
        if (wallet.fees.withdrawal.atm.sameBank.percentage <= 1) {
          score += 10;
          reasons.push('رسوم سحب منخفضة مناسبة للمعاملات القليلة');
        }
      }
      
      // حساب الدرجة بناءً على الميزات ذات الأولوية
      if (userPreferences.priorityFeatures && userPreferences.priorityFeatures.length > 0) {
        const matchedFeatures = wallet.features.filter(feature => 
          userPreferences.priorityFeatures.includes(feature)
        );
        
        score += matchedFeatures.length * 5;
        
        if (matchedFeatures.length > 0) {
          reasons.push(`توفر ${matchedFeatures.length} من الميزات المطلوبة`);
        }
      }
      
      return {
        itemId: wallet._id,
        itemType: 'wallet',
        score,
        reasons,
        name: wallet.name,
        bankName: wallet.bankId ? wallet.bankId.name : ''
      };
    });
    
    // ترتيب المحافظ حسب الدرجة
    const sortedWallets = scoredWallets.sort((a, b) => b.score - a.score);
    
    // اختيار أفضل 3 محافظ
    const recommendedWallets = sortedWallets.slice(0, 3);
    
    // إنشاء توصية جديدة
    const recommendation = new Recommendation({
      userId: userId || null,
      sessionId: sessionId || Date.now().toString(),
      userPreferences,
      recommendedItems: recommendedWallets.map(wallet => ({
        itemId: wallet.itemId,
        itemType: wallet.itemType,
        score: wallet.score,
        reasons: wallet.reasons
      })),
      date: new Date(),
      isActive: true
    });
    
    await recommendation.save();
    
    return NextResponse.json({ 
      success: true,
      recommendation: {
        id: recommendation._id,
        recommendedWallets: recommendedWallets.map(wallet => ({
          id: wallet.itemId,
          name: wallet.name,
          bankName: wallet.bankName,
          score: wallet.score,
          reasons: wallet.reasons
        }))
      }
    }, { status: 201 });
  } catch (error) {
    console.error('خطأ في إنشاء التوصية:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء التوصية' },
      { status: 500 }
    );
  }
}
