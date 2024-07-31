"use client";

import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PromissoryNotePDF from "@/components/PromissoryNotePDF";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { DatePicker } from "../DatePicker";
import { FullDatePicker } from "@/components/FullDatePicker";
import { z } from "zod";

const promissoryNoteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  amount: z.number().positive("Amount must be positive"),
  payment_place: z.string().min(1, "Payment place is required"),
  debtorName: z.string().min(1, "Debtor name is required"),
  debtorAddress: z.string().min(1, "Debtor address is required"),
  debtorCity: z.string().min(1, "Debtor city is required"),
  signingDate: z.date(),
  paymentDay: z.number().min(1).max(31),
  numberOfMonths: z.number().positive().int(),
});

// TypeScript type derived from the Zod schema
type PromissoryNote = z.infer<typeof promissoryNoteSchema>;

export function Dashboard() {
  const [paymentDay, setPaymentDay] = useState<number | undefined>(undefined);
  const [signingDate, setSigningDate] = useState<Date | undefined>(undefined);

  const [formData, setFormData] = useState<PromissoryNote | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const rawData: PromissoryNote = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      amount: parseFloat(
        (form.elements.namedItem("amount") as HTMLInputElement).value
      ),
      payment_place: (
        form.elements.namedItem("payment_place") as HTMLInputElement
      ).value,
      debtorName: (form.elements.namedItem("debtname") as HTMLInputElement)
        .value,
      debtorAddress: (
        form.elements.namedItem("debt_address") as HTMLInputElement
      ).value,
      debtorCity: (form.elements.namedItem("debt_city") as HTMLInputElement)
        .value,
      signingDate: signingDate!,
      paymentDay: paymentDay!,
      numberOfMonths: parseInt(
        (form.elements.namedItem("months") as HTMLInputElement).value
      ),
    };

    try {
      const validatedData = promissoryNoteSchema.parse(rawData);
      setFormData(validatedData);
      console.log("Form data:", validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Bienvenido a Pagaré fácil
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  Beta
                </Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
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
                            defaultValue="John Doe"
                          />
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="amount">Monto</Label>
                          <Input
                            id="amount"
                            type="number"
                            defaultValue="99.99"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="payment_place">Lugar de pago</Label>
                          <Input
                            id="payment_place"
                            defaultValue="Ciudad de México"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>Datos del deudor</CardTitle>
                      <CardDescription>
                        Ingresa los datos del deudor
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Nombre del deudor:</Label>
                          <Input
                            id="debtname"
                            type="text"
                            className="w-full"
                            defaultValue="John Doe"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="debt_address">Dirección</Label>
                          <Input
                            id="debt_address"
                            type="text"
                            defaultValue="Calle Principal"
                            className="w-full"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="debt_city">Población</Label>
                          <Input
                            id="debt_city"
                            defaultValue="Ciudad de México"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-1">
                    <CardHeader>
                      <CardTitle>Número de pagarés para generar</CardTitle>
                      <CardDescription>
                        Selecciona cuantas semanas/meses serán generados.
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
                          <Label htmlFor="months">Numero de meses</Label>

                          <Input id="months" type="number" defaultValue="3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Button type="submit">Generar pagarés</Button>
                  <Button type="reset" variant="secondary">
                    Cancelar
                  </Button>

                  {formData && (
                    <PDFDownloadLink
                      document={<PromissoryNotePDF data={formData} />}
                      fileName="pagare-facil.pdf"
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? "Cargando documento..." : "Doescargar PDF"
                      }
                    </PDFDownloadLink>
                  )}

                  {/* <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Recomendaciones</CardTitle>
                    <CardDescription>
                      Aquí puedes encontrar recomendaciones útiles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                          <PlusCircle className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold">
                            Crea múltiples pagarés
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Selecciona múltiples periodos de pago para crear
                            varios pagarés automáticamente.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                          <Upload className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold">
                            Sube tus propios documentos
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Adjunta documentos adicionales como garantías o
                            contratos.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500">
                          <Search className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold">
                            Busca tus pagarés
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Encuentra rápidamente pagarés anteriores con la
                            búsqueda avanzada.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
                </div>
              </div>
            </div>
          </main>
        </div>
      </form>
    </div>
  );
}
