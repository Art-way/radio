'use client';

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ dictionary, lang }) {
  // تحديد رابط الصفحة الرئيسية الصحيح
  const homeHref = lang === 'en' ? '/' : `/${lang}`;
  // تحديد رابط المشغل الصحيح
  const playerHref = lang === 'en' ? '/player' : `/${lang}/player`;

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href={homeHref}>
            <h1 className="text-3xl font-bold text-amber-400 cursor-pointer">Radiolingo</h1>
        </Link>
        
        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <Link 
            href={playerHref} 
            className="bg-amber-500 text-black font-bold px-6 py-2 rounded-lg hover:bg-amber-400"
          >
            {dictionary.header.go_to_player}
          </Link>
        </div>
      </div>
    </header>
  );
}