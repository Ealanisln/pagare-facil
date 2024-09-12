// File: components/dashboard/PDFDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PromissoryNotePDF from "@/components/PromissoryNotePDF";
import { PromissoryNote } from "@/lib/schemas";

interface PDFDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: PromissoryNote | null;
}

export function PDFDialog({ isOpen, setIsOpen, formData }: PDFDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>PDF generado con éxito</DialogTitle>
        </DialogHeader>
        {formData && (
          <PDFDownloadLink
            document={<PromissoryNotePDF data={formData} />}
            fileName="pagare-facil.pdf"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Preparando PDF..." : "Descargar PDF"
            }
          </PDFDownloadLink>
        )}
      </DialogContent>
    </Dialog>
  );
}
