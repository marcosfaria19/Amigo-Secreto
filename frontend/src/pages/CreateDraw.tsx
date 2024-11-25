import { useState } from "react";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { Textarea } from "components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Gift,
  X,
  Users,
  MessageCircle,
  Sparkles,
  Mail,
} from "lucide-react";
import confetti from "canvas-confetti";
import axiosInstance from "services/axios";

interface Step {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Organize seu Amigo Secreto",
    subtitle: "Comece com o seu nome",
    icon: <Gift className="h-8 w-8 text-pink-500" />,
  },
  {
    title: "Adicione os participantes",
    subtitle: "Digite o nome de cada pessoa",
    icon: <Users className="h-8 w-8 text-blue-500" />,
  },
  {
    title: "Mensagem do grupo",
    subtitle: "Adicione uma descrição para o sorteio",
    icon: <MessageCircle className="h-8 w-8 text-green-500" />,
  },
  {
    title: "Autenticação",
    subtitle: "Registre seu email ou entre com o Google",
    icon: <Mail className="h-8 w-8 text-purple-500" />,
  },
];

export default function CreateDraw() {
  const [currentStep, setCurrentStep] = useState(0);
  const [organizerName, setOrganizerName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [description, setDescription] = useState("");
  const [drawId, setDrawId] = useState<string | null>(null);
  const [drawLink, setDrawLink] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const handleAddParticipant = () => {
    if (
      newParticipant.trim() &&
      !participants.includes(newParticipant.trim())
    ) {
      setParticipants([...participants, newParticipant.trim()]);
      setNewParticipant("");
    }
  };

  const handleRemoveParticipant = (index: number) => {
    if (index === 0 && participants[0] === organizerName) {
      return;
    }
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (currentStep === 0 && organizerName.trim()) {
      setParticipants([organizerName.trim(), ...participants]);
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCreateDraw();
    }
  };

  interface DrawResponse {
    link: string;
  }

  const handleCreateDraw = async () => {
    try {
      const response = await axiosInstance.post<DrawResponse>("/api/draws", {
        organizerName,
        organizerEmail: email,
        participants: participants.map((name) => ({
          name,
          email: "",
        })),
        description,
      });

      const data = response.data;
      setDrawId(data.link);
      setDrawLink(`${window.location.origin}/draw/${data.link}`);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("Erro ao criar o sorteio:", error);
    }
  };

  const handleGoogleLogin = async () => {
    // Implement Google login logic here
    console.log("Google login clicked");
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return organizerName.trim().length >= 3;
      case 1:
        return participants.length >= 3;
      case 2:
        return description.trim().length >= 10;
      case 3:
        return email.includes("@") && email.includes(".");
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 p-4">
      <main className="mx-auto max-w-4xl">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {steps.map((step, index) => (
            <div key={index} className="mx-4 flex flex-col items-center">
              <motion.div
                className={`flex h-16 w-16 items-center justify-center rounded-full ${
                  index <= currentStep ? "bg-white shadow-lg" : "bg-gray-200"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {step.icon}
              </motion.div>
              <div
                className={`mt-2 h-1 w-24 ${
                  index < currentStep + 1 ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl bg-white p-8 shadow-xl"
          >
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              {steps[currentStep].title}
            </h2>
            <p className="mb-6 text-gray-600">{steps[currentStep].subtitle}</p>

            {currentStep === 0 && (
              <Input
                placeholder="Qual é o seu nome?"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                className="text-lg"
              />
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nome do participante"
                    value={newParticipant}
                    onChange={(e) => setNewParticipant(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleAddParticipant()
                    }
                  />
                  <Button onClick={handleAddParticipant}>Adicionar</Button>
                </div>
                <ul className="max-h-60 space-y-2 overflow-y-auto">
                  {participants.map((participant, index) => (
                    <motion.li
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                    >
                      <span>{participant}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveParticipant(index)}
                        disabled={index === 0 && participant === organizerName}
                      >
                        <X
                          className={`h-4 w-4 ${index === 0 && participant === organizerName ? "invisible" : "visible"}`}
                        />
                      </Button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {currentStep === 2 && (
              <Textarea
                placeholder="Escreva uma mensagem para o grupo..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[150px]"
              />
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg"
                />
                <Button
                  onClick={handleGoogleLogin}
                  className="w-full"
                  variant="outline"
                >
                  Entrar com Google
                </Button>
              </div>
            )}

            {drawId ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 rounded-xl bg-gradient-to-r from-pink-100 to-blue-100 p-6 text-center"
              >
                <Sparkles className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                  Sorteio Criado!
                </h3>
                <p className="mb-4 text-gray-600">
                  O sorteio foi criado com sucesso. Compartilhe o link com os
                  participantes:
                </p>
                <p className="text-blue-600">{drawLink}</p>
                <Button variant="outline" className="mt-2">
                  Reenviar E-mail
                </Button>
              </motion.div>
            ) : (
              <Button
                className="mt-6 w-full"
                size="lg"
                onClick={handleNext}
                disabled={!isStepValid()}
              >
                <span>
                  {currentStep === steps.length - 1
                    ? "Criar sorteio"
                    : "Continuar"}
                </span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
