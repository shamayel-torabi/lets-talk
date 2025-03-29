import "@stream-io/video-react-sdk/dist/css/styles.css";

import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "نشست ویدئویی",
  description: "برنامه نشست ویدئویی",
};

import { faIR } from '@/constants/fa-IR'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={faIR}>
      <html lang="fa" dir="rtl">
        <body className={`${vazirmatn.className}} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
