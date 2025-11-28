// File: components/Dashboard.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneralInfoCard } from "@/components/Dashboard/GeneralInfoCard";
import { DebtorInfoCard } from "@/components/Dashboard/DebtorInfoCard";
import { ConfigurationCard } from "@/components/Dashboard/ConfigurationCard";
import { GuarantorInfoCard } from "@/components/Dashboard/GuarantorInfoCard";
import { Header } from "@/components/Dashboard/Header";
import { PDFDialog } from "@/components/Dashboard/PDFDialog";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Loader2, FileCheck } from "lucide-react";
import {
  PromissoryNoteFormSchema,
  PromissoryNoteFormData,
  PromissoryNote,
} from "@/lib/schemas";

export function Dashboard() {
  const [formData, setFormData] = useState<PromissoryNote | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<PromissoryNoteFormData>({
    resolver: zodResolver(PromissoryNoteFormSchema),
    defaultValues: {
      name: "",
      amount: undefined,
      interestRate: undefined,
      payment_place: "",
      debtorName: "",
      debtorAddress: "",
      debtorCity: "",
      debtorPhone: "",
      signingDate: undefined,
      paymentDay: undefined,
      periodicity: "monthly",
      numberOfMonths: 1,
      numberOfGuarantors: 0,
      guarantors: [],
    },
    mode: "onBlur",
  });

  const calculateFirstPaymentDate = (
    signingDate: Date,
    paymentDay: number,
    periodicity: string
  ) => {
    const firstPaymentDate = new Date(signingDate);
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

  const onSubmit = (data: PromissoryNoteFormData) => {
    setIsGeneratingPDF(true);

    try {
      const firstPaymentDate = calculateFirstPaymentDate(
        data.signingDate,
        data.paymentDay,
        data.periodicity
      );

      const validatedData: PromissoryNote = {
        ...data,
        firstPaymentDate,
      };

      setFormData(validatedData);
      setIsDialogOpen(true);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setFormData(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col gradient-bg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:gap-6 sm:py-6">
            <Header />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="mx-auto w-full max-w-7xl">
                <div className="mb-10">
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Bienvenido a Pagare Facil
                  </h1>
                  <p className="mt-2 text-muted-foreground text-lg">
                    Genera tus pagares de forma rapida y sencilla
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <GeneralInfoCard
                    control={form.control}
                    className="animate-fade-in"
                  />
                  <DebtorInfoCard
                    control={form.control}
                    className="animate-fade-in [animation-delay:100ms]"
                  />
                  <ConfigurationCard
                    control={form.control}
                    className="animate-fade-in [animation-delay:200ms]"
                  />
                  <GuarantorInfoCard
                    control={form.control}
                    watch={form.watch}
                    setValue={form.setValue}
                    className="animate-fade-in [animation-delay:300ms]"
                  />
                </div>
                <div className="col-span-full flex gap-4 mt-8">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    disabled={isGeneratingPDF}
                    className="min-w-[200px]"
                  >
                    {isGeneratingPDF ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Validando...
                      </>
                    ) : (
                      <>
                        <FileCheck className="mr-2 h-4 w-4" />
                        Validar y generar PDF
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
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
      </Form>
      <PDFDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        formData={formData}
      />
    </div>
  );
}
