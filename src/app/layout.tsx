import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import AntdConfigProvider from "@/providers/AntdConfigProvider";
import SessionProvider from "@/providers/SessionProvider";
import QueryProvider from "@/providers/QueryProvider";
import NextTopLoader from "nextjs-toploader";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Boxful",
    template: "%s | Boxful",
  },
  description: "Boxful",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} antialiased`}>
        <SessionProvider>
          <QueryProvider>
            <AntdRegistry>
              <AntdConfigProvider>
                <NextTopLoader showSpinner={false} color="#FF3401" height={4}/>
                {children}
              </AntdConfigProvider>
            </AntdRegistry>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
