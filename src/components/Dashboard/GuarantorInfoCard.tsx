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
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Información de Avales</CardTitle>
        <CardDescription>
          Selecciona el número de avales y proporciona su información.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="number_of_guarantors">Número de Avales</Label>
            <Select
              onValueChange={(value) => {
                const num = parseInt(value);
                setNumberOfGuarantors(num);
              }}
              value={numberOfGuarantors.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el número de avales" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {[...Array(numberOfGuarantors)].map((_, index) => (
            <div key={index} className="grid gap-6">
              <h3 className="text-lg font-semibold">Aval {index + 1}</h3>
              <div className="grid gap-3">
                <Label htmlFor={`guarantor_name_${index}`}>Nombre del Aval</Label>
                <Input
                  id={`guarantor_name_${index}`}
                  type="text"
                  className="w-full"
                  value={guarantors[index]?.name || ""}
                  onChange={(e) => handleGuarantorChange(index, "name", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor={`guarantor_address_${index}`}>Dirección del Aval</Label>
                <Input
                  id={`guarantor_address_${index}`}
                  type="text"
                  className="w-full"
                  value={guarantors[index]?.address || ""}
                  onChange={(e) => handleGuarantorChange(index, "address", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor={`guarantor_city_${index}`}>Ciudad del Aval</Label>
                <Input
                  id={`guarantor_city_${index}`}
                  type="text"
                  className="w-full"
                  value={guarantors[index]?.city || ""}
                  onChange={(e) => handleGuarantorChange(index, "city", e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor={`guarantor_phone_${index}`}>Teléfono del Aval</Label>
                <Input
                  id={`guarantor_phone_${index}`}
                  type="tel"
                  className="w-full"
                  value={guarantors[index]?.phone || ""}
                  onChange={(e) => handleGuarantorChange(index, "phone", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}