// File: lib/schemas.ts
import { z } from "zod";

export const GuarantorSchema = z.object({
  name: z.string().min(1, "El nombre del aval es requerido"),
  address: z.string().min(1, "La direccion del aval es requerida"),
  city: z.string().min(1, "La ciudad del aval es requerida"),
  phone: z.string().optional(),
});

export const PromissoryNoteSchema = z.object({
  name: z.string().min(1, "El nombre del beneficiario es requerido"),
  amount: z.number().positive("El monto debe ser mayor a 0").multipleOf(0.01),
  interestRate: z.number().min(0, "La tasa no puede ser negativa").max(100, "La tasa no puede ser mayor a 100"),
  payment_place: z.string().min(1, "El lugar de pago es requerido"),
  debtorName: z.string().min(1, "El nombre del deudor es requerido"),
  debtorAddress: z.string().min(1, "La direccion del deudor es requerida"),
  debtorCity: z.string().min(1, "La ciudad del deudor es requerida"),
  signingDate: z.date({ required_error: "La fecha de firma es requerida" }),
  paymentDay: z.number().min(1, "El dia debe ser mayor a 0").max(31, "El dia no puede ser mayor a 31"),
  periodicity: z.enum([
    "weekly",
    "biweekly",
    "monthly",
    "quarterly",
    "semiannual",
  ]),
  numberOfMonths: z.number().positive("El numero de periodos debe ser mayor a 0"),
  numberOfGuarantors: z.number(),
  guarantors: z.array(GuarantorSchema),
  debtorPhone: z.string().optional(),
  firstPaymentDate: z.date(),
});

// Schema for the form (without computed fields)
export const PromissoryNoteFormSchema = PromissoryNoteSchema.omit({ firstPaymentDate: true });

export type Guarantor = z.infer<typeof GuarantorSchema>;
export type PromissoryNote = z.infer<typeof PromissoryNoteSchema>;
export type PromissoryNoteFormData = z.infer<typeof PromissoryNoteFormSchema>;