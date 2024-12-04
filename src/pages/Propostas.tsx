import   { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { ScrollArea } from "components/ui/scroll-area";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/ui/dropdown-menu";
import Container from "components/ui/container";
import ClientForm from "components/forms/ClientForm";
import EquipmentForm from "components/forms/EquipmentForm";
import CommercialConditionsForm from "components/forms/CommercialConditionsForm";
import ProposalForm from "components/forms/ProposalForm";
import PDFGenerator from "components/PDFGenerator";

// Tipagens para os tipos de dados
type Proposal = {
  proposalNumber: string;
  date: string;
  creator: { name: string };
};

type Client = {
  name: string;
  cnpj: string;
  city: string;
  uf: string;
  neighborhood: string;
  cep: string;
  street: string;
  phone: string;
  emails: string[];
  careOf: string;
};

type Equipment = {
  name: string;
  quantity: number;
  unit: string;
  unitPlural: string;
};

type CommercialConditions = {
  purchaseOrderNumber: string;
  executionType: "site" | "internal" | "both";
  dailyRate: number;
  hoursPerDay: number;
  billingDays: number;
  serviceDate: string;
};

export default function Propostas() {
  const [activeTab, setActiveTab] = useState<string>("proposal");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [commercialConditions, setCommercialConditions] =
    useState<CommercialConditions | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pdfType, setPdfType] = useState<string>("");

  const isTabDisabled = (tabName: string): boolean => {
    switch (tabName) {
      case "proposal":
        return !proposal;
      case "client":
        return !proposal;
      case "equipment":
        return !proposal || !client;
      case "commercial":
        return !proposal || !client || equipments.length === 0;
      case "pdf":
        return (
          !proposal ||
          !client ||
          equipments.length === 0 ||
          !commercialConditions
        );
      default:
        return false;
    }
  };

  const handleTabChange = (value: string) => {
    if (!isTabDisabled(value)) {
      setActiveTab(value);
      if (value !== "pdf") {
        setPdfType("");
      }
    }
  };

  const handlePdfTypeSelect = (type: string) => {
    setPdfType(type);
  };

  const renderTabContent = (tabName: string) => {
    switch (tabName) {
      case "proposal":
        return (
          <div>
            {proposal ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número da Proposta</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{proposal.proposalNumber}</TableCell>
                    <TableCell>{proposal.date}</TableCell>
                    <TableCell>{proposal.creator.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => setProposal(null)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setIsModalOpen(true)}>
                    Cadastrar Proposta
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastro de Proposta</DialogTitle>
                  </DialogHeader>
                  <ProposalForm
                    setProposal={(data: Proposal) => {
                      setProposal(data);
                      setIsModalOpen(false);
                    }}
                    onCancel={() => setIsModalOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        );
      case "client":
        return (
          <div>
            {client ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>UF</TableHead>
                    <TableHead>Bairro</TableHead>
                    <TableHead>CEP</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>A/C</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>{client.cnpj}</TableCell>
                    <TableCell>{client.city}</TableCell>
                    <TableCell>{client.uf}</TableCell>
                    <TableCell>{client.neighborhood}</TableCell>
                    <TableCell>{client.cep}</TableCell>
                    <TableCell>{client.street}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      {Array.isArray(client.emails)
                        ? client.emails.join(" / ")
                        : ""}
                    </TableCell>
                    <TableCell>{client.careOf}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => setClient(null)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Cadastrar Cliente</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastro de Cliente</DialogTitle>
                  </DialogHeader>
                  <ClientForm setClient={setClient} />
                </DialogContent>
              </Dialog>
            )}
          </div>
        );

      case "equipment":
        return (
          <div>
            {equipments.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipments.map((equipment, index) => (
                    <TableRow key={index}>
                      <TableCell>{equipment.name}</TableCell>
                      <TableCell>{equipment.quantity}</TableCell>
                      <TableCell>
                        {equipment.quantity > 1
                          ? equipment.unitPlural
                          : equipment.unit}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            setEquipments(
                              equipments.filter((_, i) => i !== index),
                            )
                          }
                        >
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-5">Adicionar Equipamento</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastro de Equipamento</DialogTitle>
                </DialogHeader>
                <EquipmentForm setEquipments={setEquipments} />
              </DialogContent>
            </Dialog>
          </div>
        );
      case "commercial":
        return (
          <div>
            {commercialConditions ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido de Compra</TableHead>
                    <TableHead>Tipo de Execução</TableHead>
                    <TableHead>Quantidade de Diárias</TableHead>
                    <TableHead>Horas/dia</TableHead>
                    <TableHead>Faturamento</TableHead>
                    <TableHead>Data Serviço</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {commercialConditions.purchaseOrderNumber}
                    </TableCell>
                    <TableCell>
                      {commercialConditions.executionType === "site"
                        ? "In Loco"
                        : commercialConditions.executionType === "internal"
                        ? "Interno"
                        : commercialConditions.executionType === "both"
                        ? "Ambos"
                        : ""}
                    </TableCell>
                    <TableCell>{commercialConditions.dailyRate}</TableCell>
                    <TableCell>{commercialConditions.hoursPerDay}</TableCell>
                    <TableCell>
                      {commercialConditions.billingDays} dias
                    </TableCell>
                    <TableCell>{commercialConditions.serviceDate}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        onClick={() => setCommercialConditions(null)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Cadastrar Condições Comerciais</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastro de Condições Comerciais</DialogTitle>
                  </DialogHeader>
                  <CommercialConditionsForm
                    setCommercialConditions={setCommercialConditions}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-hidden p-6">
          <Card className="h-full w-full shadow-lg">
            <CardHeader className="bg-secondary/10">
              <CardTitle className="text-2xl">Gerar Proposta</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="flex h-full flex-col"
              >
                <TabsList className="scrollbar-hide w-full justify-start overflow-x-auto rounded-none border-b bg-secondary/10">
                  <TabsTrigger
                    value="proposal"
                    className="data-[state=active]:bg-background"
                  >
                    Proposta
                  </TabsTrigger>
                  <TabsTrigger
                    value="client"
                    disabled={isTabDisabled("client")}
                    className="data-[state=active]:bg-background"
                  >
                    Cliente
                  </TabsTrigger>
                  <TabsTrigger
                    value="equipment"
                    disabled={isTabDisabled("equipment")}
                    className="data-[state=active]:bg-background"
                  >
                    Equipamentos
                  </TabsTrigger>
                  <TabsTrigger
                    value="commercial"
                    disabled={isTabDisabled("commercial")}
                    className="data-[state=active]:bg-background"
                  >
                    Condições Comerciais
                  </TabsTrigger>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <TabsTrigger
                        value="pdf"
                        disabled={isTabDisabled("pdf")}
                        className="data-[state=active]:bg-background"
                      >
                        Gerar PDF
                      </TabsTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() =>
                          handlePdfTypeSelect("Proposta Técnica/Comercial")
                        }
                      >
                        Proposta Técnica/Comercial
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handlePdfTypeSelect("Proposta Comercial")
                        }
                      >
                        Proposta Comercial
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePdfTypeSelect("Proposta Técnica")}
                      >
                        Proposta Técnica
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePdfTypeSelect("ESCOPO")}
                      >
                        Escopo
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePdfTypeSelect("Acompanhamento")}
                      >
                        Acompanhamento
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handlePdfTypeSelect("ART")}
                      >
                        ART
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TabsList>
                <ScrollArea className="flex-1 p-6">
                  <TabsContent value={activeTab} className="mt-0">
                    {renderTabContent(activeTab)}
                  </TabsContent>
                </ScrollArea>
              </Tabs>
              {pdfType && (
                <PDFGenerator
                  formData={{
                    proposal,
                    client,
                    equipments,
                    commercialConditions,
                    type: pdfType,
                  }}
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </Container>
  );
}
