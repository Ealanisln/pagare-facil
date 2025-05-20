"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  FileText,
  Home,
  PackageIcon,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    name: "Usuarios",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Pagarés",
    href: "/admin/notes",
    icon: FileText,
  },
  {
    name: "Planes",
    href: "/admin/plans",
    icon: PackageIcon,
  },
  {
    name: "Reportes",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    name: "Configuración",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r">
      <div className="h-0 flex-1 flex flex-col">
        <div className="flex items-center h-16 px-6 border-b shrink-0">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <PackageIcon className="h-6 w-6 text-primary" />
            <span>Pagaré Fácil Admin</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
} 