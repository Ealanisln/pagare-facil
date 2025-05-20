// File: components/Dashboard.tsx
"use client";

import React, { useState } from "react";
import { z } from "zod";
import { GeneralInfoCard } from "@/components/Dashboard/GeneralInfoCard";
import { DebtorInfoCard } from "@/components/Dashboard/DebtorInfoCard";
import { ConfigurationCard } from "@/components/Dashboard/ConfigurationCard";
import { GuarantorInfoCard } from "@/components/Dashboard/GuarantorInfoCard";
import { Header } from "@/components/Dashboard/Header";
import { PDFDialog } from "@/components/Dashboard/PDFDialog";
import { Button } from "./ui/button";
import { Loader2, ArrowRight, ArrowLeft, Save, FilePlus2, AlertCircle } from "lucide-react";
import { PromissoryNoteSchema, PromissoryNote, Guarantor } from "@/lib/schemas";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DashboardProps {
  hideHeader?: boolean;
}

// Step-specific validation schemas
const GeneralInfoSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  amount: z.string().min(1, "Monto requerido").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    "El monto debe ser mayor a 0"
  ),
  interest_rate: z.string().min(1, "Tasa de interés requerida").refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 100,
    "La tasa de interés debe estar entre 0 y 100"
  ),
  payment_place: z.string().min(1, "Lugar de pago requerido"),
});

const DebtorInfoSchema = z.object({
  debtorName: z.string().min(1, "Nombre del deudor requerido"),
  debtorAddress: z.string().min(1, "Dirección del deudor requerida"),
  debtorCity: z.string().min(1, "Ciudad del deudor requerida"),
  debtorPhone: z.string().optional(),
});

const ConfigurationSchema = z.object({
  signingDate: z.date({
    required_error: "Fecha de firma requerida",
    invalid_type_error: "Formato de fecha inválido",
  }),
  paymentDay: z.number({
    required_error: "Día de pago requerido",
    invalid_type_error: "Día de pago inválido",
  }).min(1, "Día de pago debe ser al menos 1").max(31, "Día de pago debe ser como máximo 31"),
  periodicity: z.enum(["weekly", "biweekly", "monthly", "quarterly", "semiannual"], {
    required_error: "Periodicidad requerida",
  }),
  numberOfMonths: z.number({
    required_error: "Número de períodos requerido",
    invalid_type_error: "Número de períodos inválido",
  }).min(1, "Debe haber al menos 1 período"),
});

const GuarantorSchema = z.object({
  numberOfGuarantors: z.number(),
  guarantors: z.array(z.object({
    name: z.string().min(1, "Nombre del aval requerido"),
    address: z.string().min(1, "Dirección del aval requerida"),
    city: z.string().min(1, "Ciudad del aval requerida"),
    phone: z.string().optional(),
  })).refine(arr => {
    return arr.length === 0 || arr.every(item => 
      item.name.length > 0 && item.address.length > 0 && item.city.length > 0
    );
  }, "Todos los campos de aval son requeridos"),
});

