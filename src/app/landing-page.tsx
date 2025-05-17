// src/app/landing-page.tsx

"use client";

import React, { type JSX } from "react";
import { 
  Header, 
  Hero, 
  Features, 
  HowItWorks, 
  Cta, 
  Faq, 
  Footer 
} from "@/components/landing";

/**
 * LandingPage component para Pagaré Fácil SaaS
 * Muestra el servicio, características y llamadas a la acción.
 * @returns {JSX.Element} Página de inicio
 */
export function LandingPage(): JSX.Element {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex flex-col">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Cta />
      <Faq />
      <Footer />
    </div>
  );
}

export default LandingPage;
