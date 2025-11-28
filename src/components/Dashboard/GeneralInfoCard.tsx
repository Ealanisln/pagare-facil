// File: components/dashboard/GeneralInfoCard.tsx
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
import { User, DollarSign, Percent, MapPin } from "lucide-react";
import { PromissoryNoteFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface GeneralInfoCardProps {
  control: Control<PromissoryNoteFormData>;
  className?: string;
}

export function GeneralInfoCard({ control, className }: GeneralInfoCardProps) {
  return (
    <Card variant="glass" className={cn("col-span-full xl:col-span-1", className)}>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-lg font-semibold">1</span>
        </div>
        <div>
          <CardTitle>Informacion general</CardTitle>
          <CardDescription>Datos del beneficiario del pagare</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del beneficiario</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Juan Perez Lopez"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Persona a quien debera pagarse
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                          field.onChange(value === "" ? undefined : parseFloat(value));
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>Monto total del pagare en MXN</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tasa de interes (%)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      placeholder="0.00"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : parseFloat(value));
                      }}
                    />
                  </div>
                </FormControl>
                <FormDescription>Tasa de interes anual</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="payment_place"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lugar de pago</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Monterrey, Nuevo Leon"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Ciudad donde se realizara el pago
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
