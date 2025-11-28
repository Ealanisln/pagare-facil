// src/components/PromissoryNotePDF/styles.ts

import { StyleSheet } from "@react-pdf/renderer";

// Color palette
const colors = {
  primary: "#1b5e20",
  primaryLight: "#2e7d32",
  primaryDark: "#0d3d13",
  accent: "#e8f5e9",
  border: "#1b5e20",
  borderLight: "#a5d6a7",
  text: "#1a1a1a",
  textMuted: "#4a4a4a",
  background: "#ffffff",
  backgroundAlt: "#fafafa",
};

export const styles = StyleSheet.create({
  // Page layouts
  pageWithoutGuarantor: {
    flexDirection: "column",
    backgroundColor: colors.background,
    padding: 8,
    paddingTop: 8,
  },
  pageWithGuarantor: {
    flexDirection: "column",
    backgroundColor: colors.background,
    padding: 8,
    paddingTop: 8,
  },

  // Pagaré container
  pagareWithoutGuarantor: {
    border: `1.5 solid ${colors.primary}`,
    padding: 8,
    marginBottom: 6,
    backgroundColor: colors.background,
    width: "100%",
    height: 242, // ~1/3 of letter page height (792 - margins) / 3
    flexDirection: "column",
  },
  pagareWithGuarantor: {
    border: `1.5 solid ${colors.primary}`,
    padding: 8,
    marginBottom: 8,
    backgroundColor: colors.background,
    width: "100%",
    height: 376, // ~1/2 of letter page height (792 - margins) / 2
    flexDirection: "column",
  },

  // Header section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    color: colors.background,
    padding: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.background,
    letterSpacing: 2,
  },
  headerRight: {
    flexDirection: "row",
    fontSize: 9,
    alignItems: "center",
    color: colors.background,
  },
  headerRightItem: {
    paddingHorizontal: 8,
    color: colors.background,
  },
  verticalLine: {
    borderLeft: `1 solid ${colors.background}`,
    height: 14,
    opacity: 0.5,
  },

  // Date row
  dateRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 2,
    paddingRight: 2,
  },
  dateText: {
    fontSize: 9,
    textAlign: "right",
    color: colors.text,
  },

  // Main text content
  mainText: {
    fontSize: 8,
    marginVertical: 6,
    lineHeight: 1.4,
    color: colors.text,
    textAlign: "justify",
  },

  // Labels and inputs
  label: {
    fontSize: 8,
    color: colors.primary,
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 6,
    color: colors.textMuted,
    marginBottom: 4,
    marginTop: 2,
    lineHeight: 1.3,
    textAlign: "justify",
    paddingHorizontal: 2,
  },

  // Row layouts
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "flex-end",
  },
  input: {
    borderBottom: `1 solid ${colors.borderLight}`,
    flex: 1,
    marginLeft: 4,
    fontSize: 9,
    paddingBottom: 2,
    color: colors.text,
  },

  // Two column layout
  twoLineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 4,
    gap: 20,
  },
  lineContainer: {
    flex: 1,
  },
  lineText: {
    fontSize: 9,
    borderBottom: `1 solid ${colors.borderLight}`,
    paddingBottom: 4,
    color: colors.text,
  },
  lineLabel: {
    fontSize: 7,
    color: colors.primary,
    marginTop: 3,
    fontWeight: "bold",
  },

  // Debtor info section
  debtorInfo: {
    border: `1 solid ${colors.borderLight}`,
    borderLeft: `3 solid ${colors.primary}`,
    padding: 6,
    marginTop: 4,
    backgroundColor: colors.backgroundAlt,
  },

  // Signature section (single - centered, no line)
  signatureContainer: {
    marginTop: "auto",
    marginBottom: 4,
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  signature: {
    alignItems: "center",
    fontSize: 7,
    color: colors.textMuted,
  },

  // Guarantor section
  guarantorInfo: {
    border: `1 solid ${colors.borderLight}`,
    borderLeft: `3 solid ${colors.primary}`,
    padding: 5,
    marginTop: 4,
    backgroundColor: colors.backgroundAlt,
  },
  guarantorTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  inlineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "flex-end",
  },
  inlineLabel: {
    fontSize: 7,
    color: colors.primary,
    fontWeight: "bold",
  },
  inlineInput: {
    borderBottom: `1 solid ${colors.borderLight}`,
    flex: 1,
    marginLeft: 4,
    fontSize: 8,
    paddingBottom: 2,
    color: colors.text,
  },
  // Dual signature container (debtor left, guarantor right)
  dualSignatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 4,
    paddingHorizontal: 20,
  },
  signatureBox: {
    width: 180,
    borderTop: `1 solid ${colors.borderLight}`,
    paddingTop: 4,
    alignItems: "center",
  },
  signatureText: {
    fontSize: 7,
    color: colors.textMuted,
    textAlign: "center",
  },

  // Combined row for address/city
  combinedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "flex-end",
  },
  addressInput: {
    borderBottom: `1 solid ${colors.borderLight}`,
    flex: 2,
    marginLeft: 4,
    marginRight: 12,
    fontSize: 9,
    paddingBottom: 2,
    color: colors.text,
  },
  cityInput: {
    borderBottom: `1 solid ${colors.borderLight}`,
    flex: 1,
    marginLeft: 4,
    fontSize: 9,
    paddingBottom: 2,
    color: colors.text,
  },

  // Section title style
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
