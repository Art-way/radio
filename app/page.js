import { redirect } from 'next/navigation';

// هذه الصفحة ستقوم فقط بإعادة التوجيه إلى اللغة الافتراضية (الإنجليزية)
export default function RootPage() {
  redirect('/en');
}