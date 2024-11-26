import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import { Gift } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axiosInstance from "services/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import Container from "components/Container";

interface ParticipantsResponse {
  participants: { name: string }[];
}

export default function JoinDraw() {
  const { link } = useParams();
  const [selectedName, setSelectedName] = useState("");
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    if (link) {
      const fetchParticipants = async () => {
        try {
          const response = await axiosInstance.get<ParticipantsResponse>(
            `/api/draws/${link}`,
          );

          if (response.data && response.data.participants) {
            setParticipants(response.data.participants.map((p) => p.name));
          } else {
            console.error("No participants found in response");
          }
        } catch (error) {
          console.error("Failed to fetch participants", error);
        }
      };

      fetchParticipants();
    }
  }, [link]);

  const handleJoin = async () => {
    if (!selectedName || !email) {
      alert("Por favor, selecione seu nome e insira seu email.");
      return;
    }

    try {
      const response = await axiosInstance.post<ParticipantsResponse>(
        `/api/draws/${link}/participate`,
        {
          name: selectedName,
          email: email,
          link: link,
        },
      );

      if (response.status === 200) {
        console.log("Você entrou no sorteio com sucesso");
      }
    } catch (error) {
      console.error("Erro ao entrar no sorteio", error);
    }
  };

  return (
    <Container className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-violet-100 to-blue-100 px-4 py-12">
      <div className="mx-auto max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <Gift className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl font-bold">
                Participar do Sorteio
              </CardTitle>
              <CardDescription className="text-center">
                Selecione seu nome e entre com seu email para participar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleJoin();
                }}
                className="space-y-4"
              >
                <Select onValueChange={setSelectedName}>
                  <SelectTrigger className="h-12 text-sm">
                    <SelectValue placeholder="Selecione seu nome" />
                  </SelectTrigger>
                  <SelectContent>
                    {participants.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-sm"
                />
                <Button type="submit" className="h-12 w-full gap-2">
                  Participar
                </Button>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-muted-foreground">
                    ou se preferir
                  </span>
                </div>
              </div>
              <Button
                className="relative h-12 w-full overflow-hidden text-sm transition-all"
                variant="outline"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity hover:opacity-100" />
                <FcGoogle className="h-5 w-5" />
                Entrar com Google
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Container>
  );
}
