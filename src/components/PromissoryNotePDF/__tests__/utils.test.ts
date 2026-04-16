import { describe, it, expect } from 'vitest'
import {
  getSpanishMonth,
  formatDate,
  calculateDueDate,
  getPeriodicityText,
} from '../utils'

describe('getSpanishMonth', () => {
  it('convierte enero (0)', () => {
    expect(getSpanishMonth(0)).toBe('enero')
  })

  it('convierte diciembre (11)', () => {
    expect(getSpanishMonth(11)).toBe('diciembre')
  })

  it.each([
    [0, 'enero'],
    [1, 'febrero'],
    [2, 'marzo'],
    [3, 'abril'],
    [4, 'mayo'],
    [5, 'junio'],
    [6, 'julio'],
    [7, 'agosto'],
    [8, 'septiembre'],
    [9, 'octubre'],
    [10, 'noviembre'],
    [11, 'diciembre'],
  ])('convierte mes %i a %s', (month, expected) => {
    expect(getSpanishMonth(month)).toBe(expected)
  })
})

describe('formatDate', () => {
  it('formatea fecha normal', () => {
    const date = new Date(2024, 0, 15) // 15 de enero de 2024
    expect(formatDate(date)).toBe('15 de enero de 2024')
  })

  it('formatea fin de año', () => {
    const date = new Date(2024, 11, 31) // 31 de diciembre de 2024
    expect(formatDate(date)).toBe('31 de diciembre de 2024')
  })

  it('formatea primer día del mes', () => {
    const date = new Date(2024, 5, 1) // 1 de junio de 2024
    expect(formatDate(date)).toBe('1 de junio de 2024')
  })
})

describe('calculateDueDate', () => {
  describe('primera nota (noteNumber = 1)', () => {
    it('retorna la misma fecha base para la primera nota mensual', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 1, 'monthly')
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(0)
      expect(result.getFullYear()).toBe(2024)
    })
  })

  describe('periodicidad semanal', () => {
    it('suma 7 días por cada nota después de la primera', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 3, 'weekly')
      // Nota 3 = firstPaymentDate + (3-1) * 7 días = 15 + 14 días = 29 de enero
      expect(result.getDate()).toBe(29)
      expect(result.getMonth()).toBe(0)
    })

    it('cruza el mes correctamente', () => {
      const firstPaymentDate = new Date(2024, 0, 29) // 29 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'weekly')
      // Nota 2 = 29 + 7 = 5 de febrero
      expect(result.getDate()).toBe(5)
      expect(result.getMonth()).toBe(1)
    })
  })

  describe('periodicidad quincenal', () => {
    it('suma 14 días por cada nota después de la primera', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'biweekly')
      // Nota 2 = 15 + 14 = 29 de enero
      expect(result.getDate()).toBe(29)
      expect(result.getMonth()).toBe(0)
    })
  })

  describe('periodicidad mensual', () => {
    it('suma 1 mes por cada nota después de la primera', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'monthly')
      // Nota 2 = enero + 1 mes = febrero, día 15
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(1)
    })

    it('maneja fecha de pago día 31 avanzando al siguiente mes', () => {
      const firstPaymentDate = new Date(2024, 0, 31) // 31 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'monthly')
      // Nota: JavaScript setMonth() con día 31 de enero a febrero desborda a marzo
      // El comportamiento actual es: 31 enero + 1 mes = 2 marzo (febrero tiene 29 días en 2024)
      // La lógica ajusta al día 31 de ese mes (marzo)
      expect(result.getDate()).toBe(31)
      expect(result.getMonth()).toBe(2) // marzo
    })

    it('preserva el día de pago cuando el mes tiene suficientes días', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 3, 'monthly')
      // Nota 3 = enero + 2 meses = marzo, día 15
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(2)
    })
  })

  describe('periodicidad trimestral', () => {
    it('suma 3 meses por cada nota después de la primera', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'quarterly')
      // Nota 2 = enero + 3 meses = abril, día 15
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(3)
    })
  })

  describe('periodicidad semestral', () => {
    it('suma 6 meses por cada nota después de la primera', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'semiannual')
      // Nota 2 = enero + 6 meses = julio, día 15
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(6)
    })

    it('cruza el año correctamente', () => {
      const firstPaymentDate = new Date(2024, 6, 15) // 15 de julio de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'semiannual')
      // Nota 2 = julio + 6 meses = enero 2025, día 15
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(0)
      expect(result.getFullYear()).toBe(2025)
    })
  })

  describe('comportamiento de fin de mes con setMonth', () => {
    it('día 31 de enero a febrero año no bisiesto desborda a marzo', () => {
      const firstPaymentDate = new Date(2023, 0, 31) // 31 de enero de 2023
      const result = calculateDueDate(firstPaymentDate, 2, 'monthly')
      // Nota: 31 enero + 1 mes desborda a 3 de marzo (febrero tiene 28 días)
      // La lógica ajusta al día 31 de marzo
      expect(result.getDate()).toBe(31)
      expect(result.getMonth()).toBe(2) // marzo
    })

    it('día 30 de enero a febrero año bisiesto desborda a marzo', () => {
      const firstPaymentDate = new Date(2024, 0, 30) // 30 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'monthly')
      // Nota: 30 enero + 1 mes desborda a 1 de marzo (febrero 2024 tiene 29 días)
      // La lógica ajusta al día 30 de marzo
      expect(result.getDate()).toBe(30)
      expect(result.getMonth()).toBe(2) // marzo
    })

    it('día 15 de enero a febrero funciona correctamente', () => {
      const firstPaymentDate = new Date(2024, 0, 15) // 15 de enero de 2024
      const result = calculateDueDate(firstPaymentDate, 2, 'monthly')
      // Día 15 existe en febrero, no hay desbordamiento
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(1) // febrero
    })

    it('primer pago en mayo (posterior al mes de firma abril) se preserva', () => {
      // Escenario del bug: estamos en abril y queremos que el primer pago sea en mayo
      const firstPaymentDate = new Date(2026, 4, 15) // 15 de mayo de 2026
      const result = calculateDueDate(firstPaymentDate, 1, 'monthly')
      expect(result.getDate()).toBe(15)
      expect(result.getMonth()).toBe(4) // mayo
      expect(result.getFullYear()).toBe(2026)
    })
  })
})

describe('getPeriodicityText', () => {
  it.each([
    ['weekly', 'semanal'],
    ['biweekly', 'quincenal'],
    ['monthly', 'mensual'],
    ['quarterly', 'trimestral'],
    ['semiannual', 'semestral'],
  ])('convierte %s a %s', (input, expected) => {
    expect(getPeriodicityText(input)).toBe(expected)
  })

  it('retorna cadena vacía para periodicidad desconocida', () => {
    expect(getPeriodicityText('unknown')).toBe('')
  })
})
