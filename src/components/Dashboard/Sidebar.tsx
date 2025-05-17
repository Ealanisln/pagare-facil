// File: components/dashboard/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  Home,
  Package2,
  Users,
  Settings,
  CreditCard,
  HelpCircle,
  Files,
} from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl text-indigo-900">Pagaré Fácil</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <NavItem
          href="/dashboard"
          icon={<Home className="h-4 w-4" />}
          label="Dashboard"
          isActive={pathname === "/dashboard"}
        />
        <NavItem
          href="/dashboard/promissory-notes"
          icon={<Files className="h-4 w-4" />}
          label="Mis pagarés"
          isActive={pathname.startsWith("/dashboard/promissory-notes")}
        />
        <NavItem
          href="/dashboard/clients"
          icon={<Users className="h-4 w-4" />}
          label="Clientes"
          isActive={pathname.startsWith("/dashboard/clients")}
        />
        <NavItem
          href="/dashboard/templates"
          icon={<Package2 className="h-4 w-4" />}
          label="Plantillas"
          isActive={pathname.startsWith("/dashboard/templates")}
        />
        
        <div className="pt-4 mt-4 border-t border-gray-200">
          <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase">
            Cuenta
          </h3>
          <NavItem
            href="/dashboard/settings"
            icon={<Settings className="h-4 w-4" />}
            label="Configuración"
            isActive={pathname.startsWith("/dashboard/settings")}
          />
          <NavItem
            href="/dashboard/billing"
            icon={<CreditCard className="h-4 w-4" />}
            label="Facturación"
            isActive={pathname.startsWith("/dashboard/billing")}
          />
          <NavItem
            href="/dashboard/help"
            icon={<HelpCircle className="h-4 w-4" />}
            label="Ayuda"
            isActive={pathname.startsWith("/dashboard/help")}
          />
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium">Plan Actual</p>
            <p className="text-xs text-muted-foreground">Free Trial</p>
          </div>
          <Link 
            href="/pricing"
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
          >
            Actualizar
          </Link>
        </div>
      </div>
    </div>
  );
}