export function Dashboard({ hideHeader = false }: DashboardProps) {
  // Form state values
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [paymentPlace, setPaymentPlace] = useState<string>("");
  const [debtorName, setDebtorName] = useState<string>("");
  const [debtorAddress, setDebtorAddress] = useState<string>("");
  const [debtorCity, setDebtorCity] = useState<string>("");
  const [debtorPhone, setDebtorPhone] = useState<string>("");
  
  const [formData, setFormData] = useState<PromissoryNote | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [paymentDay, setPaymentDay] = useState<number | undefined>(undefined);
  const [signingDate, setSigningDate] = useState<Date | undefined>(undefined);
  const [numberOfGuarantors, setNumberOfGuarantors] = useState<number>(0);
  const [guarantors, setGuarantors] = useState<Guarantor[]>([]);
  const [periodicity, setPeriodicity] = useState<string>("monthly");
  const [numberOfMonths, setNumberOfMonths] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const totalSteps = 4; // Total number of steps in the form

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

  // Event handlers for form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: fieldName, value } = e.target;
    
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "amount":
        setAmount(value);
        break;
      case "interest_rate":
        setInterestRate(value);
        break;
      case "payment_place":
        setPaymentPlace(value);
        break;
      case "debtname":
        setDebtorName(value);
        break;
      case "debt_address":
        setDebtorAddress(value);
        break;
      case "debt_city":
        setDebtorCity(value);
        break;
      case "debt_phone":
        setDebtorPhone(value);
        break;
    }
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

  // Update form values from the DOM before validation
  const updateFormValuesFromDOM = () => {
    const form = document.querySelector('form') as HTMLFormElement;
    
    if (currentStep === 1) {
      const nameInput = form.elements.namedItem("name") as HTMLInputElement;
      const amountInput = form.elements.namedItem("amount") as HTMLInputElement;
      const interestRateInput = form.elements.namedItem("interest_rate") as HTMLInputElement;
      const paymentPlaceInput = form.elements.namedItem("payment_place") as HTMLInputElement;
      
      if (nameInput) setName(nameInput.value);
      if (amountInput) setAmount(amountInput.value);
      if (interestRateInput) setInterestRate(interestRateInput.value);
      if (paymentPlaceInput) setPaymentPlace(paymentPlaceInput.value);
    } 
    else if (currentStep === 2) {
      const debtorNameInput = form.elements.namedItem("debtname") as HTMLInputElement;
      const debtorAddressInput = form.elements.namedItem("debt_address") as HTMLInputElement;
      const debtorCityInput = form.elements.namedItem("debt_city") as HTMLInputElement;
      const debtorPhoneInput = form.elements.namedItem("debt_phone") as HTMLInputElement;
      
      if (debtorNameInput) setDebtorName(debtorNameInput.value);
      if (debtorAddressInput) setDebtorAddress(debtorAddressInput.value);
      if (debtorCityInput) setDebtorCity(debtorCityInput.value);
      if (debtorPhoneInput) setDebtorPhone(debtorPhoneInput.value);
    }
  };

  // Validate the current step
  const validateCurrentStep = (): boolean => {
    try {
      setValidationErrors([]);
      updateFormValuesFromDOM();
      
      if (currentStep === 1) {
        // Validate General Info
        const generalInfo = {
          name,
          amount,
          interest_rate: interestRate,
          payment_place: paymentPlace,
        };
        GeneralInfoSchema.parse(generalInfo);
      } else if (currentStep === 2) {
        // Validate Debtor Info
        const debtorInfo = {
          debtorName,
          debtorAddress,
          debtorCity,
          debtorPhone,
        };
        DebtorInfoSchema.parse(debtorInfo);
      } else if (currentStep === 3) {
        // Validate Configuration
        const configData = {
          signingDate,
          paymentDay,
          periodicity,
          numberOfMonths,
        };
        ConfigurationSchema.parse(configData);
      } else if (currentStep === 4) {
        // Validate Guarantors (if any)
        const guarantorData = {
          numberOfGuarantors,
          guarantors: numberOfGuarantors > 0 ? guarantors.slice(0, numberOfGuarantors) : [],
        };
        GuarantorSchema.parse(guarantorData);
      }
      
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Extract all error messages
        const errorMessages = error.errors.map(err => err.message);
        setValidationErrors(errorMessages);
      } else {
        setValidationErrors(["Error de validación inesperado"]);
      }
      return false;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Validate final step before generating PDF
    if (!validateCurrentStep()) {
      return;
    }
    
    setIsGeneratingPDF(true);

    try {
      // Use state values instead of DOM elements
      const rawData = {
        name,
        amount: parseFloat(amount),
        interestRate: parseFloat(interestRate),
        payment_place: paymentPlace,
        debtorName,
        debtorAddress,
        debtorCity,
        debtorPhone,
        signingDate: signingDate!,
        paymentDay: paymentDay!,
        periodicity: periodicity as
          | "weekly"
          | "biweekly"
          | "monthly"
          | "quarterly"
          | "semiannual",
        numberOfMonths,
        numberOfGuarantors,
        guarantors,
      };

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
        const errorMessages = error.errors.map(err => err.message);
        setValidationErrors(errorMessages);
      } else {
        setValidationErrors(["Error inesperado al generar el PDF"]);
      }
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleReset = () => {
    setFormData(null);
    setName("");
    setAmount("");
    setInterestRate("");
    setPaymentPlace("");
    setDebtorName("");
    setDebtorAddress("");
    setDebtorCity("");
    setDebtorPhone("");
    setPaymentDay(undefined);
    setSigningDate(undefined);
    setPeriodicity("monthly");
    setNumberOfMonths(1);
    setNumberOfGuarantors(0);
    setGuarantors([]);
    setCurrentStep(1);
    setValidationErrors([]);
  };

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setValidationErrors([]);
      setCurrentStep(currentStep - 1);
    }
  };

  // Calculate the progress percentage
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {!hideHeader && <Header />}
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-8 space-y-6">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Crear nuevo pagaré
                </h1>
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Paso {currentStep} de {totalSteps}</span>
                    <span>{Math.round(progress)}% completado</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {validationErrors.length > 0 && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <ul className="list-disc pl-5">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                
                {currentStep === 1 && (
                  <div className="animate-in fade-in">
                    <GeneralInfoCard
                      name={name}
                      amount={amount}
                      interestRate={interestRate}
                      paymentPlace={paymentPlace}
                      onInputChange={handleInputChange}
                    />
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="animate-in fade-in">
                    <DebtorInfoCard
                      debtorName={debtorName}
                      debtorAddress={debtorAddress}
                      debtorCity={debtorCity}
                      debtorPhone={debtorPhone}
                      onInputChange={handleInputChange}
                    />
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="animate-in fade-in">
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
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="animate-in fade-in">
                    <GuarantorInfoCard
                      numberOfGuarantors={numberOfGuarantors}
                      setNumberOfGuarantors={setNumberOfGuarantors}
                      guarantors={guarantors}
                      handleGuarantorChange={handleGuarantorChange}
                    />
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={nextStep}>
                      Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isGeneratingPDF}>
                      {isGeneratingPDF ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generando...
                        </>
                      ) : (
                        <>
                          <FilePlus2 className="mr-2 h-4 w-4" />
                          Generar PDF
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <div className="mt-4 flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-sm text-muted-foreground"
                  >
                    Reiniciar formulario
                  </Button>
                </div>
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
