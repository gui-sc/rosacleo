import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from "next";
import localFont from "next/font/local";
import { CartProvider } from "./contexts/cartContext";
import { AuthProvider } from "./contexts/authContext";
import { ToastContainer } from 'react-toastify';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rosacleo",
  description: "Rosacleo - E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen min-w-screen bg-[--background] text-[--foreground]`}
      >
        <AuthProvider>
          <CartProvider>
            {children}
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
