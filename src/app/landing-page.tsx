// src/app/landing-page.tsx

"use client";

import React, { type JSX } from "react";
// Import components individually
import { Header } from "@/components/Landing/Header";
import { Hero } from "@/components/Landing/Hero";
import { Features } from "@/components/Landing/Features";
import { HowItWorks } from "@/components/Landing/HowItWorks";
import { Cta } from "@/components/Landing/Cta";
import { Faq } from "@/components/Landing/Faq";
import { Footer } from "@/components/Landing/Footer";

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
