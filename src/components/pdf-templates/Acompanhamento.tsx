import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/arial.ttf" },
    { src: "/fonts/arialbd.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: "Arial",
  },
  headerContainer: {
    border: 1,
    borderBottom: 0,
    borderColor: "#000000",
  },
  header: {
    textAlign: "center",
    padding: 8,
    fontSize: 12,
  },
  table: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: "#000000",
    minHeight: 20,
  },
  firstRow: {
    borderTop: 1,
  },
  label: {
    width: "16%",
    borderRight: 1,
    borderColor: "#000000",
    padding: 4,
  },
  content: {
    flex: 1,
    padding: 4,
    justifyContent: "center",
  },
  splitLabel: {
    width: "15%",
    borderLeft: 1,
    borderColor: "#000000",
    padding: 4,
  },
  splitContent: {
    width: "20%",
    padding: 4,
  },
  clientInfoSection: {
    marginTop: 0,
  },
  contactInfoSection: {
    borderTop: 1,
    marginTop: 10,
  },
  equipmentTable: {
    marginTop: 10,
  },
  equipmentHeader: {
    padding: 4,
    fontWeight: "bold",
    border: 1,
    borderColor: "#000000",
  },
  equipmentRow: {
    padding: 4,
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: "#000000",
  },
});

const Acompanhamento: React.FC<{ formData: any }> = ({ formData }) => {
  const { client, proposal, equipments } = formData;

  const formatPhone = (phone: string) => {
    return phone || "(00) 0000-0000";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text>PPI TESTES – 28.125.479/0001-86</Text>
            <Text>SERVIÇO TÉCNICO ESPECIALIZADO NA REALIZAÇÃO DE</Text>
            <Text>TESTES E ENSAIOS ELÉTRICOS DE EQUIPAMENTOS DE</Text>
            <Text>PROTEÇÃO INDIVIDUAL E COLETIVA (NR-10) SERVIÇO IN LOCO</Text>
          </View>
        </View>

        <View style={[styles.table, styles.clientInfoSection]}>
          <View style={[styles.row, styles.firstRow]}>
            <View style={styles.label}>
              <Text>CARTA PROPOSTA</Text>
            </View>
            <View style={styles.content}>
              <Text>{proposal?.proposalNumber || "0000-0000"}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.label}>
              <Text>CLIENTE</Text>
            </View>
            <View style={styles.content}>
              <Text>{client?.name || "Nome"}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.label}>
              <Text>CIDADE</Text>
            </View>
            <View style={styles.content}>
              <Text>{client?.city || "Nome"}</Text>
            </View>
            <View style={styles.splitLabel}>
              <Text>ESTADO</Text>
            </View>
            <View style={[styles.splitContent, { borderLeft: 1 }]}>
              <Text>{client?.uf || ""}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.table, styles.contactInfoSection]}>
          <View style={styles.row}>
            <View style={styles.label}>
              <Text>CONTATO</Text>
            </View>
            <View style={styles.content}>
              <Text>{client?.careOf || "Nome"}</Text>
            </View>
            <View style={styles.splitLabel}>
              <Text>FONE</Text>
            </View>
            <View style={[styles.splitContent, { borderLeft: 1 }]}>
              <Text>{formatPhone(client?.phone)}</Text>
            </View>
          </View>

          {client?.emails?.map((email: string, index: number) => (
            <View key={index} style={styles.row}>
              <View style={styles.label}>
                <Text>E-MAIL</Text>
              </View>
              <View style={styles.content}>
                <Text>{email}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.equipmentTable}>
          <View style={styles.equipmentHeader}>
            <Text>EQUIPAMENTOS – EPIS E EPCS</Text>
          </View>

          {equipments?.map((equipment: any, index: number) => (
            <View key={index} style={styles.equipmentRow}>
              <Text>
                {equipment.name} - {equipment.quantity} {equipment.unitPlural}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Acompanhamento;
