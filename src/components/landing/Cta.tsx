"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Cta = () => {
  return (
    <section id="registro" className="relative py-24 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-50 rounded-full opacity-70 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-50 rounded-full opacity-70 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-indigo-900 mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-indigo-700/80 mb-10 max-w-2xl mx-auto">
            Prueba Pagaré Fácil <span className="font-semibold">gratis por 14 días</span>. No se requiere tarjeta de crédito.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 shadow-xl hover:shadow-2xl transition-all duration-300" 
              asChild
            >
              <Link href="/" className="flex items-center">
                Acceder a la Aplicación <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
          
          <p className="mt-6 text-indigo-500 text-sm">
            Sin compromisos. Cancela cuando quieras.
          </p>
        </motion.div>
        
        {/* Testimonial or social proof could go here */}
        <div className="mt-16 flex justify-center items-center space-x-8">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="font-bold text-3xl text-indigo-700">100%</div>
            <div className="text-indigo-600/80 text-sm">Seguro</div>
          </motion.div>
          
          <div className="h-10 w-px bg-indigo-100"></div>
          
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="font-bold text-3xl text-indigo-700">5 min</div>
            <div className="text-indigo-600/80 text-sm">Proceso</div>
          </motion.div>
          
          <div className="h-10 w-px bg-indigo-100"></div>
          
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="font-bold text-3xl text-indigo-700">24/7</div>
            <div className="text-indigo-600/80 text-sm">Disponible</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 