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

// Header Component - Corporate style with solid background
const Header: React.FC<{ noteNumber: number; totalNotes: number; amount: number }> = ({ noteNumber, totalNotes, amount }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>PAGARÉ</Text>
    <View style={styles.headerRight}>
      <Text style={styles.headerRightItem}>
        No. {noteNumber} de {totalNotes}
      </Text>
      <View style={styles.verticalLine} />
      <Text style={styles.headerRightItem}>
        BUENO POR ${amount.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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

// Main Text Component - The promise to pay
const MainText: React.FC<{ name: string; amount: number }> = ({ name, amount }) => (
  <Text style={styles.mainText}>
    Debo(mos) y pagaré(mos) incondicionalmente por este Pagaré a la orden de{" "}
    <Text style={{ fontWeight: "bold" }}>{name}</Text>, la cantidad de{" "}
    <Text style={{ fontWeight: "bold" }}>{formatearCantidad(amount)}</Text>.
  </Text>
);

// Payment Details Component - Two column layout
const PaymentDetails: React.FC<{ paymentPlace: string; dueDate: Date }> = ({ paymentPlace, dueDate }) => (
  <View style={styles.twoLineContainer}>
    <View style={styles.lineContainer}>
      <Text style={styles.lineText}>{paymentPlace}</Text>
      <Text style={styles.lineLabel}>LUGAR DE PAGO</Text>
    </View>
    <View style={styles.lineContainer}>
      <Text style={styles.lineText}>{formatDate(dueDate)}</Text>
      <Text style={styles.lineLabel}>FECHA DE VENCIMIENTO</Text>
    </View>
  </View>
);

// Terms and Conditions Component
const TermsText: React.FC<{
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

// Debtor Info Component - Card style with accent border
const DebtorInfo: React.FC<{
  debtorName: string;
  debtorAddress: string;
  debtorCity: string;
  debtorPhone?: string
}> = ({ debtorName, debtorAddress, debtorCity, debtorPhone }) => (
  <View style={styles.debtorInfo}>
    <Text style={[styles.label, { marginBottom: 6, fontSize: 9 }]}>DATOS DEL DEUDOR</Text>
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
    {debtorPhone && (
      <View style={styles.row}>
        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.input}>{debtorPhone}</Text>
      </View>
    )}
  </View>
);

// Guarantor Info Component - Card style matching debtor (without signature)
const GuarantorInfo: React.FC<{ guarantors: Guarantor[] }> = ({ guarantors }) => (
  <View style={styles.guarantorInfo}>
    {guarantors.map((guarantor, index) => (
      <View key={index}>
        <Text style={[styles.label, { marginBottom: 6, fontSize: 9 }]}>
          DATOS DEL AVAL {guarantors.length > 1 ? index + 1 : ""}
        </Text>
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
        {guarantor.phone && (
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.input}>{guarantor.phone}</Text>
          </View>
        )}
      </View>
    ))}
  </View>
);

// Signature Component - Only debtor signature (no guarantor)
const Signature: React.FC = () => (
  <View style={styles.signatureContainer}>
    <View style={styles.signature}>
      <Text>Firma del Deudor</Text>
    </View>
  </View>
);

// Dual Signature Component - Debtor on left, Guarantor on right
const DualSignature: React.FC = () => (
  <View style={styles.dualSignatureContainer}>
    <View style={styles.signatureBox}>
      <Text style={styles.signatureText}>Firma del Deudor</Text>
    </View>
    <View style={styles.signatureBox}>
      <Text style={styles.signatureText}>Firma del Aval</Text>
    </View>
  </View>
);

// Main PromissoryNote Component
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
      <Text style={[styles.label, { textAlign: "right", fontSize: 7, marginBottom: 4 }]}>
        Lugar y fecha de expedición
      </Text>

      <MainText name={data.name} amount={data.amount} />

      <PaymentDetails paymentPlace={data.payment_place} dueDate={dueDate} />

      <TermsText
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

      {hasGuarantor ? <DualSignature /> : <Signature />}
    </View>
  );
};

// Document Component
const PromissoryNotePDF: React.FC<{ data: PromissoryNoteData }> = ({ data }) => {
  if (!data || !data.numberOfMonths || data.numberOfMonths < 1) {
    console.error("Datos de pagaré inválidos", data);
    return (
      <Document>
        <Page size="LETTER">
          <View style={{ padding: 40 }}>
            <Text style={{ fontSize: 14, color: "#c62828" }}>
              Error: Datos de pagaré inválidos o incompletos
            </Text>
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
