import { useState, useEffect } from "react";
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

export default function JoinDraw() {
  const [selectedName, setSelectedName] = useState("");
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    // Fetch participants for the draw from the backend (assuming you have an API for this)
    const fetchParticipants = async () => {
      const response = await fetch("/api/draw/participants", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add token from localStorage or cookies
        },
      });

      if (response.ok) {
        const data = await response.json();
        setParticipants(data.participants); // Assume the response contains a list of participants
      } else {
        // Handle error (maybe show an error message to the user)
        console.error("Failed to fetch participants");
      }
    };

    fetchParticipants();
  }, []);

  const handleJoin = async () => {
    // Check if the user has selected a name and entered an email
    if (!selectedName || !email) {
      alert("Por favor, selecione seu nome e insira seu email.");
      return;
    }

    // Send request to join the draw
    const response = await fetch("/api/draw/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add token for authentication
      },
      body: JSON.stringify({
        name: selectedName,
        email: email,
      }),
    });

    if (response.ok) {
      // Logic for when the user successfully joins
      console.log("Você entrou no sorteio com sucesso");
    } else {
      // Handle error (show error message to the user)
      console.error("Erro ao entrar no sorteio");
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
