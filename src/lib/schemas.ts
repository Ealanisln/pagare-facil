// File: lib/schemas.ts
import { z } from "zod";

export const GuarantorSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  phone: z.string().optional(),
});

export const PromissoryNoteSchema = z.object({
  name: z.string(),
  amount: z.number().positive().multipleOf(0.01),
  interestRate: z.number().min(0).max(100),
  payment_place: z.string(),
  debtorName: z.string(),
  debtorAddress: z.string(),
  debtorCity: z.string(),
  signingDate: z.date(),
  paymentDay: z.number().min(1).max(31),
  periodicity: z.enum([
    "weekly",
    "biweekly",
    "monthly",
    "quarterly",
    "semiannual",
  ]),
  numberOfMonths: z.number().positive(),
  numberOfGuarantors: z.number(),
  guarantors: z.array(GuarantorSchema),
  debtorPhone: z.string().optional(),
  firstPaymentDate: z.date(),
});

export type Guarantor = z.infer<typeof GuarantorSchema>;
export type PromissoryNote = z.infer<typeof PromissoryNoteSchema>;