// src/components/PromissoryNotePDF/index.tsx

import React from "react";
import { Page, Text, View, Document } from "@react-pdf/renderer";
import { formatearCantidad } from "@/lib/number-to-letter";
import { styles } from "./styles";
import { 
  PromissoryNoteData, 
  Guarantor, 
  formatDate, 
  calculateDueDate, 
  getPeriodicityText 
} from "./utils";

// Header Component
const Header: React.FC<{ noteNumber: number; totalNotes: number; amount: number }> = ({ noteNumber, totalNotes, amount }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>PAGARÉ</Text>
    <View style={styles.headerRight}>
      <Text style={styles.headerRightItem}>
        No. {noteNumber} de {totalNotes}
      </Text>
      <View style={styles.verticalLine} />
      <Text style={styles.headerRightItem}>
        BUENO POR $ {amount.toFixed(2)}
      </Text>
    </View>
  </View>
);

// Date Row Component
const DateRow: React.FC<{ paymentPlace: string; signingDate: Date }> = ({ paymentPlace, signingDate }) => (
  <View style={styles.dateRow}>
    <Text style={styles.dateText}>
      En {paymentPlace} a {formatDate(signingDate)}
    </Text>
  </View>
);

// Main Text Component
const MainText: React.FC<{ name: string; amount: number }> = ({ name, amount }) => (
  <Text style={styles.mainText}>
    Debo(mos) y pagaré(mos) incondicionalmente por este Pagaré a la orden de{" "}
    {name}, la cantidad de {formatearCantidad(amount)}.
  </Text>
);

// Two Line Container Component
const TwoLineContainer: React.FC<{ paymentPlace: string; dueDate: Date }> = ({ paymentPlace, dueDate }) => (
  <View style={styles.twoLineContainer}>
    <View style={styles.lineContainer}>
      <Text style={styles.lineText}>{paymentPlace}</Text>
      <Text style={styles.lineLabel}>Lugar de pago</Text>
    </View>
    <View style={styles.lineContainer}>
      <Text style={styles.lineText}>
        {formatDate(dueDate)}
      </Text>
      <Text style={styles.lineLabel}>Fecha de Pago</Text>
    </View>
  </View>
);

// Small Text Component
const SmallText: React.FC<{ 
  periodicity: string; 
  numberOfMonths: number; 
  interestRate: number 
}> = ({ periodicity, numberOfMonths, interestRate }) => (
  <Text style={styles.smallText}>
    Este pagaré es parte de una serie de pagos {getPeriodicityText(periodicity)}es. 
    Valor recibido a mi (nuestra) entera satisfacción. Este pagaré forma
    parte de una serie numerada del 1 al {numberOfMonths} y todos están
    sujetos a la condición de que, al no pagarse cualquiera de ellos a su
    vencimiento, serán exigibles todos los que le sigan en número, además de
    los ya vencidos, desde la fecha de vencimiento de este documento hasta
    el día de su liquidación, causará intereses moratorios al tipo de{" "}
    {interestRate.toFixed(2)}% mensual, pagadero en esta ciudad
    juntamente con el principal.
  </Text>
);

// Debtor Info Component
const DebtorInfo: React.FC<{ 
  debtorName: string; 
  debtorAddress: string; 
  debtorCity: string; 
  debtorPhone?: string 
}> = ({ debtorName, debtorAddress, debtorCity, debtorPhone }) => (
  <View style={styles.debtorInfo}>
    <Text style={styles.label}>Nombre y datos del deudor:</Text>
    <View style={styles.row}>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.input}>{debtorName}</Text>
    </View>
    <View style={styles.combinedRow}>
      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.addressInput}>{debtorAddress}</Text>
      <Text style={styles.label}>Población:</Text>
      <Text style={styles.cityInput}>{debtorCity}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Tel:</Text>
      <Text style={styles.input}>{debtorPhone}</Text>
    </View>
  </View>
);

