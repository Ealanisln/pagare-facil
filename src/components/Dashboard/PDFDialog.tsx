// File: components/dashboard/PDFDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PromissoryNotePDF from "@/components/PromissoryNotePDF";
import { PromissoryNote } from "@/lib/schemas";
import { CheckCircle, Download, X } from "lucide-react";

interface PDFDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  formData: PromissoryNote | null;
}

export function PDFDialog({ isOpen, setIsOpen, formData }: PDFDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center text-center py-4">
          <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 animate-scale-in">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl">
              PDF generado con exito
            </DialogTitle>
            <DialogDescription className="mt-2">
              Tu pagare esta listo para descargar
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          {formData && (
            <PDFDownloadLink
              document={<PromissoryNotePDF data={formData} />}
              fileName="pagare-facil.pdf"
              className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 h-11 px-6 transition-all duration-200 active:scale-[0.98]"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar PDF
            </PDFDownloadLink>
          )}
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            <X className="mr-2 h-4 w-4" />
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
