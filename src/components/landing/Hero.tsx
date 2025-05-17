"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4 md:px-12 lg:px-24 container mx-auto">
      {/* Background elements */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl opacity-20 z-0"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
        <motion.div 
          className="md:w-1/2 text-left md:pr-12 mb-12 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white shadow-md">
            Nuevo SaaS
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900 leading-tight">
            Simplifica préstamos legales con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
              Pagaré Fácil
            </span>
          </h1>
          <p className="text-lg text-indigo-800/80 mb-8 max-w-xl">
            Genera pagarés legalmente válidos al instante con nuestra plataforma intuitiva, 
            segura y rápida. Perfecta para empresas, individuos y profesionales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="text-md px-6 py-6 shadow-lg bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300" 
              asChild
            >
              <a href="#registro" className="flex items-center">
                Prueba Gratuita <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-md px-6 py-6 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300" 
              asChild
            >
              <a href="#demo">Ver Demo</a>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="md:w-1/2 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden border border-indigo-100">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 h-12 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 h-80 flex items-center justify-center">
              <div className="text-center text-indigo-900/50">
                <svg 
                  className="w-24 h-24 mx-auto mb-4 text-indigo-300" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-lg font-medium">Dashboard Preview</p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
          <div className="absolute -top-6 -left-6 w-48 h-48 bg-blue-200 rounded-full filter blur-3xl opacity-30 z-0"></div>
        </motion.div>
      </div>
    </section>
  );
}; 