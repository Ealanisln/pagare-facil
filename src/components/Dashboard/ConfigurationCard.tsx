// File: components/dashboard/ConfigurationCard.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FullDatePicker } from "@/components/FullDatePicker";
import { Calendar, CalendarDays, RefreshCw, Hash } from "lucide-react";
import { PromissoryNoteFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface ConfigurationCardProps {
  control: Control<PromissoryNoteFormData>;
  className?: string;
}

export function ConfigurationCard({
  control,
  className,
}: ConfigurationCardProps) {
  return (
    <Card variant="glass" className={cn("col-span-full xl:col-span-1", className)}>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-lg font-semibold">3</span>
        </div>
        <div>
          <CardTitle>Configuracion</CardTitle>
          <CardDescription>
            Periodicidad y numero de pagares
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="signingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-foreground/70" />
                  Fecha del pagare
                </FormLabel>
                <FormControl>
                  <FullDatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    testId="signing-date-picker"
                  />
                </FormControl>
                <FormDescription>Fecha de firma del documento</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="firstPaymentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-foreground/70" />
                  Fecha del primer pago
                </FormLabel>
                <FormControl>
                  <FullDatePicker
                    selected={field.value}
                    onChange={field.onChange}
                    testId="first-payment-date-picker"
                  />
                </FormControl>
                <FormDescription>
                  Fecha exacta en que vence el primer pagare
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="periodicity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-foreground/70" />
                  Periodicidad
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona la periodicidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="biweekly">Quincenal</SelectItem>
                    <SelectItem value="monthly">Mensual</SelectItem>
                    <SelectItem value="quarterly">Trimestral</SelectItem>
                    <SelectItem value="semiannual">Semestral</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Frecuencia de los pagos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="numberOfMonths"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-foreground/70" />
                  Numero de periodos
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === "") {
                        field.onChange(undefined);
                      } else if (/^\d+$/.test(v)) {
                        field.onChange(parseInt(v, 10));
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Cantidad de pagares a generar
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
