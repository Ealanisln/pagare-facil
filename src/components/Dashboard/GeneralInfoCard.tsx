// File: components/dashboard/GeneralInfoCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function GeneralInfoCard() {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Información general</CardTitle>
        <CardDescription>
          Generá tus pagarés de forma rápida y sencilla.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">
              Nombre de la persona a quién deberá pagarse:
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              className="w-full"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Monto</Label>
            <Input
              id="amount"
              name="amount"
              type="text"
              pattern="\d+(\.\d{0,2})?"
              inputMode="decimal"
              placeholder="0.00"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="interest_rate">
              Tasa de interés (%)
            </Label>
            <Input
              id="interest_rate"
              name="interest_rate"
              type="number"
              step="0.01"
              min="0"
              max="100"
              placeholder="0.00"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="payment_place">Lugar de pago</Label>
            <Input id="payment_place" name="payment_place" className="w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
