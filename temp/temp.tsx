import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatearCantidad } from '../../lib/number-to-letter';

// ... (otros imports y tipos se mantienen igual)

const getAdjustedPaymentDate = (baseDate: Date, paymentDay: number): Date => {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const adjustedDay = Math.min(paymentDay, lastDayOfMonth);
  return new Date(year, month, adjustedDay);
};

const PromissoryNote: React.FC<{ data: PromissoryNoteData; noteNumber: number }> = ({ data, noteNumber }) => {
  const cantidadEnLetras = formatearCantidad(data.amount);
  const baseDate = new Date(data.signingDate);
  baseDate.setMonth(baseDate.getMonth() + noteNumber - 1);
  const dueDate = getAdjustedPaymentDate(baseDate, data.paymentDay);

  return (
    <View style={styles.pagare}>
      {/* ... (el resto del contenido del pagaré se mantiene igual) */}
      <View style={styles.twoLineContainer}>
        <View style={styles.lineContainer}>
          <Text style={styles.lineText}>{data.payment_place}</Text>
          <Text style={styles.lineLabel}>Lugar de pago</Text>
        </View>
        <View style={styles.lineContainer}>
          <Text style={styles.lineText}>
            {dueDate.getDate()} de {getSpanishMonth(dueDate.getMonth())} de {dueDate.getFullYear()}
          </Text>
          <Text style={styles.lineLabel}>Fecha de Pago</Text>
        </View>
      </View>
      {/* ... (el resto del contenido del pagaré se mantiene igual) */}
    </View>
  );
};

const PromissoryNotePDF: React.FC<PromissoryNotePDFProps> = ({ data }) => {
  console.log("PromissoryNotePDF data:", data); // Para depuración

  const pagaresPerPage = 2;
  const totalPages = Math.ceil(data.numberOfMonths / pagaresPerPage);

  return (
    <Document>
      {Array.from({ length: totalPages }, (_, pageIndex) => (
        <Page key={pageIndex} size="LETTER" orientation="portrait" style={styles.page}>
          {Array.from({ length: pagaresPerPage }, (_, i) => {
            const noteNumber = pageIndex * pagaresPerPage + i + 1;
            if (noteNumber <= data.numberOfMonths) {
              return <PromissoryNote key={i} data={data} noteNumber={noteNumber} />;
            }
            return null;
          })}
        </Page>
      ))}
    </Document>
  );
};

export default PromissoryNotePDF;