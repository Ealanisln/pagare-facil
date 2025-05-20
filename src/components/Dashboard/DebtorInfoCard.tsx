// File: components/dashboard/DebtorInfoCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DebtorInfoCardProps {
  debtorName: string;
  debtorAddress: string;
  debtorCity: string;
  debtorPhone: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DebtorInfoCard({
  debtorName,
  debtorAddress,
  debtorCity,
  debtorPhone,
  onInputChange
}: DebtorInfoCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Datos del deudor</CardTitle>
        <CardDescription>
          Ingresa los datos del deudor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5">
          <div className="space-y-2.5">
            <Label htmlFor="debtname" className="text-sm font-medium">Nombre del deudor</Label>
            <Input 
              id="debtname" 
              name="debtname" 
              type="text" 
              className="w-full" 
              placeholder="Nombre completo"
              value={debtorName}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="debt_address" className="text-sm font-medium">Dirección</Label>
            <Input
              id="debt_address"
              name="debt_address"
              type="text"
              className="w-full"
              placeholder="Calle y número"
              value={debtorAddress}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="debt_city" className="text-sm font-medium">Población</Label>
            <Input 
              id="debt_city" 
              name="debt_city" 
              className="w-full" 
              placeholder="Ciudad o localidad"
              value={debtorCity}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="debt_phone" className="text-sm font-medium">
              Teléfono del deudor (Opcional)
            </Label>
            <Input 
              id="debt_phone" 
              name="debt_phone" 
              type="tel" 
              className="w-full" 
              placeholder="10 dígitos"
              value={debtorPhone}
              onChange={onInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}