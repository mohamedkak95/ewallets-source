import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db/connection';
import EWallet from '@/models/EWallet';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const wallet = await EWallet.findById(params.id);
    
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
