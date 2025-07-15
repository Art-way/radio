import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://backend.radiolingo.app/languages');
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // --- التصحيح الأهم: إرجاع المصفوفة مباشرة ---
    if (data && data.data && Array.isArray(data.data.languages)) {
      return NextResponse.json(data.data.languages); // نرجع المصفوفة فقط
    }

    // في حال كانت البنية غير متوقعة
    return NextResponse.json({ error: 'Unexpected data structure from languages API' }, { status: 500 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}