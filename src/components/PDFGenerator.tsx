import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button } from "components/ui/button";
import Proposta from "components/pdf-templates/Proposta";
import ART from "components/pdf-templates/ART";
import Acompanhamento from "components/pdf-templates/Acompanhamento";
import Escopo from "components/pdf-templates/Escopo";

interface FormData {
  type: string;
  [key: string]: any;
}

interface PDFGeneratorProps {
  formData: FormData;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({ formData }) => {
  // Definindo o template a ser renderizado com base no tipo de PDF selecionado
  const TemplateComponent = (() => {
    console.log(formData);
    switch (formData.type) {
      case "ART":
        return ART;
      case "Acompanhamento":
        return Acompanhamento;
      case "ESCOPO":
        return Escopo;
      case "Proposta Técnica":
        return Escopo;
      default:
        return Proposta;
    }
  })();

  return (
    <div className="space-y-4">
      <h1 className="text-center text-xl font-semibold text-muted-foreground">
        Visualizar Proposta
      </h1>
      {/* Responsividade para o visualizador PDF */}
      <div className="h-[400px] overflow-hidden rounded border border-border sm:h-[600px]">
        <PDFViewer width="100%" height="100%">
          <TemplateComponent {...formData} />
        </PDFViewer>
      </div>
      {/* Botão de download responsivo */}
      <PDFDownloadLink
        document={<TemplateComponent {...formData} />}
        fileName={`${formData.type.toLowerCase()}.pdf`}
      >
        {({ blob, url, loading, error }) => (
          <Button disabled={loading} className="mt-5 w-full sm:w-auto">
            {loading ? "Gerando PDF..." : "Baixar PDF"}
          </Button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFGenerator;
