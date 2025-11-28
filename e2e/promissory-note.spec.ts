import { test, expect } from '@playwright/test'

test.describe('Pagaré Fácil - Generación de Pagarés', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('muestra la página principal correctamente', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Bienvenido a Pagaré fácil' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Validar y generar PDF' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible()
  })

  test('genera PDF con datos completos (happy path)', async ({ page }) => {
    // Información general
    await page.getByLabel('Nombre de la persona a quién deberá pagarse:').fill('Juan Pérez García')
    await page.getByLabel('Monto').fill('10000')
    await page.getByLabel('Tasa de interés (%)').fill('5')
    await page.getByLabel('Lugar de pago').fill('Ciudad de México')

    // Datos del deudor
    await page.getByLabel('Nombre del deudor:').fill('María López Sánchez')
    await page.getByLabel('Dirección').fill('Av. Reforma 123, Col. Centro')
    await page.getByLabel('Población').fill('Ciudad de México')
    await page.getByLabel('Teléfono del deudor (Opcional)').fill('5551234567')

    // Configuración - Fecha del pagaré (click en el botón "Select a date")
    await page.getByRole('button', { name: 'Select a date' }).click()
    await page.getByRole('gridcell', { name: '15' }).first().click()

    // Configuración - Día de pago (click en el botón "Selecciona el día")
    await page.getByRole('button', { name: 'Selecciona el día' }).click()
    await page.getByRole('gridcell', { name: '15' }).first().click()

    // Número de períodos
    await page.getByLabel('Número de períodos').clear()
    await page.getByLabel('Número de períodos').fill('12')

    // Generar PDF
    await page.getByRole('button', { name: 'Validar y generar PDF' }).click()

    // Verificar que el diálogo de PDF se abre
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 })
  })

  test('permite cambiar la periodicidad', async ({ page }) => {
    // Abrir el selector de periodicidad (usando el que tiene "Mensual" por defecto)
    await page.getByRole('combobox').filter({ hasText: 'Mensual' }).click()

    // Verificar que todas las opciones están disponibles
    await expect(page.getByRole('option', { name: 'Semanal' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Quincenal' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Mensual' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Trimestral' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Semestral' })).toBeVisible()

    // Seleccionar quincenal
    await page.getByRole('option', { name: 'Quincenal' }).click()

    // Verificar que se seleccionó
    await expect(page.getByRole('combobox').filter({ hasText: 'Quincenal' })).toBeVisible()
  })

  test('el botón cancelar resetea los campos controlados', async ({ page }) => {
    // Cambiar número de períodos (campo controlado)
    await page.getByLabel('Número de períodos').clear()
    await page.getByLabel('Número de períodos').fill('6')

    // Verificar que el campo tiene el nuevo valor
    await expect(page.getByLabel('Número de períodos')).toHaveValue('6')

    // Hacer click en cancelar
    await page.getByRole('button', { name: 'Cancelar' }).click()

    // Los campos controlados se resetean
    await expect(page.getByLabel('Número de períodos')).toHaveValue('1')
  })

  test('muestra las tarjetas de información', async ({ page }) => {
    // Verificar que las 4 tarjetas principales están visibles usando los títulos
    await expect(page.getByRole('heading', { name: 'Información general' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Datos del deudor' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Configuración de pagarés' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Información de Avales' })).toBeVisible()
  })

  test('permite seleccionar número de avales', async ({ page }) => {
    // El selector de avales usa un combobox con valor "0" por defecto
    const avalSelector = page.getByRole('combobox').filter({ hasText: '0' })
    await expect(avalSelector).toBeVisible()

    // Abrir el selector
    await avalSelector.click()

    // Seleccionar 1 aval
    await page.getByRole('option', { name: '1' }).click()

    // Verificar que aparecen los campos del aval
    await expect(page.getByLabel('Nombre del Aval')).toBeVisible()
    await expect(page.getByLabel('Dirección del Aval')).toBeVisible()
    await expect(page.getByLabel('Ciudad del Aval')).toBeVisible()
  })
})

test.describe('Pagaré Fácil - Validaciones', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('no genera PDF si faltan campos requeridos', async ({ page }) => {
    // Intentar generar sin llenar campos
    await page.getByRole('button', { name: 'Validar y generar PDF' }).click()

    // El diálogo no debería abrirse
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('acepta diferentes formatos de monto', async ({ page }) => {
    const montoInput = page.getByLabel('Monto')

    // Monto entero
    await montoInput.fill('1000')
    await expect(montoInput).toHaveValue('1000')

    // Monto con decimales
    await montoInput.clear()
    await montoInput.fill('1000.50')
    await expect(montoInput).toHaveValue('1000.50')
  })
})
