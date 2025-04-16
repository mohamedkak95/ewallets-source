import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import EWallet from '@/models/EWallet';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    
    const id = params.id;
    
    // التحقق من صحة المعرف
    if (!id) {
      return NextResponse.json(
        { error: 'معرف المحفظة مطلوب' },
        { status: 400 }
      );
    }
    
    // البحث عن المحفظة بواسطة المعرف
    const wallet = await EWallet.findById(id)
      .populate('bankId', 'name logo website contactInfo')
      .populate('services.serviceId', 'name icon category');
    
    if (!wallet) {
      return NextResponse.json(
        { error: 'المحفظة غير موجودة' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ wallet });
  } catch (error) {
    console.error('خطأ في استرجاع المحفظة الإلكترونية:', error);
    return NextResponse.json(
      { error: 'حدث خطأ أثناء استرجاع المحفظة الإلكترونية' },
      { status: 500 }
    );
  }
}
