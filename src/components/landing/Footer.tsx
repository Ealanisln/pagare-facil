"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Producto",
      links: [
        { name: "Características", href: "#caracteristicas" },
        { name: "Cómo Funciona", href: "#como-funciona" },
        { name: "Precios", href: "#precios" },
        { name: "FAQ", href: "#preguntas" },
      ]
    },
    {
      title: "Compañía",
      links: [
        { name: "Acerca de", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contacto", href: "#contacto" },
        { name: "Términos", href: "#" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacidad", href: "#" },
        { name: "Términos", href: "#" },
        { name: "Cookies", href: "#" },
        { name: "Licencias", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-indigo-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and company info */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-indigo-900">Pagaré Fácil</span>
            </div>
            <p className="text-indigo-700/80 mb-6 max-w-md">
              Generador de pagarés legalmente válidos para empresas e individuos. 
              Simplificamos los documentos legales para que tú puedas centrarte en lo importante.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.201 18.691a.608.608 0 01-.813.199c-2.333-1.42-5.278-1.742-8.732-.944a.608.608 0 11-.181-1.2c3.783-.878 7.052-.498 9.627 1.132a.606.606 0 01.199.813zm1.389-3.09a.76.76 0 01-1.039.253c-2.675-1.639-6.751-2.111-9.911-1.154a.76.76 0 11-.448-1.45c3.611-1.104 8.093-.568 11.14 1.313a.76.76 0 01.258 1.039zm.12-3.208c-3.21-1.899-8.505-2.073-11.574-1.146a.915.915 0 11-.531-1.749c3.527-1.064 9.381-.853 13.076 1.324a.914.914 0 01-.972 1.57z" />
                </svg>
              </a>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </a>
            </div>
          </motion.div>
          
          {/* Links Section */}
          {footerLinks.map((section, index) => (
            <motion.div 
              key={index}
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-semibold text-indigo-900 mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-indigo-600/80 hover:text-indigo-800 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-indigo-100 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-indigo-600/80 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &copy; {currentYear} Pagaré Fácil. Todos los derechos reservados.
          </motion.p>
          <motion.div 
            className="mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Iniciar Sesión
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}; 