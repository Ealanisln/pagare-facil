import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { PricingPlans, DEFAULT_PRICING_PLANS } from "@/components/PricingPlans";

export default function PricingPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 min-h-screen">
      <header className="py-6 px-8 border-b bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-indigo-600" />
              <Link href="/" className="font-bold text-xl text-indigo-900">
                Pagaré Fácil
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/autenticacion/iniciar-sesion" className="text-indigo-700 hover:text-indigo-500">
                Iniciar sesión
              </Link>
              <Button asChild>
                <Link href="/autenticacion/registro">Registrarse</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            Planes y precios
          </h1>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades
          </p>
        </div>
        
        <PricingPlans plans={DEFAULT_PRICING_PLANS} className="max-w-6xl mx-auto" />
        
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">
            ¿Tienes preguntas?
          </h2>
          <p className="text-indigo-700 mb-6">
            Nuestro equipo está disponible para ayudarte a elegir el plan adecuado para ti.
          </p>
          <Button variant="outline" asChild>
            <Link href="/contacto">Contactar con ventas</Link>
          </Button>
        </div>
      </main>
      
      <footer className="py-8 text-center text-indigo-800 bg-white border-t">
        <div className="container mx-auto">
          <span className="font-semibold">Pagaré Fácil</span> &copy; {new Date().getFullYear()} &mdash; Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
} 