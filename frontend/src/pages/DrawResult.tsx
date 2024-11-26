import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Gift, Mail } from "lucide-react";
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

interface Result {
  giftedPerson: string;
  message: string;
}

export default function DrawResult() {
  const { drawId, userResult } = useParams();
  const [result, setResult] = useState<Result | null>(null);

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

  const handleResendEmail = async () => {
    try {
      await axiosInstance.post(
        `/api/draws/${drawId}/resend-email/${userResult}`,
      );
      alert("Email reenviado com sucesso!");
    } catch (error) {
      console.error("Failed to resend email", error);
      alert("Falha ao reenviar o email. Por favor, tente novamente.");
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
                Resultado do Sorteio
              </CardTitle>
              <CardDescription className="text-center">
                Descubra quem você vai presentear!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {result ? (
                <>
                  <p className="text-center text-lg font-semibold">
                    Você vai presentear:
                  </p>
                  <p className="text-center text-2xl font-bold text-purple-600">
                    {result.giftedPerson}
                  </p>
                  <div className="mt-4 rounded-lg bg-gray-100 p-4">
                    <p className="text-center text-sm italic">
                      "{result.message}"
                    </p>
                  </div>
                  <Button
                    onClick={handleResendEmail}
                    className="mt-4 w-full gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Reenviar por Email
                  </Button>
                </>
              ) : (
                <p className="text-center">Carregando resultado...</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Container>
  );
}
