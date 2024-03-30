import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/page";
import { getServerSession } from "next-auth/next"
import ProviderWrapper from "./SessionProvider";
import { Prompt } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });
const prompt = Prompt({ weight: '400',subsets: ["latin"] });


export const metadata: Metadata = {
  title: "FFS Project",
  description: "FFS Proejct",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (

    <html lang="en" className={prompt.className}>
      {/* <body className={inter.className}> */}
      <body>
      <ProviderWrapper>

        <Navbar />
      
          {children}
          </ProviderWrapper>

      </body>
    </html>

  );
}
