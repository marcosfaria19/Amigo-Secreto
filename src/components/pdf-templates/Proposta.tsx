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

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const TextContent = ({ children, style = {} }) => (
  <Text style={{ ...styles.text, ...style }}>{children}</Text>
);

const Table = ({ headers, data }) => (
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

export default function Proposta({
  proposal = {},
  equipments = [],
  commercialConditions = {},
  client = {},
  type = "Comercial",
}) {
  const showSite =
    commercialConditions.executionType === "site" ||
    commercialConditions.executionType === "both";
  const showInternal =
    commercialConditions.executionType === "internal" ||
    commercialConditions.executionType === "both";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PDFHeader />

        <Text style={styles.title}>{type || "N/A"}</Text>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            CARTA PROPOSTA {proposal.proposalNumber}
          </Text>
          <Text style={styles.header}>JAGUARIÚNA, {proposal.date}</Text>
        </View>

        <Section title="">
          <Text style={styles.header}>
            À {client.name || "Nome do Cliente"}
          </Text>
          <Text style={styles.header}>
            CIDADE: {client?.city || ""}/{client?.uf || ""} - CNPJ:{" "}
            {client?.cnpj || "N/A"}
          </Text>
        </Section>
        <Section title="">
          <Text style={styles.header}>A/C: {client.careOf}</Text>
          <Text style={{ ...styles.header, fontWeight: "normal" }}>
            E-MAIL: {client.emails.join(" / ")} - TELEFONE: {client.phone}
          </Text>
        </Section>

        <TextContent style={{ textIndent: 0, marginBottom: 10 }}>
          REF.: SERVIÇO TÉCNICO ESPECIALIZADO EM REALIZAÇÃO DE TESTES E ENSAIOS
          ELÉTRICOS EM EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL E COLETIVA - CONFORME
          NR 10.
        </TextContent>

        <Section title="1.0 INTRODUÇÃO E OBRIGATORIEDADE:">
          <TextContent>
            DE ACORDO COM A <Text style={{ fontWeight: "bold" }}>NR-10</Text>{" "}
            (NORMA REGULAMENTADORA 10 – SEGURANÇA EM INSTALAÇÕES E SERVIÇOS EM
            ELETRICIDADE){" "}
            <Text style={{ fontWeight: "bold" }}>ITEM 10.2.4</Text> ALÍNEA E (OS
            ESTABELECIMENTOS COM CARGA INSTALADA SUPERIOR A 75 KW DEVEM POSSUIR
            OS RESULTADOS DOS TESTES DE ISOLAÇÃO ELÉTRICA REALIZADOS EM
            EQUIPAMENTOS DE PROTEÇÃO INDIVIDUAL E COLETIVA){" "}
            <Text style={{ fontWeight: "bold" }}>ITEM 10.4.3.1</Text> (OS
            EQUIPAMENTOS, DISPOSITIVOS E FERRAMENTAS QUE POSSUAM ISOLAMENTO
            ELÉTRICO DEVEM ESTAR ADEQUADOS AS TENSÕES ENVOLVIDAS, E SEREM
            INSPECIONADOS E TESTADOS DE ACORDO COM AS REGULAMENTAÇÕES EXISTENTES
            OU RECOMENDAÇÕES DO FABRICANTE) O{" "}
            <Text style={{ fontWeight: "bold" }}>ITEM 10.7.8</Text> (OS
            EQUIPAMENTOS, FERRAMENTAS E DISPOSITIVOS ISOLANTES OU EQUIPADOS COM
            MATERIAIS ISOLANTES, DESTINADOS AO TRABALHO EM ALTA TENSÃO, DEVEM
            SER SUBMETIDOS A TESTES ELÉTRICOS OU ENSAIOS DE LABORATÓRIO
            PERIÓDICOS, OBEDECENDO-SE AS ESPECIFICAÇÕES DO FABRICANTE, OS
            PROCEDIMENTOS DA EMPRESA E NA AUSÊNCIA DESSES ANUALMENTE).
          </TextContent>
        </Section>

        <Section title="2.0 EQUIPAMENTOS ENVOLVIDOS:">
          <Table
            headers={["EQUIPAMENTOS – EPIS / EPCS"]}
            data={equipments.map((equipment) => [
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
        {showSite && (
          <Section title="4.0 PRAZO DE EXECUÇÃO IN-LOCO:">
            <TextContent>
              {commercialConditions.dailyRate > 1
                ? `${commercialConditions.dailyRate} DIÁRIAS`
                : `${commercialConditions.dailyRate} DIÁRIA`}{" "}
              NA PLANTA DA CONTRATANTE, SENDO UM TOTAL DE{" "}
              {commercialConditions.hoursPerDay} HORAS POR DIA, INCLUINDO
              INTEGRAÇÃO / LIBERAÇÕES E REALIZAÇÃO DAS ATIVIDADES.
            </TextContent>
          </Section>
        )}
        {showInternal && (
          <Section
            title={
              showSite
                ? "4.1 PRAZO DE EXECUÇÃO INTERNO:"
                : "4.0 PRAZO DE EXECUÇÃO INTERNO:"
            }
          >
            <TextContent>
              TEMPO NECESSÁRIO PARA O SERVIÇO SER REALIZADO NO NOSSO LABORATÓRIO
              EM JAGUARIÚNA-SP.
            </TextContent>
          </Section>
        )}
        {showSite && (
          <Section title="5.0 PREÇO DO SERVIÇO IN-LOCO:">
            <TextContent>R$ {commercialConditions.siteValue}</TextContent>
          </Section>
        )}
        {showInternal && (
          <Section
            title={
              showSite
                ? "5.1 PREÇO DO SERVIÇO INTERNO:"
                : "5.0 PREÇO DO SERVIÇO INTERNO:"
            }
          >
            <TextContent>R$ {commercialConditions.internalValue}</TextContent>
          </Section>
        )}

        <Section title="6.0 CONDIÇÕES COMERCIAIS:">
          <TextContent>
            VALIDADE: <Text style={{ fontWeight: "bold" }}>30 DIAS;</Text>
          </TextContent>
          <TextContent>
            FORMA DE PAGAMENTO: FATURADO A 24 DIAS APÓS O TÉRMINO DO SERVIÇO E
            ENTREGA DO RELATÓRIO ELETRÔNICO;
          </TextContent>
          <TextContent>
            CÓDIGO DO SERVIÇO:{" "}
            <Text style={{ fontWeight: "bold" }}> 17.09;</Text>
          </TextContent>
          <TextContent>
            TODOS OS IMPOSTOS E TAXAS SOBRE O VALOR DO SERVIÇO.
          </TextContent>
          <TextContent>
            DADOS PARA DEPÓSITO:
            <Text style={{ textIndent: 20, fontWeight: "bold" }}>
              {"\n"}BANCO C6 S/A (336)
            </Text>
            <Text style={{ textIndent: 20, fontWeight: "bold" }}>
              {"\n"}AGÊNCIA: 0001
            </Text>
            <Text style={{ textIndent: 20, fontWeight: "bold" }}>
              {"\n"}CONTA CORRENTE: 34697075-0
            </Text>
            <Text style={{ textIndent: 20, fontWeight: "bold" }}>
              {"\n"}CHAVE PIX (CNPJ): 57.583.883/0001-27
            </Text>
          </TextContent>
        </Section>

        <Section title="7.0 INCLUSO NESTE SERVIÇO:">
          <TextContent>
            MOBILIZAÇÃO (TRANSPORTE E ALIMENTAÇÃO) + HOSPEDAGEM (SE NECESSÁRIO)
            + RECOLHIMENTO DA ART CASO NECESSÁRIO;
          </TextContent>
          <TextContent>
            REALIZAÇÃO DE TODOS OS TESTES E ENSAIOS OPERACIONAIS CONFORME NBR
            16295, NBR 5456 – ABNT E NORMA REGULAMENTADORA DO MINISTÉRIO DO
            TRABALHO NR-10;
          </TextContent>
          <TextContent>
            TODOS OS EQUIPAMENTOS E APARELHOS NECESSÁRIOS PARA A REALIZAÇÃO DOS
            TESTES E ENSAIOS;
          </TextContent>
          <TextContent>
            EQUIPAMENTO UTILIZADO PARA OS TESTES E ENSAIOS ELÉTRICOS COM
            CERTIFICADO RASTREADO A RBC - REDE BRASILEIRA DE CALIBRAÇÃO;
          </TextContent>
          <TextContent>ETIQUETA BLINDADA DE APROVADO OU REPROVADO;</TextContent>
          <TextContent>
            FORNECIMENTO DE RELATÓRIOS TÉCNICOS BASEADOS NAS NORMAS NBR 16295,
            NBR 5456, NR-10 E DEMAIS NORMAS DE ENSAIOS PERTINENTES;
          </TextContent>
          <TextContent>
            CONTROLE QUANTO AO VENCIMENTO DOS ENSAIOS ELÉTRICOS PERIÓDICOS,
            CONFORME PREVÊ A NR-10;
          </TextContent>
        </Section>
        <PDFFooter />
      </Page>
      <Page size="A4" style={styles.page}>
        <PDFHeader />
        <Section title="8.0 OBRIGAÇÕES DO CLIENTE:"></Section>
        {showSite && (
          <Section title="8.1 ATENDIMENTO IN-LOCO">
            <TextContent>
              ÁREA COBERTA DE: 3,5m (COMPRIMENTO) X 3,5m(LARGURA) X 2,5m
              (ALTURA);
            </TextContent>
            <TextContent>
              PONTO DE ENERGIA A 10m DE DISTÂNCIA DO LOCAL DOS TESTES (DISJUNTOR
              16A - 220V);
            </TextContent>
            <TextContent>
              PONTO DE ATERRAMENTO EFICAZ A 10m DE DISTÂNCIA DO LOCAL DOS
              TESTES;
            </TextContent>
            <TextContent>
              PONTO DE ÁGUA A 10m DE DISTANCIA DO LOCAL DOS TESTES;
            </TextContent>
            <TextContent>
              DISPONIBILIDADE EFICAZ DOS EPIS E EPCS A SEREM TESTADOS JUNTO A
              NOSSA EQUIPE.
            </TextContent>
            <TextContent style={{ fontWeight: "bold", textAlign: "center" }}>
              OBSERVAÇÃO: MEDIDAS APROXIMADAS.
            </TextContent>
          </Section>
        )}
        {showInternal && (
          <Section
            title={
              showSite ? "8.2  ATENDIMENTO INTERNO" : "8.1 ATENDIMENTO INTERNO"
            }
          >
            <TextContent>
              ENTREGA E RETIRADA DOS EQUIPAMENTOS A SEREM TESTADOS, NA PPI
              TESTES E ENSAIOS ELÉTRICOS LTDA, RUA CORONEL AMÂNCIO BUENO, 138 –
              CEP 13910-009 – CENTRO - JAGUARIÚNA-SP.
            </TextContent>
            <TextContent>
              A REALIZAÇÃO DO SERVIÇO FICA CONDICIONADA A ENTREGA DO PEDIDO DE
              COMPRAS OU CONFIRMAÇÃO FORMALIZADA 48 HORAS ANTES DA DATA
              AGENDADA.
            </TextContent>
          </Section>
        )}
        <View style={styles.signature}>
          <TextContent>ATENCIOSAMENTE,</TextContent>
          <TextContent style={{ fontWeight: "bold" }}>
            {proposal.creator.name}
          </TextContent>
          <TextContent style={{ fontWeight: "bold" }}>
            DEPARTAMENTO COMERCIAL
          </TextContent>
          <TextContent style={{ fontWeight: "bold" }}>
            {proposal.creator.contactPhone}
          </TextContent>
          <TextContent>{proposal.creator.contactEmail}</TextContent>
        </View>
        <PDFFooter />
      </Page>
    </Document>
  );
}
