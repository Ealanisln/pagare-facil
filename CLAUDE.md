# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pagaré Fácil is a Next.js application for generating customized promissory notes (pagarés) in PDF format. The app is in Spanish and targets Mexican legal document formats.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm lint     # Run ESLint
pnpm start    # Start production server
```

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui with Radix primitives
- **Styling**: Tailwind CSS with CSS variables
- **PDF Generation**: @react-pdf/renderer
- **Form Handling**: react-hook-form with Zod validation
- **Date Handling**: date-fns

### Project Structure
```
src/
├── app/                    # Next.js App Router (page.tsx renders Dashboard)
├── components/
│   ├── Dashboard/          # Refactored dashboard components (cards, header, etc.)
│   ├── Dashboard.tsx       # Main form component (currently used)
│   ├── PromissoryNotePDF/  # PDF generation (index.tsx, styles.ts, utils.ts)
│   ├── DatePicker/         # Day-of-month picker
│   ├── FullDatePicker/     # Full date picker
│   └── ui/                 # shadcn/ui components
└── lib/
    ├── schemas.ts          # Zod schemas (PromissoryNoteSchema, GuarantorSchema)
    ├── number-to-letter.ts # Spanish number-to-words conversion
    └── utils.ts            # cn() utility for Tailwind class merging
```

### Key Patterns

**Form Data Flow**: Dashboard.tsx manages form state, validates with Zod (`PromissoryNoteSchema`), calculates first payment date based on periodicity, then passes validated data to `PromissoryNotePDF` component.

**PDF Layout**: `PromissoryNotePDF` renders multiple notes per page (3 without guarantor, 2 with guarantor). Each note includes debtor info, payment terms, and optional guarantor sections.

**Path Alias**: Use `@/*` to import from `src/*` (configured in tsconfig.json).

**UI Components**: Add new shadcn/ui components via the CLI. Config is in `components.json`.

### Domain Logic

- **Periodicity Options**: weekly, biweekly, monthly, quarterly, semiannual
- **Payment Date Calculation**: First payment date is calculated from signing date + payment day + periodicity
- **Currency**: All amounts are in MXN (Mexican Pesos) with Spanish number-to-words conversion
