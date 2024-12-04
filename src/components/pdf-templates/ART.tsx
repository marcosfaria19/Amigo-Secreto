import React from "react";
import { Page, Text, StyleSheet, Document, Font } from "@react-pdf/renderer";

Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/arial.ttf" },
    { src: "/fonts/arialbd.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    padding: 40,
    fontSize: 12,
    lineHeight: 1.5,
    color: "#315599",
    fontFamily: "Arial",
    textAlign: "justify",
  },
  text: {
    marginBottom: 5,
  },
});

const ART: React.FC<{ formData: any }> = ({ formData }) => {
  const renderValue = () => {
    const { executionType, siteValue, internalValue } =
      formData.commercialConditions || {};

    switch (executionType) {
      case "site":
        return (
          <Text style={styles.text}>
            VALOR IN LOCO: R$ {siteValue || "N/A"}
          </Text>
        );
      case "internal":
        return (
          <Text style={styles.text}>
            VALOR INTERNO: R$ {internalValue || "N/A"}
          </Text>
        );
      case "both":
        return (
          <>
            <Text style={styles.text}>
              VALOR IN LOCO: R$ {siteValue || "N/A"}
            </Text>
            <Text style={styles.text}>
              VALOR INTERNO: R$ {internalValue || "N/A"}
            </Text>
          </>
        );
      default:
        return <Text style={styles.text}>VALOR: N/A</Text>;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.text}>ART -:- PPI TESTES</Text>
        <Text style={styles.text}>
          RAZÃO SOCIAL: {formData.client?.name || "N/A"}
        </Text>
        <Text style={styles.text}>
          CIDADE: {formData.client?.city || ""}/{formData.client?.uf || ""}
        </Text>
        <Text style={styles.text}>
          ENDEREÇO: {formData.client?.street || "N/A"}
        </Text>
        <Text style={styles.text}>
          BAIRRO: {formData.client?.neighborhood || "N/A"}
        </Text>
        <Text style={styles.text}>
          CARTA PROPOSTA: {formData.proposal?.proposalNumber || "N/A"}
        </Text>
        {renderValue()}
        <Text style={styles.text}>
          PEDIDO DE COMPRA:{" "}
          {formData.commercialConditions?.purchaseOrderNumber || "N/A"}
        </Text>
        <Text style={styles.text}>
          DATA EXECUÇÃO: {formData.commercialConditions?.serviceDate || "N/A"} -{" "}
          {formData.commercialConditions?.executionType === "site"
            ? "IN LOCO"
            : formData.commercialConditions?.executionType === "internal"
            ? "INTERNO"
            : "IN LOCO E INTERNO"}
        </Text>
        <Text style={styles.text}>
          CONTATO: {formData.client?.careOf || "N/A"}
        </Text>
        <Text style={styles.text}>
          TELEFONE: {formData.client?.phone || "N/A"}
        </Text>
        <Text style={styles.text}>
          DESCRIÇÃO DO SERVIÇO: SERVIÇO DE TESTES E ENSAIOS ELÉTRICOS EM EPIS E
          EPCS CONFORME DETERMINAÇÃO DA NORMA REGULAMENTADORA 10 (NR-10). ITEM
          10.7.8: OS EQUIPAMENTOS, FERRAMENTAS E DISPOSITIVOS ISOLANTES OU
          EQUIPADOS COM MATERIAIS ISOLANTES, DESTINADOS AO TRABALHO EM ALTA
          TENSÃO, DEVEM SER SUBMETIDOS A TESTES ELÉTRICOS OU ENSAIOS DE
          LABORATÓRIO PERIÓDICOS, OBEDECENDO-SE AS ESPECIFICAÇÕES DO FABRICANTE,
          OS PROCEDIMENTOS DA EMPRESA E NA AUSÊNCIA DESSES, ANUALMENTE.
        </Text>
      </Page>
    </Document>
  );
};

export default ART;
