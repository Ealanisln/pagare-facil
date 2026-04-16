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
  amount: z
    .number({
      required_error: "El monto es requerido",
      invalid_type_error: "El monto debe ser un número",
    })
    .positive("El monto debe ser mayor a 0")
    .multipleOf(0.01),
  interestRate: z
    .number({
      required_error: "La tasa de interes es requerida",
      invalid_type_error: "La tasa debe ser un número",
    })
    .min(0, "La tasa no puede ser negativa")
    .max(100, "La tasa no puede ser mayor a 100"),
  payment_place: z.string().min(1, "El lugar de pago es requerido"),
  debtorName: z.string().min(1, "El nombre del deudor es requerido"),
  debtorAddress: z.string().min(1, "La direccion del deudor es requerida"),
  debtorCity: z.string().min(1, "La ciudad del deudor es requerida"),
  signingDate: z.date({ required_error: "La fecha de firma es requerida" }),
  firstPaymentDate: z.date({ required_error: "La fecha del primer pago es requerida" }),
  periodicity: z.enum([
    "weekly",
    "biweekly",
    "monthly",
    "quarterly",
    "semiannual",
  ]),
  numberOfMonths: z
    .number({
      required_error: "El numero de periodos es requerido",
      invalid_type_error: "El numero de periodos debe ser un número",
    })
    .positive("El numero de periodos debe ser mayor a 0"),
  numberOfGuarantors: z.number(),
  guarantors: z.array(GuarantorSchema),
  debtorPhone: z.string().optional(),
});

export const PromissoryNoteFormSchema = PromissoryNoteSchema;

export type Guarantor = z.infer<typeof GuarantorSchema>;
export type PromissoryNote = z.infer<typeof PromissoryNoteSchema>;
export type PromissoryNoteFormData = z.infer<typeof PromissoryNoteFormSchema>;