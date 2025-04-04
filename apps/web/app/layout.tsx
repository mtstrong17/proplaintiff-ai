import { Geist, Geist_Mono } from 'next/font/google';

import AppSidebar from '@/components/AppSidebar';
import { Providers } from '@/components/providers';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
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
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(trpc.currentUser.getOrganizations.queryOptions()),
  ]);
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <SidebarProvider>
              <AppSidebar />
              {children}
            </SidebarProvider>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
