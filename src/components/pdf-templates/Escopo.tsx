import React from "react";
import {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
  Font,
} from "@react-pdf/renderer";
import PDFHeader from "components/pdf-templates/common/PDFHeader";
import PDFFooter from "components/pdf-templates/common/PDFFooter";

Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/arial.ttf" },
    { src: "/fonts/arialbd.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 120,
    paddingLeft: 70,
    paddingBottom: 70,
    paddingRight: 50,
    lineHeight: 1.2,
    fontFamily: "Arial",
    textAlign: "justify",
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  header: {
    fontSize: 10,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 10,
    textIndent: 20,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableHeader: {
    margin: "auto",
    fontSize: 10,
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  tableContent: {
    margin: "auto",
    fontSize: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  signature: {
    marginTop: 30,
    textAlign: "center",
    lineHeight: 1,
  },
});

interface Client {
  name: string;
  city: string;
  uf: string;
  street: string;
  neighborhood: string;
  cnpj: string;
  careOf: string;
  emails: string[];
  phone: string;
}

interface Equipment {
  name: string;
  quantity: number;
  unit?: string;
  unitPlural?: string;
}

interface Proposal {
  proposalNumber: string;
  date: string;
}

interface CommercialConditions {
  dailyRate: number;
  hoursPerDay: number;
  serviceDate: string;
}

interface FormData {
  type: string;
  client: Client;
  proposal: Proposal;
  equipments: Equipment[];
  commercialConditions: CommercialConditions;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const TextContent: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style = {} }) => (
  <Text style={{ ...styles.text, ...style }}>{children}</Text>
);

const Table: React.FC<{ headers: string[]; data: string[][] }> = ({
  headers,
  data,
}) => (
  <View style={styles.table}>
    <View style={styles.tableRow}>
      {headers.map((header, index) => (
        <View
          key={index}
          style={[styles.tableHeader, { width: `${100 / headers.length}%` }]}
        >
          <Text>{header}</Text>
        </View>
      ))}
    </View>
    {data.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.tableRow}>
        {row.map((cell, cellIndex) => (
          <View
            key={cellIndex}
            style={[styles.tableContent, { width: `${100 / row.length}%` }]}
          >
            <Text>{cell}</Text>
          </View>
        ))}
      </View>
    ))}
  </View>
);

const Escopo: React.FC<{ formData: FormData }> = ({ formData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader />

        <Text style={styles.title}>{formData.type || "N/A"}</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            CARTA PROPOSTA {formData.proposal.proposalNumber || "N/A"}
          </Text>
          <Text style={styles.header}>
            JAGUARIÚNA, {formData.proposal.date || "N/A"}
          </Text>
        </View>

        <Section title="Client Information">
          <Text style={styles.header}>
            À {formData.client?.name || "Nome do Cliente"}
          </Text>
          <Text style={styles.header}>
            CIDADE: {formData.client?.city || ""}/{formData.client?.uf || ""} -
            CNPJ: {formData.client?.cnpj || "N/A"}
          </Text>
        </Section>

        <Section title="Contact Information">
          <Text style={styles.header}>
            A/C: {formData.client?.careOf || "Contato não especificado"}
          </Text>
          <Text style={{ ...styles.header, fontWeight: "normal" }}>
            E-MAIL: {formData.client.emails.join(" / ")} - TELEFONE:{" "}
            {formData.client.phone}
          </Text>
        </Section>

        <TextContent style={{ textIndent: 0, marginBottom: 10 }}>
          REF.: SERVIÇO TÉCNICO ESPECIALIZADO EM REALIZAÇÃO DE TESTES E ENSAIOS
          ELÉTRICOS EM EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL E COLETIVA - CONFORME
          NR 10.
        </TextContent>

        <Section title="1.0 INTRODUÇÃO E OBRIGATORIEDADE:">
          <TextContent>
            DE ACORDO COM A <Text style={{ fontWeight: "bold" }}>NR-10</Text>
            (NORMA REGULAMENTADORA 10 – SEGURANÇA EM INSTALAÇÕES E SERVIÇOS EM
            ELETRICIDADE)
            <Text style={{ fontWeight: "bold" }}>ITEM 10.2.4</Text> ALÍNEA E (OS
            ESTABELECIMENTOS COM CARGA INSTALADA SUPERIOR A 75 KW DEVEM POSSUIR
            OS RESULTADOS DOS TESTES DE ISOLAÇÃO ELÉTRICA REALIZADOS EM
            EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL E COLETIVA)
          </TextContent>
        </Section>

        <Section title="2.0 EQUIPAMENTOS ENVOLVIDOS:">
          <Table
            headers={["EQUIPAMENTOS – EPIS / EPCS"]}
            data={formData.equipments?.map((equipment) => [
              `${(equipment.name || "N/A").toUpperCase()} - ${equipment.quantity} ${
                equipment.quantity > 1
                  ? equipment.unitPlural
                  : equipment.unit || "N/A"
              }`,
            ])}
          />
        </Section>

        <PDFFooter />
      </Page>

      <Page size="A4" style={styles.page}>
        <PDFHeader />

        <Section title="3.0 ESCOPO DO SERVIÇO:">
          <TextContent>
            REALIZAÇÃO DE TESTES E ENSAIOS ELÉTRICOS DOS EQUIPAMENTOS DE
            PROTEÇÃO INDIVIDUAL E COLETIVA COM FORNECIMENTO DE RELATÓRIO TÉCNICO
            DO SERVIÇO REALIZADO, DE ACORDO COM A ABNT E NORMA REGULAMENTADORA
            DO MINISTÉRIO DO TRABALHO NR-10.
          </TextContent>
        </Section>

        <Section title="4.0 PRAZO DE EXECUÇÃO IN-LOCO:">
          <TextContent>
            {formData.commercialConditions.dailyRate > 1
              ? `${formData.commercialConditions.dailyRate} DIÁRIAS`
              : `${formData.commercialConditions.dailyRate} DIÁRIA`}{" "}
            NA PLANTA DA CONTRATANTE, SENDO UM TOTAL DE{" "}
            {formData.commercialConditions.hoursPerDay || ""} HORAS POR DIA,
            INCLUINDO INTEGRAÇÃO / LIBERAÇÕES E REALIZAÇÃO DAS ATIVIDADES.
          </TextContent>
        </Section>

        <Section title="5.0 INCLUSO NESTE SERVIÇO:">
          <TextContent>Relatório Técnico</TextContent>
          <TextContent>Deslocamento de técnico especializado</TextContent>
          <TextContent>
            Despesas de viagens (desde que dentro de um raio de 150Km de
            distância)
          </TextContent>
        </Section>

        <Section title="6.0 VALOR DO SERVIÇO:">
          <TextContent>
            O VALOR TOTAL DO SERVIÇO SERÁ DE R$
            {formData.commercialConditions.dailyRate *
              formData.equipments.length || "N/A"}
            . A PROPOSTA NÃO INCLUI OUTROS SERVIÇOS QUE NÃO ESTÃO ESPECIFICADOS.
          </TextContent>
        </Section>

        <Section title="7.0 CONDIÇÕES DE PAGAMENTO:">
          <TextContent>EM ATÉ 03 VEZES SEM JUROS.</TextContent>
        </Section>

        <Text style={styles.signature}>
          _____________________________
          <Text> ASSINATURA E CARIMBO DA EMPRESA</Text>
        </Text>

        <PDFFooter />
      </Page>
    </Document>
  );
};

export default Escopo;
