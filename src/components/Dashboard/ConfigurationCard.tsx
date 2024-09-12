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
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Configuración de pagarés</CardTitle>
        <CardDescription>
          Configura la periodicidad y número de pagarés a generar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="signing_date">Fecha del pagaré</Label>
            <FullDatePicker
              selected={signingDate}
              onChange={(date) => setSigningDate(date)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="payment_day">Día de pago</Label>
            <DatePicker
              selected={paymentDay}
              onChange={(day) => setPaymentDay(day)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="periodicity">Periodicidad</Label>
            <Select onValueChange={setPeriodicity} value={periodicity}>
              <SelectTrigger>
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
          <div className="grid gap-3">
            <Label htmlFor="number_of_months">Número de períodos</Label>
            <Input
              id="number_of_months"
              type="number"
              value={numberOfMonths}
              onChange={(e) => setNumberOfMonths(parseInt(e.target.value))}
              min="1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
