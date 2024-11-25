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
import { Gift, Mail } from "lucide-react";
import Container from "components/Container";
import axiosInstance from "services/axios";

export default function JoinDraw() {
  const { link } = useParams();
  const [selectedName, setSelectedName] = useState("");
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  interface ParticipantsResponse {
    participants: { name: string }[];
  }

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
    <Container className="bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <main className="mx-auto max-w-md p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-white p-6 shadow-xl"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-primary p-3">
              <Gift className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-center text-2xl font-bold text-gray-800">
            Participar do Amigo Secreto
          </h1>
          <p className="mb-6 text-center text-gray-600">
            Selecione seu nome e entre com seu email para participar
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoin();
            }}
            className="space-y-4"
          >
            <Select onValueChange={setSelectedName}>
              <SelectTrigger>
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
              className="w-full"
            />
            <Button type="submit" className="w-full">
              Participar
            </Button>
          </form>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Entrar com Google
            </Button>
          </div>
        </motion.div>
      </main>
    </Container>
  );
}
