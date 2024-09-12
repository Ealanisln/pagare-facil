// src/components/PromissoryNotePDF/utils.ts

export type Guarantor = {
    name: string;
    address: string;
    city: string;
    phone?: string;
  };
  
  export type PromissoryNoteData = {
    amount: number;
    interestRate: number;
    debtorAddress: string;
    debtorCity: string;
    debtorName: string;
    debtorPhone?: string;
    name: string;
    numberOfMonths: number;
    paymentDay: number;
    payment_place: string;
    signingDate: Date;
    firstPaymentDate: Date; 
    numberOfGuarantors: number;
    guarantors: Guarantor[];
    periodicity: "weekly" | "biweekly" | "monthly" | "quarterly" | "semiannual";
  };
  
  export const getSpanishMonth = (month: number): string => {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return months[month];
  };
  
  export const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = getSpanishMonth(date.getMonth());
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
  };
  
  export const calculateDueDate = (firstPaymentDate: Date, noteNumber: number, periodicity: string, paymentDay: number): Date => {
    let dueDate = new Date(firstPaymentDate);
    
    switch (periodicity) {
      case "weekly":
        dueDate.setDate(dueDate.getDate() + (noteNumber - 1) * 7);
        break;
      case "biweekly":
        dueDate.setDate(dueDate.getDate() + (noteNumber - 1) * 14);
        break;
      case "monthly":
        dueDate.setMonth(dueDate.getMonth() + (noteNumber - 1));
        break;
      case "quarterly":
        dueDate.setMonth(dueDate.getMonth() + (noteNumber - 1) * 3);
        break;
      case "semiannual":
        dueDate.setMonth(dueDate.getMonth() + (noteNumber - 1) * 6);
        break;
    }
  
    if (periodicity !== "weekly" && periodicity !== "biweekly") {
      const lastDayOfMonth = new Date(dueDate.getFullYear(), dueDate.getMonth() + 1, 0).getDate();
      dueDate.setDate(Math.min(paymentDay, lastDayOfMonth));
    }
  
    return dueDate;
  };
  
  export const getPeriodicityText = (periodicity: string): string => {
    switch (periodicity) {
      case "weekly": return "semanal";
      case "biweekly": return "quincenal";
      case "monthly": return "mensual";
      case "quarterly": return "trimestral";
      case "semiannual": return "semestral";
      default: return "";
    }
  };