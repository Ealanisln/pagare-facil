// File: components/Dashboard.tsx
"use client";

import React, { useState } from "react";
import { z } from "zod";
import { GeneralInfoCard } from "@/components/Dashboard/GeneralInfoCard";
import { DebtorInfoCard } from "@/components/Dashboard/DebtorInfoCard";
import { ConfigurationCard } from "@/components/Dashboard/ConfigurationCard";
import { GuarantorInfoCard } from "@/components/Dashboard/GuarantorInfoCard";
import { Header } from "@/components/Dashboard/Header";
// import { Sidebar } from "@/components/Dashboard/Sidebar";
import { PDFDialog } from "@/components/Dashboard/PDFDialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { PromissoryNoteSchema, PromissoryNote, Guarantor } from "@/lib/schemas";

export function Dashboard() {
  const [formData, setFormData] = useState<PromissoryNote | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentDay, setPaymentDay] = useState<number | undefined>(undefined);
  const [signingDate, setSigningDate] = useState<Date | undefined>(undefined);
  const [numberOfGuarantors, setNumberOfGuarantors] = useState<number>(0);
  const [guarantors, setGuarantors] = useState<Guarantor[]>([]);
  const [periodicity, setPeriodicity] = useState<string>("monthly");
  const [numberOfMonths, setNumberOfMonths] = useState<number>(1);

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

  const calculateFirstPaymentDate = (
    signingDate: Date,
    paymentDay: number,
    periodicity: string
  ) => {
    let firstPaymentDate = new Date(signingDate);
    firstPaymentDate.setDate(paymentDay);

    while (firstPaymentDate <= signingDate) {
      switch (periodicity) {
        case "weekly":
          firstPaymentDate.setDate(firstPaymentDate.getDate() + 7);
          break;
        case "biweekly":
          firstPaymentDate.setDate(firstPaymentDate.getDate() + 14);
          break;
        case "monthly":
          firstPaymentDate.setMonth(firstPaymentDate.getMonth() + 1);
          break;
        case "quarterly":
          firstPaymentDate.setMonth(firstPaymentDate.getMonth() + 3);
          break;
        case "semiannual":
          firstPaymentDate.setMonth(firstPaymentDate.getMonth() + 6);
          break;
      }
    }

    return firstPaymentDate;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsGeneratingPDF(true);

    const form = event.currentTarget;

    const rawData = {
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
      periodicity: periodicity as
        | "weekly"
        | "biweekly"
        | "monthly"
        | "quarterly"
        | "semiannual",
      numberOfMonths: numberOfMonths,
      numberOfGuarantors: numberOfGuarantors,
      guarantors: guarantors,
    };

    try {
      const firstPaymentDate = calculateFirstPaymentDate(
        rawData.signingDate,
        rawData.paymentDay,
        rawData.periodicity
      );
      const dataToValidate = {
        ...rawData,
        firstPaymentDate,
      };

      const validatedData = PromissoryNoteSchema.parse(dataToValidate);
      setFormData(validatedData);
      setIsDialogOpen(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleReset = () => {
    setFormData(null);
    setPaymentDay(undefined);
    setSigningDate(undefined);
    setPeriodicity("monthly");
    setNumberOfMonths(1);
    setNumberOfGuarantors(0);
    setGuarantors([]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          {/* <Sidebar /> */}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto w-full max-w-7xl">
              <h1 className="text-2xl font-semibold tracking-tight mb-8">
                Bienvenido a Pagaré fácil
              </h1>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-8">
                <GeneralInfoCard />
                <DebtorInfoCard />
                <ConfigurationCard
                  signingDate={signingDate}
                  setSigningDate={setSigningDate}
                  paymentDay={paymentDay}
                  setPaymentDay={setPaymentDay}
                  periodicity={periodicity}
                  setPeriodicity={setPeriodicity}
                  numberOfMonths={numberOfMonths}
                  setNumberOfMonths={setNumberOfMonths}
                />
                <GuarantorInfoCard
                  numberOfGuarantors={numberOfGuarantors}
                  setNumberOfGuarantors={setNumberOfGuarantors}
                  guarantors={guarantors}
                  handleGuarantorChange={handleGuarantorChange}
                />
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
      <PDFDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        formData={formData}
      />
    </div>
  );
}
