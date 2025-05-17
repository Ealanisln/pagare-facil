"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FaqItem = ({ question, answer, isOpen, toggleOpen }: FaqItemProps) => {
  return (
    <motion.div 
      className="border border-indigo-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={toggleOpen}
      >
        <h4 className="font-semibold text-indigo-900">{question}</h4>
        <div className="text-indigo-500 flex-shrink-0 ml-4">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 text-indigo-700/80">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const faqItems = [
    {
      question: "¿Mis datos están seguros?",
      answer: "Absolutamente. Utilizamos encriptación de nivel industrial y nunca compartimos tu información. Todos los datos se almacenan de forma segura y cumplimos con las normativas de protección de datos vigentes."
    },
    {
      question: "¿Necesito conocimientos legales?",
      answer: "¡No! Nuestros formularios son sencillos, y nuestros documentos siempre cumplen con la normativa legal. La plataforma está diseñada para ser intuitiva y fácil de usar, incluso si no tienes experiencia previa con documentos legales."
    },
    {
      question: "¿Puedo personalizar el pagaré?",
      answer: "Sí, puedes ajustar términos, agregar garantes y mucho más antes de generar tu PDF. Nuestra plataforma ofrece múltiples opciones de personalización para adaptar el pagaré a tus necesidades específicas."
    },
    {
      question: "¿Cuánto tiempo toma crear un pagaré?",
      answer: "El proceso completo generalmente toma menos de 5 minutos. Simplemente completa el formulario con la información requerida, personaliza según necesites, y descarga tu documento listo para usar."
    },
    {
      question: "¿Los pagarés tienen validez legal?",
      answer: "Sí, todos nuestros pagarés cumplen con la legislación mexicana vigente y son legalmente vinculantes. Nos mantenemos actualizados con cualquier cambio en la normativa para garantizar que tus documentos siempre sean válidos."
    }
  ];

  return (
    <section id="preguntas" className="py-24 px-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Preguntas Frecuentes</h2>
          <p className="text-lg text-indigo-700/80 max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestra plataforma
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFaq(index)}
            />
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-indigo-700">
            ¿Tienes más preguntas? <a href="#contacto" className="text-indigo-600 font-medium hover:underline">Contáctanos</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}; 