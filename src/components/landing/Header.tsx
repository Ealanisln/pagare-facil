"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2">
        <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <span className="font-bold text-xl text-indigo-900">Pagaré Fácil</span>
      </div>
      <nav className="hidden md:flex space-x-6">
        <NavLink href="#caracteristicas">Características</NavLink>
        <NavLink href="#como-funciona">Cómo Funciona</NavLink>
        <NavLink href="#preguntas">Preguntas</NavLink>
      </nav>
      <Button variant="outline" className="hidden md:flex border-indigo-600 text-indigo-600 hover:bg-indigo-50" asChild>
        <Link href="/">Iniciar Sesión</Link>
      </Button>
    </motion.header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="text-indigo-700 hover:text-indigo-500 font-medium relative group"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
  </a>
); 