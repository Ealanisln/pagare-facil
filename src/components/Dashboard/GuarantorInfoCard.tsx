// File: components/dashboard/GuarantorInfoCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Guarantor } from "@/lib/schemas";

interface GuarantorInfoCardProps {
  numberOfGuarantors: number;
  setNumberOfGuarantors: (num: number) => void;
  guarantors: Guarantor[];
  handleGuarantorChange: (index: number, field: keyof Guarantor, value: string) => void;
}

export function GuarantorInfoCard({
  numberOfGuarantors,
  setNumberOfGuarantors,
  guarantors,
  handleGuarantorChange
}: GuarantorInfoCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Información de Avales</CardTitle>
        <CardDescription>
          Selecciona el número de avales y proporciona su información.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5">
          <div className="space-y-2.5">
            <Label htmlFor="number_of_guarantors" className="text-sm font-medium">Número de Avales</Label>
            <Select
              onValueChange={(value) => {
                const num = parseInt(value);
                setNumberOfGuarantors(num);
              }}
              value={numberOfGuarantors.toString()}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona el número de avales" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {[...Array(numberOfGuarantors)].map((_, index) => (
            <div key={index} className="space-y-5 pt-3 border-t border-border">
              <h3 className="text-base font-medium">Aval {index + 1}</h3>
              <div className="space-y-2.5">
                <Label htmlFor={`guarantor_name_${index}`} className="text-sm font-medium">Nombre del Aval</Label>
                <Input
                  id={`guarantor_name_${index}`}
                  type="text"
                  className="w-full"
                  value={guarantors[index]?.name || ""}
                  onChange={(e) => handleGuarantorChange(index, "name", e.target.value)}
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor={`guarantor_address_${index}`} className="text-sm font-medium">Dirección del Aval</Label>
                <Input
                  id={`guarantor_address_${index}`}
                  type="text"
                  className="w-full"
                  value={guarantors[index]?.address || ""}
                  onChange={(e) => handleGuarantorChange(index, "address", e.target.value)}
                  placeholder="Calle y número"
                  required
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor={`guarantor_city_${index}`} className="text-sm font-medium">Ciudad del Aval</Label>
                <Input
                  id={`guarantor_city_${index}`}
                  type="text"
                  className="w-full"
                  value={guarantors[index]?.city || ""}
                  onChange={(e) => handleGuarantorChange(index, "city", e.target.value)}
                  placeholder="Ciudad o localidad"
                  required
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor={`guarantor_phone_${index}`} className="text-sm font-medium">Teléfono del Aval</Label>
                <Input
                  id={`guarantor_phone_${index}`}
                  type="tel"
                  className="w-full"
                  value={guarantors[index]?.phone || ""}
                  onChange={(e) => handleGuarantorChange(index, "phone", e.target.value)}
                  placeholder="10 dígitos"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}