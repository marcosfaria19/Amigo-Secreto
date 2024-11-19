import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "components/ui/button";
import { Gift, User, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import Container from "./Container";

export default function DrawResult() {
  const [drawnName, setDrawnName] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  // This would be fetched from the server based on the draw ID
  const drawData = {
    description: "Nosso amigo secreto de fim de ano! Valor máximo: R$ 100",
    participants: ["Alice", "Bob", "Charlie", "David", "Eve"],
  };

  const revealFriend = () => {
    setIsRevealing(true);
    setTimeout(() => {
      const randomName =
        drawData.participants[
          Math.floor(Math.random() * drawData.participants.length)
        ];
      setDrawnName(randomName);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setIsRevealing(false);
    }, 3000);
  };

  return (
    <Container className="min-h-screen select-none bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <main className="container mx-auto max-w-2xl p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-white p-6 shadow-xl"
        >
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-800">
            Seu Amigo Secreto
          </h1>
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-700">
                Descrição do Grupo
              </h2>
            </div>
            <p className="mt-2 text-gray-600">{drawData.description}</p>
          </div>
          <div className="mb-6">
            <div className="flex items-center">
              <User className="mr-2 h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-700">
                Participantes
              </h2>
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {drawData.participants.map((participant) => (
                <li
                  key={participant}
                  className="rounded-full bg-gray-100 px-3 py-1 text-center text-sm text-gray-700"
                >
                  {participant}
                </li>
              ))}
            </ul>
          </div>
          <AnimatePresence>
            {drawnName ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-6 rounded-lg bg-primary p-6 text-center text-white"
              >
                <Gift className="mx-auto mb-2 h-12 w-12" />
                <h3 className="text-xl font-semibold">Seu amigo secreto é:</h3>
                <p className="mt-2 text-3xl font-bold">{drawnName}</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 text-center"
              >
                <Button
                  onClick={revealFriend}
                  disabled={isRevealing}
                  className="text-lg"
                  size="lg"
                >
                  {isRevealing ? (
                    <span className="flex items-center">
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="mr-2"
                      >
                        <Gift className="h-5 w-5" />
                      </motion.span>
                      Sorteando...
                    </span>
                  ) : (
                    "Revelar Meu Amigo Secreto"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </Container>
  );
}