// Guarantor Info Component
const GuarantorInfo: React.FC<{ guarantors: Guarantor[] }> = ({ guarantors }) => (
  <View style={styles.guarantorInfo}>
    {guarantors.map((guarantor, index) => (
      <View key={index}>
        <Text style={styles.label}>Aval {index + 1}:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.input}>{guarantor.name}</Text>
        </View>
        <View style={styles.combinedRow}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.addressInput}>{guarantor.address}</Text>
          <Text style={styles.label}>Población:</Text>
          <Text style={styles.cityInput}>{guarantor.city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tel:</Text>
          <Text style={styles.input}>{guarantor.phone}</Text>
        </View>
        <View style={styles.guarantorSignature}>
          <Text style={styles.guarantorSignatureText}>
            Firma del Aval {index + 1}: ________________________
          </Text>
        </View>
      </View>
    ))}
  </View>
);

// Signature Component
const Signature: React.FC<{ hasGuarantor: boolean }> = ({ hasGuarantor }) => (
  <View style={styles.signature}>
    <Text style={{ marginBottom: hasGuarantor ? 15 : 15 }}>
      Firma del Deudor
    </Text>
  </View>
);

// PromissoryNote Component
const PromissoryNote: React.FC<{
  data: PromissoryNoteData;
  noteNumber: number;
  hasGuarantor: boolean;
}> = ({ data, noteNumber, hasGuarantor }) => {
  const dueDate = calculateDueDate(data.firstPaymentDate, noteNumber, data.periodicity, data.paymentDay);

  return (
    <View style={hasGuarantor ? styles.pagareWithGuarantor : styles.pagareWithoutGuarantor}>
      <Header noteNumber={noteNumber} totalNotes={data.numberOfMonths} amount={data.amount} />
      <DateRow paymentPlace={data.payment_place} signingDate={data.signingDate} />
      <Text style={[styles.label, { textAlign: "right" }]}>
        Lugar y fecha de expedición
      </Text>
      <MainText name={data.name} amount={data.amount} />
      <TwoLineContainer paymentPlace={data.payment_place} dueDate={dueDate} />
      <SmallText 
        periodicity={data.periodicity} 
        numberOfMonths={data.numberOfMonths} 
        interestRate={data.interestRate} 
      />
      <DebtorInfo 
        debtorName={data.debtorName}
        debtorAddress={data.debtorAddress}
        debtorCity={data.debtorCity}
        debtorPhone={data.debtorPhone}
      />
      {hasGuarantor && data.guarantors && data.guarantors.length > 0 && (
        <GuarantorInfo guarantors={data.guarantors} />
      )}
      <Signature hasGuarantor={hasGuarantor} />
    </View>
  );
};

// PromissoryNotePDF Component
const PromissoryNotePDF: React.FC<{ data: PromissoryNoteData }> = ({ data }) => {
  console.log("PromissoryNotePDF data:", data); // Para depuración

  if (!data || !data.numberOfMonths || data.numberOfMonths < 1) {
    console.error("Datos de pagaré inválidos", data);
    return (
      <Document>
        <Page size="LETTER">
          <View>
            <Text>Error: Datos de pagaré inválidos o incompletos</Text>
          </View>
        </Page>
      </Document>
    );
  }

  const hasGuarantor = data.numberOfGuarantors > 0 && data.guarantors && data.guarantors.length > 0;
  const pagaresPerPage = hasGuarantor ? 2 : 3;
  const totalPages = Math.ceil(data.numberOfMonths / pagaresPerPage);

  return (
    <Document>
      {Array.from({ length: totalPages }, (_, pageIndex) => (
        <Page
          key={pageIndex}
          size="LETTER"
          orientation="portrait"
          style={hasGuarantor ? styles.pageWithGuarantor : styles.pageWithoutGuarantor}
        >
          {Array.from({ length: pagaresPerPage }, (_, i) => {
            const noteNumber = pageIndex * pagaresPerPage + i + 1;
            if (noteNumber <= data.numberOfMonths) {
              return (
                <PromissoryNote 
                  key={i} 
                  data={data} 
                  noteNumber={noteNumber} 
                  hasGuarantor={hasGuarantor}
                />
              );
            }
            return null;
          })}
        </Page>
      ))}
    </Document>
  );
};

export default PromissoryNotePDF;