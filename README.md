# Pagaré Fácil

Generador de pagarés personalizados en formato PDF. App en español, diseñada para documentos legales mexicanos.

## Características

- Formulario guiado para datos generales, deudor, configuración de pago y aval (opcional)
- Periodicidades soportadas: semanal, quincenal, mensual, trimestral y semestral
- Cálculo automático de la primera fecha de pago según periodicidad y día seleccionado
- Conversión de montos a letra en español
- Generación y descarga de PDF con múltiples pagarés por hoja
- Modo claro / oscuro
- Validación con Zod y react-hook-form

## Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: shadcn/ui sobre Radix, Tailwind CSS
- **PDF**: `@react-pdf/renderer`
- **Formularios**: `react-hook-form` + `zod`
- **Fechas**: `date-fns`, `react-day-picker`
- **Tests**: Vitest + Testing Library (unit), Playwright (e2e)

## Comandos

```bash
pnpm dev            # servidor de desarrollo
pnpm build          # build de producción
pnpm start          # servidor de producción
pnpm lint           # ESLint
pnpm test           # Vitest en modo watch
pnpm test:run       # Vitest una sola vez
pnpm test:coverage  # Vitest con cobertura
pnpm test:e2e       # Playwright
pnpm test:e2e:ui    # Playwright con UI
```

## Estructura

```
src/
├── app/                    # App Router (layout, página principal)
├── components/
│   ├── Dashboard.tsx       # formulario principal
│   ├── Dashboard/          # subcomponentes (tarjetas del formulario)
│   ├── PromissoryNotePDF/  # generación del PDF
│   ├── DatePicker/         # selector de día del mes
│   ├── FullDatePicker/     # selector de fecha completa
│   └── ui/                 # componentes shadcn/ui
├── lib/
│   ├── schemas.ts          # esquemas Zod (PromissoryNote, Guarantor)
│   ├── number-to-letter.ts # conversión de número a letras
│   └── utils.ts            # helpers (cn, etc.)
└── providers/              # ThemeProvider
```

Alias de import: `@/*` → `src/*`.

## Uso

1. Llenar el formulario: información general (beneficiario, monto, interés, lugar de pago), datos del deudor, configuración de pagos y, opcionalmente, aval.
2. Click en **Validar y generar PDF**.
3. Descargar el PDF desde el diálogo.

## Licencia

MIT
