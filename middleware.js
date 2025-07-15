import { NextResponse } from 'next/server';

const locales = ['ar']; // اللغات الأخرى فقط
const defaultLocale = 'en';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. التحقق مما إذا كان المسار يبدأ بلغة مدعومة (مثل /ar)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // إذا كان المسار يحتوي على /ar، اسمح له بالمرور دون تغيير
    return;
  }

  // 2. إذا لم يكن المسار يحتوي على لغة، افترض أنه إنجليزي
  // استخدم "rewrite" لعرض محتوى "en" دون تغيير الرابط في المتصفح
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    // تخطي كل المسارات التي لا يجب أن يطبق عليها هذا المنطق
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};