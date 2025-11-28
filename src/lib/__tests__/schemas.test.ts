import { describe, it, expect } from 'vitest'
import { PromissoryNoteSchema, GuarantorSchema } from '../schemas'

describe('GuarantorSchema', () => {
  it('valida un aval completo', () => {
    const validGuarantor = {
      name: 'Juan Pérez',
      address: 'Calle Principal 123',
      city: 'Ciudad de México',
      phone: '5551234567',
    }
    const result = GuarantorSchema.safeParse(validGuarantor)
    expect(result.success).toBe(true)
  })

  it('valida un aval sin teléfono (opcional)', () => {
    const guarantorWithoutPhone = {
      name: 'Juan Pérez',
      address: 'Calle Principal 123',
      city: 'Ciudad de México',
    }
    const result = GuarantorSchema.safeParse(guarantorWithoutPhone)
    expect(result.success).toBe(true)
  })

  it('falla si faltan campos requeridos', () => {
    const invalidGuarantor = {
      name: 'Juan Pérez',
    }
    const result = GuarantorSchema.safeParse(invalidGuarantor)
    expect(result.success).toBe(false)
  })
})

describe('PromissoryNoteSchema', () => {
  const validNote = {
    name: 'Test Pagaré',
    amount: 10000.00,
    interestRate: 5,
    payment_place: 'Ciudad de México',
    debtorName: 'María García',
    debtorAddress: 'Av. Reforma 456',
    debtorCity: 'Ciudad de México',
    signingDate: new Date('2024-01-15'),
    paymentDay: 15,
    periodicity: 'monthly' as const,
    numberOfMonths: 12,
    numberOfGuarantors: 0,
    guarantors: [],
    firstPaymentDate: new Date('2024-02-15'),
  }

  it('valida un pagaré completo', () => {
    const result = PromissoryNoteSchema.safeParse(validNote)
    expect(result.success).toBe(true)
  })

  describe('validación de amount', () => {
    it('falla con amount negativo', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        amount: -100,
      })
      expect(result.success).toBe(false)
    })

    it('falla con amount con más de 2 decimales', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        amount: 100.001,
      })
      expect(result.success).toBe(false)
    })

    it('acepta amount con 2 decimales', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        amount: 100.99,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('validación de interestRate', () => {
    it('falla con interestRate mayor a 100', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        interestRate: 150,
      })
      expect(result.success).toBe(false)
    })

    it('falla con interestRate negativo', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        interestRate: -5,
      })
      expect(result.success).toBe(false)
    })

    it('acepta interestRate de 0', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        interestRate: 0,
      })
      expect(result.success).toBe(true)
    })

    it('acepta interestRate de 100', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        interestRate: 100,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('validación de paymentDay', () => {
    it('falla con paymentDay de 0', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        paymentDay: 0,
      })
      expect(result.success).toBe(false)
    })

    it('falla con paymentDay mayor a 31', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        paymentDay: 32,
      })
      expect(result.success).toBe(false)
    })

    it('acepta paymentDay de 1', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        paymentDay: 1,
      })
      expect(result.success).toBe(true)
    })

    it('acepta paymentDay de 31', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        paymentDay: 31,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('validación de periodicity', () => {
    it('falla con periodicity inválida', () => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        periodicity: 'daily',
      })
      expect(result.success).toBe(false)
    })

    it.each([
      'weekly',
      'biweekly',
      'monthly',
      'quarterly',
      'semiannual',
    ] as const)('acepta periodicity %s', (periodicity) => {
      const result = PromissoryNoteSchema.safeParse({
        ...validNote,
        periodicity,
      })
      expect(result.success).toBe(true)
    })
  })

  describe('validación de campos requeridos', () => {
    it('falla si falta name', () => {
      const { name, ...noteWithoutName } = validNote
      const result = PromissoryNoteSchema.safeParse(noteWithoutName)
      expect(result.success).toBe(false)
    })

    it('falla si falta debtorName', () => {
      const { debtorName, ...noteWithoutDebtor } = validNote
      const result = PromissoryNoteSchema.safeParse(noteWithoutDebtor)
      expect(result.success).toBe(false)
    })
  })
})
