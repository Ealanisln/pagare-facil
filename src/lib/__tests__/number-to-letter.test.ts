import { describe, it, expect } from 'vitest'
import { numeroALetras, formatearCantidad } from '../number-to-letter'

describe('numeroALetras', () => {
  describe('casos básicos', () => {
    it('convierte cero', () => {
      expect(numeroALetras(0)).toBe('cero')
    })

    it('convierte unidades (1-9)', () => {
      expect(numeroALetras(1)).toBe('un')
      expect(numeroALetras(5)).toBe('cinco')
      expect(numeroALetras(9)).toBe('nueve')
    })

    it('convierte diez', () => {
      expect(numeroALetras(10)).toBe('diez')
    })

    it('convierte números especiales (11-19)', () => {
      expect(numeroALetras(11)).toBe('once')
      expect(numeroALetras(15)).toBe('quince')
      expect(numeroALetras(19)).toBe('diecinueve')
    })

    it('convierte veinte', () => {
      expect(numeroALetras(20)).toBe('veinte')
    })

    it('convierte decenas con unidades (21-99)', () => {
      expect(numeroALetras(21)).toBe('veinte y un')
      expect(numeroALetras(45)).toBe('cuarenta y cinco')
      expect(numeroALetras(99)).toBe('noventa y nueve')
    })
  })

  describe('centenas', () => {
    it('convierte cien exacto', () => {
      expect(numeroALetras(100)).toBe('cien')
    })

    it('convierte centenas (101-999)', () => {
      expect(numeroALetras(101)).toBe('ciento un')
      expect(numeroALetras(250)).toBe('doscientos cincuenta')
      expect(numeroALetras(500)).toBe('quinientos')
      expect(numeroALetras(999)).toBe('novecientos noventa y nueve')
    })
  })

  describe('miles', () => {
    it('convierte mil exacto', () => {
      expect(numeroALetras(1000)).toBe('mil')
    })

    it('convierte miles', () => {
      expect(numeroALetras(2000)).toBe('dos mil')
      expect(numeroALetras(2500)).toBe('dos mil quinientos')
      expect(numeroALetras(10000)).toBe('diez mil')
      expect(numeroALetras(15750)).toBe('quince mil setecientos cincuenta')
    })
  })

  describe('millones', () => {
    it('convierte un millón', () => {
      expect(numeroALetras(1000000)).toBe('un millón')
    })

    it('convierte millones', () => {
      expect(numeroALetras(2000000)).toBe('dos millones')
      expect(numeroALetras(5500000)).toBe('cinco millones quinientos mil')
    })
  })

  describe('números negativos', () => {
    it('convierte números negativos', () => {
      expect(numeroALetras(-100)).toBe('menos cien')
      expect(numeroALetras(-1500)).toBe('menos mil quinientos')
    })
  })
})

describe('formatearCantidad', () => {
  it('formatea cantidad sin centavos', () => {
    expect(formatearCantidad(1000)).toBe('mil pesos 00/100 MXN')
  })

  it('formatea cantidad con centavos', () => {
    expect(formatearCantidad(1500.50)).toBe('mil quinientos pesos 50/100 MXN')
  })

  it('formatea cantidad con centavos menores a 10', () => {
    expect(formatearCantidad(100.05)).toBe('cien pesos 05/100 MXN')
  })

  it('formatea cantidad con centavos que requieren redondeo', () => {
    expect(formatearCantidad(250.99)).toBe('doscientos cincuenta pesos 99/100 MXN')
  })
})
