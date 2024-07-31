import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

type PromissoryNoteData = {
    amount: number;
    debtorAddress: string;
    debtorCity: string;
    debtorName: string;
    name: string;
    numberOfMonths: number;
    paymentDay: number;
    payment_place: string;
    signingDate: Date;
  };

// Define the type for the props
interface PromissoryNotePDFProps {
  data: PromissoryNoteData;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  signature: {
    marginTop: 50,
    borderTop: '1 solid black',
    paddingTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
});

// Create Document Component
const PromissoryNotePDF: React.FC<PromissoryNotePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Promissory Note</Text>
        <Text style={styles.text}>
          On {data.signingDate.toDateString()}, I, {data.debtorName}, promise to pay to the order of {data.name} 
          the sum of ${data.amount} for value received, with interest at the rate of ___ per cent, per annum.
        </Text>
        <Text style={styles.text}>
          This note is payable in {data.numberOfMonths} monthly installments of $
          {(data.amount / data.numberOfMonths).toFixed(2)} each, 
          on the {data.paymentDay}th day of each month, beginning on {new Date(data.signingDate.getFullYear(), data.signingDate.getMonth() + 1, data.paymentDay).toDateString()},
          at {data.payment_place}.
        </Text>
        <Text style={styles.text}>
          The maker and endorser of this note further agree to waive demand, notice of non-payment and protest;
          and in case suit shall be brought for the collection hereof, or the same has to be collected upon
          demand of an attorney, to pay reasonable attorney`&apos;`s fees for making such collection.
        </Text>
        <Text style={styles.signature}>
          Signature of Debtor: ______________________________
        </Text>
        <Text style={styles.text}>
          Debtor Address: {data.debtorAddress}, {data.debtorCity}
        </Text>
      </View>
    </Page>
  </Document>
);

export default PromissoryNotePDF;