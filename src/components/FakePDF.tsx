import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ART from "./pdf-templates/ART";
import Acompanhamento from "./pdf-templates/Acompanhamento";
import Escopo from "./pdf-templates/Escopo";
import Proposta from "./pdf-templates/Proposta";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Client {
  careOf: string;
  cep: string;
  city: string;
  cnpj: string;
  emails: string[];
  name: string;
  neighborhood: string;
  phone: string;
  street: string;
  uf: string;
}

interface CommercialConditions {
  billingDays: string;
  dailyRate: string;
  executionType: string;
  hoursPerDay: string;
  purchaseOrderNumber: string;
  serviceDate: string;
  siteValue: string;
  internalValue: string;
}

interface Equipment {
  name: string;
  unit: string;
  quantity: string;
  unitPlural: string;
}

interface Proposal {
  creator: {
    name: string;
    contactEmail: string;
    contactPhone: string;
  };
  date: string;
  proposalNumber: string;
}

interface FormData {
  client: Client;
  commercialConditions: CommercialConditions;
  equipments: Equipment[];
  proposal: Proposal;
  type: string;
}

const FakePDF: React.FC = () => {
  const formData: FormData = {
    client: {
      careOf: "NOME DO CONTATO",
      cep: "13472-717",
      city: "AMERICANA",
      cnpj: "00.635.809/0001-90",
      emails: ["a@a.com", "A@b.com"],
      name: "BENEFICIAMENTO TEXTIL MULTI-COLOR LTDA",
      neighborhood: "CARIOBA",
      phone: "(19) 3406-2632",
      street: "AVENIDA CARIOBA, 2500 - ANEXO SALAO 127-A",
      uf: "SP",
    },
    commercialConditions: {
      billingDays: "22",
      dailyRate: "2",
      executionType: "both",
      hoursPerDay: "9",
      purchaseOrderNumber: "1234",
      serviceDate: "19/11/2024",
      siteValue: "123,45",
      internalValue: "1230,45",
    },
    equipments: [
      {
        name: "BASTÃO DE SALVAMENTO",
        unit: "PEÇA",
        quantity: "1",
        unitPlural: "PEÇAS",
      },
    ],
    proposal: {
      creator: {
        name: "ISABELA PECCHIO",
        contactEmail: "isabela.pecchio@ppitestes.com.br",
        contactPhone: "+55 (19) 3837-2400",
      },
      date: "05/11/2024",
      proposalNumber: "123",
    },
    type: "asd", // Set the type that determines which template to render
  };

  // Function to determine which template to use
  const getTemplateComponent = (type: string) => {
    switch (type) {
      case "ART":
        return ART;
      case "Acompanhamento":
        return Acompanhamento;
      case "ESCOPO":
        return Escopo;
      case "Proposta Técnica":
        return Escopo; // Assuming you want Escopo for Proposta Técnica as well
      default:
        return Proposta; // Default template
    }
  };

  const TemplateComponent = getTemplateComponent(formData.type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>PDF Preview and Download</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[600px] rounded border border-gray-300">
          <PDFViewer width="100%" height="100%">
            <TemplateComponent {...formData} />
          </PDFViewer>
        </div>
        <PDFDownloadLink
          document={<TemplateComponent {...formData} />}
          fileName="proposta_comercial.pdf"
        >
          {({ blob, url, loading, error }) => (
            <Button disabled={loading} className="w-full">
              {loading ? "Generating PDF..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </CardContent>
    </Card>
  );
};

export default FakePDF;
