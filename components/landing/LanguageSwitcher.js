'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // دالة لتوليد الرابط الصحيح للغة المبدلة
  const getSwitchedPath = (targetLocale) => {
    if (!pathname) return '/';

    // إزالة رمز اللغة الحالي من الرابط (إذا كان موجودًا)
    const currentLocale = pathname.split('/')[1];
    const pathWithoutLocale = ['ar'].includes(currentLocale)
      ? pathname.substring(currentLocale.length + 1)
      : pathname;
    
    // إذا كانت اللغة المستهدفة هي الإنجليزية، الرابط يكون بدون رمز لغة
    if (targetLocale === 'en') {
      return pathWithoutLocale || '/';
    }
    
    // إذا كانت اللغة المستهدفة هي العربية، أضف /ar
    return `/${targetLocale}${pathWithoutLocale}`;
  };

  return (
    <div className="flex items-center gap-4 text-white">
      {/* الرابط الخاص باللغة الإنجليزية */}
      <Link href={getSwitchedPath('en')} className="hover:text-amber-400 font-semibold">EN</Link>
      
      <span className="opacity-50">|</span>
      
      {/* الرابط الخاص باللغة العربية */}
      <Link href={getSwitchedPath('ar')} className="hover:text-amber-400 font-semibold">AR</Link>
    </div>
  );
}