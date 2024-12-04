import React from "react";
import { Text, View, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/arial.ttf" },
    { src: "/fonts/arialbd.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#315599",
    paddingTop: 10,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 9,
  },
});

const PDFFooter: React.FC = () => {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>
        PPI TESTES E ENSAIOS ELÉTRICOS LTDA.
      </Text>
      <Text style={styles.footerText}>
        Rua Coronel Amâncio Bueno, 138 - Fundos – Centro - CEP 13910-009 –
        Jaguariúna SP
      </Text>
      <Text style={styles.footerText}>
        Telefone-: (19) 3837-2400 - E-mail contato@ppitestes.com.br
      </Text>
    </View>
  );
};

export default PDFFooter;
