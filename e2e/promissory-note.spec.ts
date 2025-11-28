import { test, expect } from '@playwright/test'

test.describe('Pagare Facil - Generacion de Pagares', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('muestra la pagina principal correctamente', async ({ page }) => {
    // Heading principal
    await expect(page.getByRole('heading', { name: 'Bienvenido a Pagare Facil' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Validar y generar PDF' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancelar' })).toBeVisible()
  })

  test('genera PDF con datos completos (happy path)', async ({ page }) => {
    // Informacion general - usando placeholders
    await page.getByPlaceholder('Ej: Juan Perez Lopez').fill('Juan Perez Garcia')
    await page.getByPlaceholder('0.00').first().fill('10000')
    await page.getByPlaceholder('0.00').nth(1).fill('5')
    await page.getByPlaceholder('Ej: Monterrey, Nuevo Leon').fill('Ciudad de Mexico')

    // Datos del deudor
    await page.getByPlaceholder('Ej: Maria Garcia Martinez').fill('Maria Lopez Sanchez')
    await page.getByPlaceholder('Ej: Av. Constitucion 123').fill('Av. Reforma 123, Col. Centro')
    await page.getByPlaceholder('Ej: Guadalajara, Jalisco').fill('Ciudad de Mexico')
    await page.getByPlaceholder('Ej: 55 1234 5678').fill('5551234567')

    // Configuracion - Fecha del pagare
    await page.getByRole('button', { name: 'Select a date' }).click()
    await page.getByRole('gridcell', { name: '15' }).first().click()

    // Configuracion - Dia de pago
    await page.getByRole('button', { name: 'Selecciona el día' }).click()
    await page.getByRole('gridcell', { name: '15' }).first().click()

    // Numero de periodos
    await page.getByRole('spinbutton').last().clear()
    await page.getByRole('spinbutton').last().fill('12')

    // Generar PDF
    await page.getByRole('button', { name: 'Validar y generar PDF' }).click()

    // Verificar que el dialogo de PDF se abre
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 })
  })

  test('permite cambiar la periodicidad', async ({ page }) => {
    // Abrir el selector de periodicidad (usando el que tiene "Mensual" por defecto)
    await page.getByRole('combobox').filter({ hasText: 'Mensual' }).click()

    // Verificar que todas las opciones estan disponibles
    await expect(page.getByRole('option', { name: 'Semanal' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Quincenal' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Mensual' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Trimestral' })).toBeVisible()
    await expect(page.getByRole('option', { name: 'Semestral' })).toBeVisible()

    // Seleccionar quincenal
    await page.getByRole('option', { name: 'Quincenal' }).click()

    // Verificar que se selecciono
    await expect(page.getByRole('combobox').filter({ hasText: 'Quincenal' })).toBeVisible()
  })

  test('el boton cancelar resetea los campos controlados', async ({ page }) => {
    // Cambiar numero de periodos (campo controlado) - es el ultimo spinbutton
    const numeroPeriodos = page.getByRole('spinbutton').last()
    await numeroPeriodos.clear()
    await numeroPeriodos.fill('6')

    // Verificar que el campo tiene el nuevo valor
    await expect(numeroPeriodos).toHaveValue('6')

    // Hacer click en cancelar
    await page.getByRole('button', { name: 'Cancelar' }).click()

    // Los campos controlados se resetean
    await expect(numeroPeriodos).toHaveValue('1')
  })

  test('muestra las tarjetas de informacion', async ({ page }) => {
    // Verificar que las 4 tarjetas principales estan visibles usando los titulos
    await expect(page.getByRole('heading', { name: 'Informacion general' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Datos del deudor' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Configuracion' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Informacion de Avales' })).toBeVisible()
  })

  test('permite seleccionar numero de avales', async ({ page }) => {
    // El selector de avales usa un combobox con valor "Sin aval" por defecto
    const avalSelector = page.getByRole('combobox').filter({ hasText: 'Sin aval' })
    await expect(avalSelector).toBeVisible()

    // Abrir el selector
    await avalSelector.click()

    // Seleccionar 1 aval
    await page.getByRole('option', { name: '1 aval' }).click()

    // Verificar que aparecen los campos del aval
    await expect(page.getByText('Nombre del Aval')).toBeVisible()
    await expect(page.getByText('Direccion del Aval')).toBeVisible()
    await expect(page.getByText('Ciudad del Aval')).toBeVisible()
  })
})

test.describe('Pagare Facil - Validaciones', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('no genera PDF si faltan campos requeridos', async ({ page }) => {
    // Intentar generar sin llenar campos
    await page.getByRole('button', { name: 'Validar y generar PDF' }).click()

    // El dialogo no deberia abrirse
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('acepta diferentes formatos de monto', async ({ page }) => {
    // El campo de monto usa placeholder '0.00' y es el primero con ese placeholder
    const montoInput = page.getByPlaceholder('0.00').first()

    // Monto entero
    await montoInput.fill('1000')
    await expect(montoInput).toHaveValue('1000')

    // Monto con decimales (el input elimina ceros trailing, 1000.50 -> 1000.5)
    await montoInput.clear()
    await montoInput.fill('1000.50')
    await expect(montoInput).toHaveValue('1000.5')
  })
})
