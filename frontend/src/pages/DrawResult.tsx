import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "components/ui/button";
import { Gift, User, MessageCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Badge } from "components/ui/badge";

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-violet-100 to-blue-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-center text-3xl font-bold">
                Seu Amigo Secreto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5 text-purple-500" />
                  <h2 className="text-lg font-semibold text-gray-700">
                    Descrição do Grupo
                  </h2>
                </div>
                <p className="mt-2 text-gray-600">{drawData.description}</p>
              </div>
              <div>
                <div className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-purple-500" />
                  <h2 className="text-lg font-semibold text-gray-700">
                    Participantes
                  </h2>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {drawData.participants.map((participant) => (
                    <Badge
                      key={participant}
                      variant="secondary"
                      className="text-sm"
                    >
                      {participant}
                    </Badge>
                  ))}
                </div>
              </div>
              <AnimatePresence>
                {drawnName ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-center text-white"
                  >
                    <Gift className="mx-auto mb-2 h-12 w-12" />
                    <h3 className="text-xl font-semibold">
                      Seu amigo secreto é:
                    </h3>
                    <p className="mt-2 text-3xl font-bold">{drawnName}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <Button
                      onClick={revealFriend}
                      disabled={isRevealing}
                      className="h-14 gap-2"
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
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
