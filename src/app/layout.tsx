import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BankAccountProvider } from "@/context/bankAccountContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyManager",
  description: "your expense manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BankAccountProvider>{children}</BankAccountProvider>
      </body>
    </html>
  );
}
