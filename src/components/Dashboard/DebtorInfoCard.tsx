// File: components/dashboard/DebtorInfoCard.tsx
import { Control } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, Home, Building, Phone } from "lucide-react";
import { PromissoryNoteFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface DebtorInfoCardProps {
  control: Control<PromissoryNoteFormData>;
  className?: string;
}

export function DebtorInfoCard({ control, className }: DebtorInfoCardProps) {
  return (
    <Card variant="glass" className={cn("col-span-full xl:col-span-1", className)}>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-lg font-semibold">2</span>
        </div>
        <div>
          <CardTitle>Datos del deudor</CardTitle>
          <CardDescription>Informacion de la persona que debe</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="debtorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del deudor</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Maria Garcia Martinez"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Nombre completo del deudor</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="debtorAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Av. Constitucion 123"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Direccion completa del deudor</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="debtorCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poblacion</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Guadalajara, Jalisco"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Ciudad y estado del deudor</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="debtorPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono (opcional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      type="tel"
                      placeholder="Ej: 55 1234 5678"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>Numero de contacto del deudor</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
