// File: components/dashboard/GuarantorInfoCard.tsx
import { Control, UseFormWatch, UseFormSetValue } from "react-hook-form";
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
import { User, Home, Building, Phone, Users } from "lucide-react";
import { PromissoryNoteFormData, Guarantor } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface GuarantorInfoCardProps {
  control: Control<PromissoryNoteFormData>;
  watch: UseFormWatch<PromissoryNoteFormData>;
  setValue: UseFormSetValue<PromissoryNoteFormData>;
  className?: string;
}

export function GuarantorInfoCard({
  control,
  watch,
  setValue,
  className,
}: GuarantorInfoCardProps) {
  const numberOfGuarantors = watch("numberOfGuarantors");
  const guarantors = watch("guarantors");

  const handleGuarantorChange = (
    index: number,
    field: keyof Guarantor,
    value: string
  ) => {
    const updatedGuarantors = [...guarantors];
    if (!updatedGuarantors[index]) {
      updatedGuarantors[index] = { name: "", address: "", city: "", phone: "" };
    }
    updatedGuarantors[index][field] = value;
    setValue("guarantors", updatedGuarantors);
  };

  return (
    <Card variant="glass" className={cn("col-span-full", className)}>
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <CardTitle>Informacion de Avales</CardTitle>
          <CardDescription>
            Selecciona el numero de avales y proporciona su informacion
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={control}
            name="numberOfGuarantors"
            render={({ field }) => (
              <FormItem className="max-w-xs">
                <FormLabel>Numero de Avales</FormLabel>
                <Select
                  onValueChange={(value) => {
                    const num = parseInt(value);
                    field.onChange(num);
                    // Initialize guarantors array when number changes
                    if (num > guarantors.length) {
                      const newGuarantors = [...guarantors];
                      for (let i = guarantors.length; i < num; i++) {
                        newGuarantors.push({
                          name: "",
                          address: "",
                          city: "",
                          phone: "",
                        });
                      }
                      setValue("guarantors", newGuarantors);
                    }
                  }}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el numero de avales" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Sin aval</SelectItem>
                    <SelectItem value="1">1 aval</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Los avales garantizan el pago del pagare
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {[...Array(numberOfGuarantors)].map((_, index) => (
            <div
              key={index}
              className="grid gap-6 p-6 rounded-lg border border-border/50 bg-muted/30"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm">
                  {index + 1}
                </div>
                Aval {index + 1}
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre del Aval</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Roberto Sanchez"
                      value={guarantors[index]?.name || ""}
                      onChange={(e) =>
                        handleGuarantorChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Direccion del Aval
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Calle Principal 456"
                      value={guarantors[index]?.address || ""}
                      onChange={(e) =>
                        handleGuarantorChange(index, "address", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ciudad del Aval</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Ej: Ciudad de Mexico"
                      value={guarantors[index]?.city || ""}
                      onChange={(e) =>
                        handleGuarantorChange(index, "city", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Telefono del Aval (opcional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 z-10 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      type="tel"
                      placeholder="Ej: 55 9876 5432"
                      value={guarantors[index]?.phone || ""}
                      onChange={(e) =>
                        handleGuarantorChange(index, "phone", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
