import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatearCantidad } from '../../lib/number-to-letter';

type Guarantor = {
  name: string;
  address: string;
  city: string;
  phone: string;
};

type PromissoryNoteData = {
  amount: number;
  interestRate: number;
  debtorAddress: string;
  debtorCity: string;
  debtorName: string;
  debtorPhone: string;
  name: string;
  numberOfMonths: number;
  paymentDay: number;
  payment_place: string;
  signingDate: Date;
  numberOfGuarantors: number;
  guarantors: Guarantor[];
};

interface PromissoryNotePDFProps {
  data: PromissoryNoteData;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 8,
  },
  pagare: {
    border: "0.5 solid #1b5e20",
    borderRadius: 2,
    padding: 3,
    marginBottom: 5,
    backgroundColor: "#e8f5e9",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1b5e20",
    color: "white",
    padding: 2,
    marginBottom: 2,
  },
  headerText: {
    fontSize: 9,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    fontSize: 6,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 1,
  },
  dateText: {
    fontSize: 7,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  input: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 1,
    marginLeft: 2,
    fontSize: 6,
  },
  mainText: {
    fontSize: 8,
    marginVertical: 2,
  },
  label: {
    fontSize: 7,
    color: "#1b5e20",
  },
  smallText: {
    fontSize: 6,
    color: "#1b5e20",
    marginBottom: 1,
  },
  debtorInfo: {
    border: "0.5 solid #1b5e20",
    padding: 2,
    marginTop: 1,
  },
  signature: {
    alignItems: "flex-end",
    marginTop: 3,
  },
  twoLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 2,
  },
  lineContainer: {
    flex: 1,
  },
  lineText: {
    fontSize: 8,
    borderBottom: "0.5 solid #1b5e20",
    paddingBottom: 1,
  },
  lineLabel: {
    fontSize: 7,
    color: "#1b5e20",
    marginTop: 1,
  },
  guarantorInfo: {
    border: "0.5 solid #1b5e20",
    padding: 2,
    marginTop: 2,
  },
  guarantorTitle: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 1,
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  inlineLabel: {
    fontSize: 7,
    color: "#1b5e20",
  },
  inlineInput: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 1,
    marginLeft: 2,
    fontSize: 7,
  },
  guarantorSignature: {
    marginTop: 3,
    borderTop: "0.5 dashed #1b5e20",
    paddingTop: 2,
  },
  guarantorSignatureText: {
    fontSize: 7,
    color: "#1b5e20",
    textAlign: "center",
  },
  combinedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  addressInput: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 2,
    marginLeft: 2,
    fontSize: 6,
  },
  cityInput: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 1,
    marginLeft: 2,
    fontSize: 6,
  },
});

const getSpanishMonth = (month: number): string => {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];
  return months[month];
};

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = getSpanishMonth(date.getMonth());
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
};

const PromissoryNote: React.FC<{ data: PromissoryNoteData; noteNumber: number }> = ({ data, noteNumber }) => {
  const cantidadEnLetras = formatearCantidad(data.amount);
  const dueDate = new Date(data.signingDate);
  dueDate.setMonth(dueDate.getMonth() + noteNumber);

  return (
    <View style={styles.pagare}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PAGARÉ</Text>
        <View style={styles.headerRight}>
          <Text>No. {noteNumber} de {data.numberOfMonths}</Text>
          <Text style={{ marginLeft: 5 }}>
            BUENO POR $ {data.amount.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>
          En {data.payment_place} a {formatDate(data.signingDate)}
        </Text>
      </View>
      <Text style={[styles.label, { textAlign: "right" }]}>
        Lugar y fecha de expedición
      </Text>
      <Text style={styles.mainText}>
        Debo(mos) y pagaré(mos) incondicionalmente por este Pagaré a la orden de {data.name}, la cantidad de {cantidadEnLetras}.
      </Text>
      <View style={styles.twoLineContainer}>
        <View style={styles.lineContainer}>
          <Text style={styles.lineText}>{data.payment_place}</Text>
          <Text style={styles.lineLabel}>Lugar de pago</Text>
        </View>
        <View style={styles.lineContainer}>
          <Text style={styles.lineText}>
            {data.paymentDay} de {getSpanishMonth(dueDate.getMonth())} de {dueDate.getFullYear()}
          </Text>
          <Text style={styles.lineLabel}>Fecha de Pago</Text>
        </View>
      </View>

      <Text style={styles.smallText}>
        Valor recibido a mi (nuestra) entera satisfacción. Este pagaré forma parte de una serie numerada del 1 al {data.numberOfMonths} y todos están sujetos a la condición de que, al no pagarse cualquiera de ellos a su vencimiento, serán exigibles todos los que le sigan en número, además de los ya vencidos, desde la fecha de vencimiento de este documento hasta el día de su liquidación, causará intereses moratorios al tipo de {data.interestRate.toFixed(2)}% mensual, pagadero en esta ciudad juntamente con el principal.
      </Text>

      <View style={styles.debtorInfo}>
        <Text style={styles.label}>Nombre y datos del deudor:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.input}>{data.debtorName}</Text>
        </View>
        <View style={styles.combinedRow}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.addressInput}>{data.debtorAddress}</Text>
          <Text style={styles.label}>Población:</Text>
          <Text style={styles.cityInput}>{data.debtorCity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tel:</Text>
          <Text style={styles.input}>{data.debtorPhone}</Text>
        </View>
      </View>

      {data.numberOfGuarantors > 0 && data.guarantors && data.guarantors.length > 0 && (
        <View style={styles.guarantorInfo}>
           {data.guarantors.map((guarantor, index) => (
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
                  Firma del Aval {index + 1}: _____________________ 
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={styles.signature}>
        <Text style={styles.label}>Firma(s) del Deudor: ____________________</Text>
      </View>
    </View>
  );
};

const PromissoryNotePDF: React.FC<PromissoryNotePDFProps> = ({ data }) => {
  console.log("PromissoryNotePDF data:", data); // For debugging

  const pagaresPerPage = 3;
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