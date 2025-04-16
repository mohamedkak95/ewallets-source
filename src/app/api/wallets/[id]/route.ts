import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import EWallet from '@/models/EWallet';

// النوع الجديد لتوقيع الـ GET handler
type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Params) {
  const { id } = context.params;

  try {
    await connectToDatabase();
    const wallet = await EWallet.findById(id);
    
    if (!wallet) {
      return NextResponse.json(
        { error: 'المحفظة غير موجودة' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(wallet);
  } catch (error) {
    return NextResponse.json(
      { error: 'حدث خطأ أثناء استرجاع بيانات المحفظة' },
      { status: 500 }
    );
  }
}
