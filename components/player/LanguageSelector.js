'use client';

export default function LanguageSelector({ label, languages, selectedLanguage, onLanguageChange }) {
  return (
    // تم حذف div الإضافي وإضافة الكلاس مباشرة هنا
    <div className="text-white/80">
      <label htmlFor={label} className="block text-lg font-medium mb-2">{label}</label>
      <select
        id={label}
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        // --- تعديل الكلاسات هنا لتتناسب مع التصميم الداكن ---
        className="w-full border border-white/20 rounded-md p-2 bg-slate-700 text-white focus:ring-amber-500 focus:border-amber-500"
      >
        <option value="" disabled className="bg-slate-800 text-gray-400">-- اختر --</option>
        {Array.isArray(languages) && languages.map((lang) => (
          <option key={lang.id} value={lang.language_code} className="bg-slate-800 text-white">
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}