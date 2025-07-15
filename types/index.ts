// هذا الملف سيحتوي على كل تعريفات الأنواع في المشروع

// تعريف النوع الخاص بـ props الصفحات التي تعتمد على اللغة
export type LanguagePageProps = {
  params: {
    lang: 'en' | 'ar';
  };
};