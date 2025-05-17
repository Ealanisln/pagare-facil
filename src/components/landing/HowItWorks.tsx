"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const HowItWorks = () => {
  const steps = [
    {
      emoji: "1️⃣",
      title: "Ingresa los Detalles",
      description: "Completa la información del deudor, monto y términos en nuestro formulario guiado."
    },
    {
      emoji: "2️⃣",
      title: "Agrega Garantes",
      description: "Opcionalmente incluye uno o más garantes para mayor seguridad."
    },
    {
      emoji: "3️⃣",
      title: "Descarga el PDF",
      description: "Recibe un PDF listo para firmar al instante, con formato legal válido."
    }
  ];

  return (
    <section 
      id="como-funciona" 
      className="relative py-24 px-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Cómo Funciona</h2>
          <p className="text-lg text-indigo-700/80 max-w-2xl mx-auto">
            Genera pagarés legalmente vinculantes en tres simples pasos
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full p-8 text-center group hover:shadow-xl transition-all duration-300 border border-indigo-100 overflow-hidden relative bg-white">
                {/* Step number indicator */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-indigo-100 rounded-full opacity-20"></div>
                
                <span className="text-4xl mb-5 block">{step.emoji}</span>
                <h4 className="text-xl font-bold mb-3 text-indigo-900 group-hover:text-indigo-700 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-indigo-700/80">
                  {step.description}
                </p>
                
                {/* Visual connector between cards (only for first two steps) */}
                {index < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-indigo-600 font-medium">
            Todo el proceso toma menos de 5 minutos
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 