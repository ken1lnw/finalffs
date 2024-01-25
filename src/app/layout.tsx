import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FFS Project",
  description: "FFS Proejct",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        <Navbar />
      
          {children}
      
      </body>
    </html>
  );
}
