// File: components/dashboard/Header.tsx
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, FileText } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border/40 bg-background/80 backdrop-blur-lg px-4 sm:px-6">
      {/* Logo/Brand */}
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold text-lg hidden sm:inline">
          Pagare Facil
        </span>
      </div>

      {/* Desktop: Theme toggle */}
      <div className="hidden sm:flex items-center gap-4">
        <ThemeToggle />
      </div>

      {/* Mobile: Sheet menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetTitle className="sr-only">Menu de navegacion</SheetTitle>
          <div className="flex flex-col gap-6 py-4">
            {/* Brand */}
            <div className="flex items-center gap-3 px-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-xl">Pagare Facil</span>
            </div>

            <Separator />

            {/* Theme toggle section */}
            <div className="px-2">
              <p className="text-sm text-muted-foreground mb-3">Apariencia</p>
              <ThemeToggle expanded />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
