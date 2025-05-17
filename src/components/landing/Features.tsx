"use client";

import { Check, Zap, Lock, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const Features = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      }
    })
  };

  return (
    <section id="caracteristicas" className="relative py-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-50 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-50 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-2 px-3 py-1 text-xs bg-indigo-100 text-indigo-700">Características</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">¿Por qué elegir Pagaré Fácil?</h2>
            <p className="text-lg text-indigo-700/80 max-w-2xl mx-auto">
              Nuestra plataforma está diseñada para simplificar la creación de documentos legales sin complicaciones
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Zap className="text-indigo-600 h-8 w-8" />,
              title: "Generación Instantánea",
              description: "Crea pagarés en segundos, listos para firmar y descargar en formato PDF."
            },
            {
              icon: <Lock className="text-indigo-600 h-8 w-8" />,
              title: "Seguro y Privado",
              description: "Tus datos están encriptados y nunca se comparten. Cumplimos con todos los estándares de privacidad."
            },
            {
              icon: <FileCheck className="text-indigo-600 h-8 w-8" />,
              title: "Legalmente Válido",
              description: "Todos los documentos cumplen con los más recientes estándares legales en México."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="h-full p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-50 rounded-xl overflow-hidden group">
                <div className="bg-indigo-50 p-4 rounded-full mb-6 group-hover:bg-indigo-100 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-indigo-900">{feature.title}</h3>
                <p className="text-indigo-700/80">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "Interfaz intuitiva",
              description: "Diseñada para ser fácil de usar, incluso sin conocimientos legales previos."
            },
            {
              title: "Personalización completa",
              description: "Adapta los términos, añade garantes y personaliza cada detalle del pagaré."
            },
            {
              title: "Soporte técnico",
              description: "Asistencia disponible para resolver cualquier duda sobre la plataforma."
            },
            {
              title: "Actualizaciones legales",
              description: "Mantenemos los documentos actualizados según la legislación vigente."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="bg-white p-2 rounded-full shadow-sm">
                  <Check className="text-green-500 h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-1">{item.title}</h4>
                  <p className="text-indigo-700/80">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 