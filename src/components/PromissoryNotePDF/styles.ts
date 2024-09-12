// src/components/PromissoryNotePDF/styles.ts

import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  pageWithoutGuarantor: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 10,
    paddingTop: 10, // Aumenta el margen superior
  },
  pageWithGuarantor: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 10,
    paddingTop: 15, // Aumenta el margen superior
  },
  pagareWithoutGuarantor: {
    border: "0.5 solid #1b5e20",
    borderRadius: 2,
    padding: 9,
    marginBottom: 10,
    backgroundColor: "#fdfdfd",
    width: "100%",
  },
  pagareWithGuarantor: {
    border: "0.5 solid #1b5e20",
    borderRadius: 2,
    padding: 7,
    marginBottom: 15,
    backgroundColor: "#fdfdfd",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
    padding: 7,
    marginBottom: 5,
    borderRadius: 4,
    border: "1 solid #1b5e20",
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    fontSize: 9,
    alignItems: "center",
  },
  headerRightItem: {
    paddingHorizontal: 4,
  },
  verticalLine: {
    borderLeft: "0.5 solid #1b5e20",
    height: "100%",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 1,
  },
  dateText: {
    fontSize: 9,
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  input: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 1,
    marginLeft: 2,
    fontSize: 8,
  },
  mainText: {
    fontSize: 8,
    marginVertical: 6,
  },
  label: {
    fontSize: 8,
    color: "#1b5e20",
  },
  smallText: {
    fontSize: 7,
    color: "#1b5e20",
    marginBottom: 3,
  },
  debtorInfo: {
    border: "0.5 solid #1b5e20",
    padding: 3,
    marginTop: 3,
  },
  signature: {
    alignItems: "flex-end",
    marginTop: 6,
    marginBottom: 6,
    fontSize: 9,
  },
  twoLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  lineContainer: {
    flex: 1,
  },
  lineText: {
    fontSize: 8,
    borderBottom: "0.5 solid #1b5e20",
    paddingBottom: 3,
  },
  lineLabel: {
    fontSize: 8,
    color: "#1b5e20",
    marginTop: 3,
  },
  guarantorInfo: {
    border: "0.5 solid #1b5e20",
    padding: 2,
    marginTop: 5,
  },
  guarantorTitle: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#1b5e20",
    marginBottom: 3,
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  inlineLabel: {
    fontSize: 7,
    color: "#1b5e20",
  },
  inlineInput: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 1,
    marginLeft: 2,
    fontSize: 8,
  },
  guarantorSignature: {
    marginTop: 12,
    paddingTop: 5,
  },
  guarantorSignatureText: {
    fontSize: 8,
    color: "#1b5e20",
    textAlign: "center",
    marginBottom: 3,
  },
  combinedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  addressInput: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 2,
    marginLeft: 2,
    fontSize: 8,
  },
  cityInput: {
    borderBottom: "0.5 solid #1b5e20",
    flex: 1,
    marginLeft: 2,
    fontSize: 8,
  },
});
