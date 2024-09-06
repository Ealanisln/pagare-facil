# Promissory Note Generator

This is a [Next.js](https://nextjs.org/) project that allows users to generate customized promissory notes easily. It provides a user-friendly interface for inputting debtor information, payment terms, and guarantor details, and generates a downloadable PDF document.

## Features

- Easy-to-use form for inputting promissory note details
- Support for multiple guarantors
- Dynamic form fields that adjust based on user input
- PDF generation and download functionality
- Responsive design for various screen sizes

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/promissory-note-generator.git
cd promissory-note-generator
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Fill out the form with the required information:
   - General information (payee name, amount, interest rate, payment place)
   - Debtor information (name, address, city, phone - optional)
   - Payment terms (signing date, payment day, number of months)
   - Guarantor information (optional)

2. Click the "Validar y generar PDF" button to generate the promissory note.

3. If the form is valid, a dialog will appear with a "Descargar PDF" button.

4. Click the "Descargar PDF" button to download the generated promissory note as a PDF file.

## Customization

You can customize the form fields, validation rules, and PDF layout by modifying the following files:

- `app/page.tsx`: Main component containing the form and logic
- `components/PromissoryNotePDF.tsx`: PDF generation component
- Schema definitions in `app/page.tsx` for form validation

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://reactjs.org/docs/getting-started.html) - learn about React.
- [Zod Documentation](https://github.com/colinhacks/zod) - learn about Zod, the TypeScript-first schema validation library used in this project.
- [React-PDF Documentation](https://react-pdf.org/) - learn about React-PDF, used for generating PDF documents.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)