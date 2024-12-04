import React from "react";
import { Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

Font.register({
  family: "Arial",
  fonts: [
    { src: "/fonts/arial.ttf" },
    { src: "/fonts/arialbd.ttf", fontWeight: "bold" },
  ],
});

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    padding: 10,
    alignItems: "center",
    fontFamily: "Arial",
    color: "#315599",
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Arial",
    fontWeight: "bold",
  },
});

const PDFHeader: React.FC = () => {
  return (
    <View style={styles.header} fixed>
      <Image style={styles.logo} src="/logo.png" />
      <Text style={styles.headerText}>
        PPI TESTES E ENSAIOS ELÉTRICOS LTDA.
      </Text>
      <Text style={styles.headerText}>
        CNPJ 57.583.883/0001-27 - INSCRIÇÃO ESTADUAL 395.157.410.110
      </Text>
    </View>
  );
};

export default PDFHeader;
