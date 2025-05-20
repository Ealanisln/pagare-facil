// File: components/dashboard/GeneralInfoCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface GeneralInfoCardProps {
  name: string;
  amount: string;
  interestRate: string;
  paymentPlace: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function GeneralInfoCard({
  name,
  amount,
  interestRate,
  paymentPlace,
  onInputChange
}: GeneralInfoCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Información general</CardTitle>
        <CardDescription>
          Generá tus pagarés de forma rápida y sencilla.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5">
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-sm font-medium">
              Nombre de la persona a quién deberá pagarse
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              className="w-full transition-all focus-visible:ring-primary"
              placeholder="Ingresa el nombre completo"
              value={name}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="amount" className="text-sm font-medium">Monto</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">$</span>
              <Input
                id="amount"
                name="amount"
                type="text"
                pattern="\d+(\.\d{0,2})?"
                inputMode="decimal"
                placeholder="0.00"
                className="pl-7"
                value={amount}
                onChange={onInputChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="interest_rate" className="text-sm font-medium">
              Tasa de interés (%)
            </Label>
            <div className="relative">
              <Input
                id="interest_rate"
                name="interest_rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="0.00"
                value={interestRate}
                onChange={onInputChange}
                required
              />
              <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="payment_place" className="text-sm font-medium">Lugar de pago</Label>
            <Input 
              id="payment_place" 
              name="payment_place" 
              className="w-full" 
              placeholder="Ciudad o localidad"
              value={paymentPlace}
              onChange={onInputChange}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
