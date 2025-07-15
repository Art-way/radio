import "./globals.css";

export const metadata = {
  title: "Radiolingo - Learn Languages Through Conversation",
  description: "Learn a new language naturally by listening to real conversations. The ultimate player to immerse yourself and learn effortlessly.",
};

// هذا هو التصميم الجذري والوحيد الآن
// لا يحتوي على lang أو dir لأنه يخدم كل الصفحات
export default function RootLayout({ children }) {
  return (
    // استخدام اللغة الإنجليزية كلغة افتراضية للـ html
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}