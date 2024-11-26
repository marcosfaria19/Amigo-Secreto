import Container from "components/Container";
import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { Gift, Users, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-violet-100 to-blue-100">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Tirou quem?
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
            Organize seu amigo secreto sem complicação. Rápido, prático e cheio
            de surpresas!
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to={"/create"}>
              <Gift className="h-5 w-5" />
              Começar agora
            </Link>
          </Button>
        </section>

        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-semibold">
            Como funciona?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Users className="h-8 w-8 text-violet-500" />,
                title: "Convide os amigos",
                description: "Chame todos para participar com apenas um link.",
              },
              {
                icon: <MessageCircle className="h-8 w-8 text-emerald-500" />,
                title: "Escreva mensagens",
                description: "Adicione mensagens para animar o grupo.",
              },
              {
                icon: <Sparkles className="h-8 w-8 text-amber-500" />,
                title: "Descubra!",
                description: "Os pares são sorteados, e a diversão começa.",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="flex flex-col items-center p-12 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </Container>
  );
}
