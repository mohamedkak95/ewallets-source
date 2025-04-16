import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import EWallet from '@/models/EWallet';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // استخراج معلمات البحث من الطلب
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // بناء استعلام البحث
    const query: any = { isActive: true };
    
    // إضافة معلمات البحث الإضافية إذا وجدت
    if (searchParams.has('bankId')) {
      query.bankId = searchParams.get('bankId');
    }
    
    if (searchParams.has('providerType')) {
      query.providerType = searchParams.get('providerType');
    }
    
    // تنفيذ الاستعلام مع الحصول على إجمالي عدد النتائج
    const [wallets, total] = await Promise.all([
      EWallet.find(query)
        .populate('bankId', 'name logo')
        .skip(skip)
        .limit(limit)
        .sort({ name: 1 }),
      EWallet.countDocuments(query)
    ]);
    
    // حساب معلومات الصفحات
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      wallets,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    });
  } catch (error) {
    console.error('خطأ في استرجاع المحافظ الإلكترونية:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء استرجاع المحافظ الإلكترونية' },
      { status: 500 }
    );
  }
}
