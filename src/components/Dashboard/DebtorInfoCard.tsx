// File: components/dashboard/DebtorInfoCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function DebtorInfoCard() {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Datos del deudor</CardTitle>
        <CardDescription>
          Ingresa los datos del deudor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="debtname">Nombre del deudor:</Label>
            <Input id="debtname" name="debtname" type="text" className="w-full" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="debt_address">Dirección</Label>
            <Input
              id="debt_address"
              name="debt_address"
              type="text"
              className="w-full"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="debt_city">Población</Label>
            <Input id="debt_city" name="debt_city" className="w-full" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="debt_phone">
              Teléfono del deudor (Opcional)
            </Label>
            <Input id="debt_phone" name="debt_phone" type="tel" className="w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}