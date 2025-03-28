import "react-datepicker/dist/react-datepicker.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fa" dir="rtl">
        <body className={`${vazirmatn.className}} antialiased`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
