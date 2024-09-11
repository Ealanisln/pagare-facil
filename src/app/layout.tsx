import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pagaré fácil",
  description:
    "Genera pagarés personalizados fácilmente. Proporciona una interfaz fácil de usar para ingresar información del deudor, condiciones de pago y detalles del garante, y genera un documento PDF descargable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
