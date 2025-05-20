import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-8 border-b">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          <Link href="/" className="font-bold text-xl text-indigo-900">
            Pagaré Fácil
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {children}
        </div>
      </main>
      
      <footer className="py-6 px-8 border-t text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Pagaré Fácil. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
} 