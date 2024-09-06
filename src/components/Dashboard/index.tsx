"use client";

import React, { useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PromissoryNotePDF from "@/components/PromissoryNotePDF";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Loader2,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { DatePicker } from "../DatePicker";
import { FullDatePicker } from "@/components/FullDatePicker";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const guarantorSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  phone: z.string().optional(),
});

const promissoryNoteSchema = z.object({
  name: z.string(),
  amount: z.number().positive().multipleOf(0.01),
  interestRate: z.number().min(0).max(100),
  payment_place: z.string(),
  debtorName: z.string(),
  debtorAddress: z.string(),
  debtorCity: z.string(),
  signingDate: z.date(),
  paymentDay: z.number(),
  numberOfMonths: z.number(),
  numberOfGuarantors: z.number(),
  guarantors: z.array(guarantorSchema),
  debtorPhone: z.string().optional(),
});

type Guarantor = z.infer<typeof guarantorSchema>;
type PromissoryNote = z.infer<typeof promissoryNoteSchema>;

interface PromissoryNotePDFProps {
  data: PromissoryNote;
}

export function Dashboard() {
  const [paymentDay, setPaymentDay] = useState<number | undefined>(undefined);
  const [signingDate, setSigningDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState<PromissoryNote | null>(null);
  const [numberOfGuarantors, setNumberOfGuarantors] = useState<number>(0);
  const [guarantors, setGuarantors] = useState<Guarantor[]>([]);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setGuarantors(updatedGuarantors);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGeneratingPDF(true);

    const form = event.currentTarget;

    const newGuarantors: Guarantor[] = [];
    for (let i = 0; i < numberOfGuarantors; i++) {
      newGuarantors.push({
        name: (
          form.elements.namedItem(`guarantor_name_${i}`) as HTMLInputElement
        ).value,
        address: (
          form.elements.namedItem(`guarantor_address_${i}`) as HTMLInputElement
        ).value,
        city: (
          form.elements.namedItem(`guarantor_city_${i}`) as HTMLInputElement
        ).value,
        phone: (
          form.elements.namedItem(`guarantor_phone_${i}`) as HTMLInputElement
        ).value,
      });
    }

    const rawData: PromissoryNote = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      amount: parseFloat(
        (form.elements.namedItem("amount") as HTMLInputElement).value
      ),
      interestRate: parseFloat(
        (form.elements.namedItem("interest_rate") as HTMLInputElement).value
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
      debtorPhone: (form.elements.namedItem("debt_phone") as HTMLInputElement)
        .value,
      signingDate: signingDate!,
      paymentDay: paymentDay!,
      numberOfMonths: parseInt(
        (form.elements.namedItem("months") as HTMLInputElement).value
      ),
      numberOfGuarantors: numberOfGuarantors,
      guarantors: guarantors.slice(0, numberOfGuarantors),
    };

    try {
      const validatedData = promissoryNoteSchema.parse(rawData);
      setFormData(validatedData);
      setIsDialogOpen(true);
      console.log("Form data:", validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        // Handle validation errors (e.g., show error messages to the user)
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleReset = () => {
    setFormData(null);
    setPaymentDay(undefined);
    setSigningDate(undefined);
    // Reset other form fields if necessary
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
                    <span className="sr-only">Pagaré fácil</span>
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
            <div className="mx-auto w-full max-w-7xl">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
                  Bienvenido a Pagaré fácil
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  Beta
                </Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-8">
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
                        />{" "}
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
                        <Input id="payment_place" className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                        <Label htmlFor="name">Nombre del deudor:</Label>
                        <Input id="debtname" type="text" className="w-full" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="debt_address">Dirección</Label>
                        <Input
                          id="debt_address"
                          type="text"
                          className="w-full"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="debt_city">Población</Label>
                        <Input id="debt_city" className="w-full" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="debt_phone">
                          Teléfono del deudor (Opcional)
                        </Label>
                        <Input id="debt_phone" type="tel" className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-full lg:col-span-1">
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
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>Información de Avales</CardTitle>
                    <CardDescription>
                      Selecciona el número de avales y proporciona su
                      información.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="number_of_guarantors">
                          Número de Avales
                        </Label>
                        <Select
                          onValueChange={(value) => {
                            const num = parseInt(value);
                            setNumberOfGuarantors(num);
                            setGuarantors((prevGuarantors) => {
                              const newGuarantors = [...prevGuarantors];
                              while (newGuarantors.length < num) {
                                newGuarantors.push({
                                  name: "",
                                  address: "",
                                  city: "",
                                  phone: "",
                                });
                              }
                              return newGuarantors.slice(0, num);
                            });
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
                          <h3 className="text-lg font-semibold">
                            Aval {index + 1}
                          </h3>
                          <div className="grid gap-3">
                            <Label htmlFor={`guarantor_name_${index}`}>
                              Nombre del Aval
                            </Label>
                            <Input
                              id={`guarantor_name_${index}`}
                              type="text"
                              className="w-full"
                              value={guarantors[index]?.name || ""}
                              onChange={(e) =>
                                handleGuarantorChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor={`guarantor_address_${index}`}>
                              Dirección del Aval
                            </Label>
                            <Input
                              id={`guarantor_address_${index}`}
                              type="text"
                              className="w-full"
                              value={guarantors[index]?.address || ""}
                              onChange={(e) =>
                                handleGuarantorChange(
                                  index,
                                  "address",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor={`guarantor_city_${index}`}>
                              Ciudad del Aval
                            </Label>
                            <Input
                              id={`guarantor_city_${index}`}
                              type="text"
                              className="w-full"
                              value={guarantors[index]?.city || ""}
                              onChange={(e) =>
                                handleGuarantorChange(
                                  index,
                                  "city",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor={`guarantor_phone_${index}`}>
                              Teléfono del Aval
                            </Label>
                            <Input
                              id={`guarantor_phone_${index}`}
                              type="tel"
                              className="w-full"
                              value={guarantors[index]?.phone || ""}
                              onChange={(e) =>
                                handleGuarantorChange(
                                  index,
                                  "phone",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-full flex gap-4 mt-4">
                <Button type="submit" disabled={isGeneratingPDF}>
                  {isGeneratingPDF ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Validando...
                    </>
                  ) : (
                    "Validar y generar PDF"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleReset}
                  disabled={isGeneratingPDF}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </main>
        </div>
      </form>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>PDF generado con éxito</DialogTitle>
          </DialogHeader>
          {formData && (
            <PDFDownloadLink
              document={<PromissoryNotePDF data={formData} />}
              fileName="pagare-facil.pdf"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Preparando PDF..." : "Descargar PDF"
              }
            </PDFDownloadLink>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
