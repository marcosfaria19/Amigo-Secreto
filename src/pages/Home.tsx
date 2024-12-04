import React from "react";
import { Link } from "react-router-dom";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";

import {
  ArrowRight,
  FileText,
  Users,
  ShieldCheck,
  Zap,
  FileCheck,
  Calculator,
} from "lucide-react";

import Container from "components/ui/container";

// Tipagem para os recursos
type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export default function Home() {
  return (
    <Container className="p-0">
      {/* <FakePDF /> */}
      <div className="select-none space-y-10 py-10">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Gerador de Propostas
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Crie propostas técnicas, comerciais e demais documentos para
            serviços de testes e ensaios elétricos de EPIs e EPCs.
          </p>
          <Link to="/propostas">
            <Button size="lg" className="mt-6">
              Criar Nova Proposta <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </header>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <feature.icon className="mb-4 h-10 w-10 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </Container>
  );
}

// Dados dos recursos com tipagem correta
const features: Feature[] = [
  {
    title: "Cadastro Inicial",
    description:
      "Inicie o processo preenchendo informações essenciais sobre o relatório e o responsável pela proposta.",
    icon: FileText,
  },
  {
    title: "Gestão de Clientes",
    description: "Cadastre e gerencie informações dos seus clientes.",
    icon: Users,
  },
  {
    title: "Catálogo de EPIs e EPCs",
    description:
      "Selecione os equipamentos envolvidos e suas quantidades. Cadastre novos equipamentos caso necessário.",
    icon: ShieldCheck,
  },
  {
    title: "Condições Comerciais",
    description:
      "Especifique o tipo de execução, quantidade de diárias, valores e outras condições comerciais para criar a proposta.",
    icon: Calculator,
  },
  {
    title: "Revisão e Ajustes",
    description:
      "Revise todos os detalhes da sua proposta antes da finalização.",
    icon: FileCheck,
  },
  {
    title: "Geração de PDF",
    description:
      "Transforme sua proposta em diferentes tipos de documentos em PDF com apenas um clique.",
    icon: Zap,
  },
];
