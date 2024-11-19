import { useState } from "react";
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
import Container from "./Container";

export default function JoinDraw() {
  const [selectedName, setSelectedName] = useState("");
  const [email, setEmail] = useState("");

  // This would be fetched from the server based on the draw ID
  const participants = ["Alice", "Bob", "Charlie", "David", "Eve"];

  const handleJoin = () => {
    // Here you would handle the join logic, potentially with Google authentication
    console.log("Joining draw with", selectedName, email);
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
