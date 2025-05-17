// src/app/landing-page.tsx

"use client";

import React, { type JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, Shield, Clock, FileText, Star, Zap, Lock, FileCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * LandingPage component para Pagaré Fácil SaaS
 * Muestra el servicio, características y llamadas a la acción.
 * @returns {JSX.Element} Página de inicio
 */
export function LandingPage(): JSX.Element {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Hero Section */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl text-indigo-900">Pagaré Fácil</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#caracteristicas" className="text-indigo-700 hover:text-indigo-500 font-medium">Características</a>
          <a href="#como-funciona" className="text-indigo-700 hover:text-indigo-500 font-medium">Cómo Funciona</a>
          <a href="#preguntas" className="text-indigo-700 hover:text-indigo-500 font-medium">Preguntas</a>
        </nav>
        <Button variant="outline" className="hidden md:flex" asChild>
          <Link href="/">Iniciar Sesión</Link>
        </Button>
      </header>
      
      <section className="flex flex-col md:flex-row items-center justify-between py-20 px-4 md:px-12 lg:px-24 container mx-auto">
        <div className="md:w-1/2 text-left md:pr-12 mb-12 md:mb-0">
          <Badge className="mb-4 px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white">Nuevo SaaS</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900 leading-tight">
            Simplifica préstamos legales con <span className="text-indigo-600 relative">Pagaré Fácil<span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-200 rounded-full"></span></span>
          </h1>
          <p className="text-lg text-indigo-800 mb-8 max-w-xl">
            Genera pagarés legalmente válidos al instante con nuestra plataforma intuitiva, segura y rápida. Perfecta para empresas, individuos y profesionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-md px-6 py-6 shadow-lg bg-indigo-600 hover:bg-indigo-700" asChild>
              <a href="#registro" className="flex items-center">Prueba Gratuita <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button variant="outline" size="lg" className="text-md px-6 py-6" asChild>
              <a href="#demo">Ver Demo</a>
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden border border-indigo-100">
            <div className="bg-indigo-600 h-12 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <Image 
              src="/dashboard-preview.png" 
              alt="Dashboard de Pagaré Fácil" 
              width={600}
              height={400}
              className="w-full h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // @ts-ignore - necesario para manejar el fallback
                target.src = 'https://placehold.co/600x400/indigo/white?text=Dashboard+Preview';
              }}
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        </div>
      </section>
      {/* Features Section */}
      <section id="caracteristicas" className="flex flex-col items-center py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-700">Características</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">¿Por qué elegir Pagaré Fácil?</h2>
            <p className="text-lg text-indigo-700 max-w-2xl mx-auto">Nuestra plataforma está diseñada para simplificar la creación de documentos legales sin complicaciones</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow border border-indigo-50 rounded-xl overflow-hidden">
              <div className="bg-indigo-50 p-3 rounded-full mb-6">
                <Zap className="text-indigo-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-900">Generación Instantánea</h3>
              <p className="text-indigo-700">Crea pagarés en segundos, listos para firmar y descargar en formato PDF.</p>
            </Card>
            
            <Card className="p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow border border-indigo-50 rounded-xl overflow-hidden">
              <div className="bg-indigo-50 p-3 rounded-full mb-6">
                <Lock className="text-indigo-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-900">Seguro y Privado</h3>
              <p className="text-indigo-700">Tus datos están encriptados y nunca se comparten. Cumplimos con todos los estándares de privacidad.</p>
            </Card>
            
            <Card className="p-8 flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow border border-indigo-50 rounded-xl overflow-hidden">
              <div className="bg-indigo-50 p-3 rounded-full mb-6">
                <FileCheck className="text-indigo-600 h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-900">Legalmente Válido</h3>
              <p className="text-indigo-700">Todos los documentos cumplen con los más recientes estándares legales en México.</p>
            </Card>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-indigo-50 rounded-xl p-6 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full">
                <Check className="text-green-500 h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">Interfaz intuitiva</h4>
                <p className="text-indigo-700">Diseñada para ser fácil de usar, incluso sin conocimientos legales previos.</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-6 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full">
                <Check className="text-green-500 h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">Personalización completa</h4>
                <p className="text-indigo-700">Adapta los términos, añade garantes y personaliza cada detalle del pagaré.</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-6 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full">
                <Check className="text-green-500 h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">Soporte técnico</h4>
                <p className="text-indigo-700">Asistencia disponible para resolver cualquier duda sobre la plataforma.</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 rounded-xl p-6 flex items-start gap-4">
              <div className="bg-white p-2 rounded-full">
                <Check className="text-green-500 h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">Actualizaciones legales</h4>
                <p className="text-indigo-700">Mantenemos los documentos actualizados según la legislación vigente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section className="py-16 px-4 flex flex-col items-center bg-indigo-50">
        <h2 className="text-3xl font-semibold text-indigo-900 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          <Card className="p-6 text-center">
            <span className="text-3xl text-indigo-600 mb-2">1️⃣</span>
            <h4 className="font-bold mt-2 mb-1">Enter Details</h4>
            <p className="text-indigo-800">Fill out the debtor, amount, and terms in our guided form.</p>
          </Card>
          <Card className="p-6 text-center">
            <span className="text-3xl text-indigo-600 mb-2">2️⃣</span>
            <h4 className="font-bold mt-2 mb-1">Add Guarantors</h4>
            <p className="text-indigo-800">Optionally include one or more guarantors for extra security.</p>
          </Card>
          <Card className="p-6 text-center">
            <span className="text-3xl text-indigo-600 mb-2">3️⃣</span>
            <h4 className="font-bold mt-2 mb-1">Download PDF</h4>
            <p className="text-indigo-800">Receive a ready-to-sign PDF instantly, legally formatted.</p>
          </Card>
        </div>
      </section>
      {/* Call to Action Section */}
      <section id="signup" className="py-16 flex flex-col items-center bg-white">
        <h2 className="text-3xl font-semibold text-indigo-900 mb-4">Ready to get started?</h2>
        <p className="text-lg text-indigo-800 mb-8">Try Pagaré fácil free for 14 days. No credit card required.</p>
        <Button size="lg" className="text-lg px-8 py-4 shadow-lg" asChild>
          <Link href="/" aria-label="Go to app">Access the App</Link>
        </Button>
      </section>
      {/* FAQ Section */}
      <section className="py-16 px-4 bg-indigo-50 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-indigo-900 mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl w-full space-y-6">
          <Card className="p-4">
            <h4 className="font-bold mb-1">Is my data safe?</h4>
            <p className="text-indigo-800">Absolutely. We use industry-standard encryption and never share your information.</p>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-1">Do I need legal knowledge?</h4>
            <p className="text-indigo-800">No! Our forms are simple, and our documents are always legally compliant.</p>
          </Card>
          <Card className="p-4">
            <h4 className="font-bold mb-1">Can I customize the pagaré?</h4>
            <p className="text-indigo-800">Yes, you can adjust terms, add guarantors, and more before generating your PDF.</p>
          </Card>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 text-center text-indigo-800 bg-white border-t mt-auto">
        <span className="font-semibold">Pagaré fácil</span> &copy; {new Date().getFullYear()} &mdash; All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
