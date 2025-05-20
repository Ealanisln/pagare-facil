// File: components/dashboard/ConfigurationCard.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FullDatePicker } from "@/components/FullDatePicker";
import { DatePicker } from "@/components/DatePicker";

interface ConfigurationCardProps {
  signingDate: Date | undefined;
  setSigningDate: (date: Date | undefined) => void;
  paymentDay: number | undefined;
  setPaymentDay: (day: number | undefined) => void;
  periodicity: string;
  setPeriodicity: (periodicity: string) => void;
  numberOfMonths: number;
  setNumberOfMonths: (months: number) => void;
}

export function ConfigurationCard({
  signingDate,
  setSigningDate,
  paymentDay,
  setPaymentDay,
  periodicity,
  setPeriodicity,
  numberOfMonths,
  setNumberOfMonths,
}: ConfigurationCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium">Configuración de pagarés</CardTitle>
        <CardDescription>
          Configura la periodicidad y número de pagarés a generar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5">
          <div className="space-y-2.5">
            <Label htmlFor="signing_date" className="text-sm font-medium">Fecha del pagaré</Label>
            <div className="w-full">
              <FullDatePicker
                selected={signingDate}
                onChange={(date) => setSigningDate(date)}
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="payment_day" className="text-sm font-medium">Día de pago</Label>
            <div className="w-full">
              <DatePicker
                selected={paymentDay}
                onChange={(day) => setPaymentDay(day)}
                className="w-full"
              />
            </div>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="periodicity" className="text-sm font-medium">Periodicidad</Label>
            <Select onValueChange={setPeriodicity} value={periodicity}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona la periodicidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="biweekly">Quincenal</SelectItem>
                <SelectItem value="monthly">Mensual</SelectItem>
                <SelectItem value="quarterly">Trimestral</SelectItem>
                <SelectItem value="semiannual">Semestral</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="number_of_months" className="text-sm font-medium">Número de períodos</Label>
            <Input
              id="number_of_months"
              type="number"
              value={numberOfMonths}
              onChange={(e) => setNumberOfMonths(parseInt(e.target.value))}
              min="1"
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
