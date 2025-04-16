import RootLayout from '@/components/layout/RootLayout';

export const metadata = {
  title: 'مقارنة المحافظ الإلكترونية وخدمات الدفع في مصر',
  description: 'موقع متخصص في مقارنة المحافظ الإلكترونية وخدمات الدفع الرقمي المتوفرة في مصر',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
