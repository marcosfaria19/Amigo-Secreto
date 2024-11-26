import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Mail, Sparkles } from "lucide-react";
import axiosInstance from "services/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Button } from "components/ui/button";
import Container from "components/Container";
import confetti from "canvas-confetti";

interface Result {
  giftedPerson: string;
  message: string;
}

export default function DrawResult() {
  const { drawId, userResult } = useParams();
  const [result, setResult] = useState<Result | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axiosInstance.get<Result>(
          `/api/draws/${drawId}/results/${userResult}`,
        );
        setResult(response.data);
      } catch (error) {
        console.error("Failed to fetch draw result", error);
      }
    };

    fetchResult();
  }, [drawId, userResult]);

  const handleReveal = () => {
    setIsRevealed(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <Container className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-violet-100 to-blue-100 px-4 py-12">
      <div className="mx-auto w-1/4">
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
                Seu Amigo Secreto
              </CardTitle>
              <CardDescription className="text-center">
                Descubra quem você vai presentear!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result ? (
                <>
                  <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-green-500 p-1">
                    <div className="absolute inset-0 bg-white">
                      <AnimatePresence>
                        {isRevealed ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              type: "spring",
                              damping: 15,
                              stiffness: 200,
                            }}
                            className="flex h-full w-full flex-col items-center justify-center"
                          >
                            <Sparkles className="mb-2 h-8 w-8 text-yellow-500" />
                            <p className="text-center text-2xl font-bold text-purple-600">
                              {result.giftedPerson}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            exit={{ opacity: 0, scale: 1.2, rotateY: 90 }}
                            transition={{ duration: 0.3 }}
                            className="flex h-full w-full items-center justify-center"
                          >
                            <Gift className="h-16 w-16 text-red-500" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  {!isRevealed && (
                    <Button
                      onClick={handleReveal}
                      className="mt-4 w-full gap-2"
                      size="lg"
                    >
                      <Gift className="h-5 w-5" />
                      Sortear!
                    </Button>
                  )}
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="mt-4 rounded-lg bg-gray-100 p-4">
                          <p className="text-center text-sm italic">
                            "{result.message}"
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <div className="flex h-48 items-center justify-center">
                  <p className="text-center">Carregando resultado...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Container>
  );
}
