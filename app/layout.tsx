import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import AntdConfigProvider from '@/providers/antdProvider';
import ReactQueryWrapper from '@/providers/reactQueryProvider';
import ConditionalNav from '@/providers/conditionalNav';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Rent App | Digital Library app',
  description: 'Digital Library',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-test="layout" data-modle="dark-mode">
      <body className={manrope.className}>
        <ReactQueryWrapper>
          <AntdRegistry>
            <AntdConfigProvider>
              <ConditionalNav>{children}</ConditionalNav>
            </AntdConfigProvider>
          </AntdRegistry>
        </ReactQueryWrapper>
      </body>
    </html>
  );
}
