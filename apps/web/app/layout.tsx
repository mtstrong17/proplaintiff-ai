import { Geist, Geist_Mono } from 'next/font/google';

import AppSidebar from '@/components/AppSidebar';
import { Providers } from '@/components/providers';
import { SidebarProvider } from '@workspace/ui/components/sidebar';
import '@workspace/ui/globals.css';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <Providers>
          <SidebarProvider>
              <AppSidebar />
              {children}
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
