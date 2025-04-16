import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import Comparison from '@/models/Comparison';
import EWallet from '@/models/EWallet';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // استخراج بيانات المقارنة من الطلب
    const body = await request.json();
    const { userId, sessionId, items, criteria } = body;
    
    // التحقق من صحة البيانات
    if (!items || !Array.isArray(items) || items.length < 2) {
      return NextResponse.json(
        { error: 'يجب اختيار محفظتين على الأقل للمقارنة' },
        { status: 400 }
      );
    }
    
    // التحقق من وجود المحافظ المختارة
    const walletIds = items.filter(item => item.itemType === 'wallet').map(item => item.itemId);
    const existingWallets = await EWallet.find({ _id: { $in: walletIds } }).countDocuments();
    
    if (existingWallets !== walletIds.length) {
      return NextResponse.json(
        { error: 'بعض المحافظ المختارة غير موجودة' },
        { status: 400 }
      );
    }
    
    // إنشاء مقارنة جديدة
    const comparison = new Comparison({
      userId: userId || null,
      sessionId: sessionId || Date.now().toString(),
      items,
      criteria: criteria || [],
      date: new Date(),
      isActive: true
    });
    
    await comparison.save();
    
    return NextResponse.json({ 
      success: true,
      comparison: {
        id: comparison._id,
        items: comparison.items,
        criteria: comparison.criteria
      }
    }, { status: 201 });
  } catch (error) {
    console.error('خطأ في إنشاء المقارنة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء إنشاء المقارنة' },
      { status: 500 }
    );
  }
}
