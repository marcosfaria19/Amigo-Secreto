import { useState, useEffect } from "react";
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
  Mail,
  PartyPopper,
  Snowflake,
  Copy,
} from "lucide-react";
import confetti from "canvas-confetti";
import axiosInstance from "services/axios";
import { FcGoogle } from "react-icons/fc";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { Progress } from "components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Badge } from "components/ui/badge";
import Container from "components/Container";
import { toast } from "sonner";

interface Step {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Organize seu Amigo Secreto",
    subtitle: "Comece com o seu nome",
    icon: <Gift className="h-8 w-8 text-rose-500" />,
  },
  {
    title: "Adicione os participantes",
    subtitle: "Digite o nome de cada pessoa",
    icon: <Users className="h-8 w-8 text-violet-500" />,
  },
  {
    title: "Mensagem do grupo",
    subtitle: "Adicione uma descrição para o sorteio",
    icon: <MessageCircle className="h-8 w-8 text-emerald-500" />,
  },
  {
    title: "Autenticação",
    subtitle: "Registre seu email ou entre com o Google",
    icon: <Mail className="h-8 w-8 text-amber-500" />,
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100);
  }, [currentStep]);

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

      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const colors = ["#FF0080", "#7928CA", "#0070F3"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
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
    <Container className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-100 via-violet-100 to-blue-100 py-12">
      <div className="mx-auto max-w-4xl lg:min-w-[768px]">
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-4 sm:gap-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20 ${
                index <= currentStep ? "bg-white shadow-xl" : "bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {step.icon}
            </motion.div>
          ))}
        </motion.div>

        <Progress
          value={progress}
          className="mb-8 h-3 rounded-full bg-gray-100/50"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-4">
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className="flex items-center gap-3"
                >
                  {steps[currentStep].icon}
                  <div>
                    <CardTitle className="text-2xl font-bold sm:text-3xl">
                      {steps[currentStep].title}
                    </CardTitle>
                    <CardDescription className="text-base sm:text-lg">
                      {steps[currentStep].subtitle}
                    </CardDescription>
                  </div>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Input
                      placeholder="Qual é o seu nome?"
                      value={organizerName}
                      maxLength={20}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      className="h-12 text-base sm:h-14 sm:text-lg"
                    />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Input
                        placeholder="Nome do participante"
                        value={newParticipant}
                        maxLength={20}
                        onChange={(e) => setNewParticipant(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleAddParticipant()
                        }
                        className="h-12 flex-grow text-base sm:text-lg"
                      />
                      <Button
                        onClick={handleAddParticipant}
                        variant="default"
                        className="h-12 gap-2"
                      >
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">Adicionar</span>
                        <span className="sm:hidden">Add</span>
                      </Button>
                    </div>
                    <motion.div layout className="grid gap-3 sm:grid-cols-2">
                      <AnimatePresence>
                        {participants.map((participant, index) => (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            key={index}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4 transition-all hover:shadow-lg"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm sm:h-12 sm:w-12">
                                  <AvatarImage
                                    src={`https://api.dicebear.com/6.x/fun-emoji/svg?seed=${participant}`}
                                  />
                                  <AvatarFallback>
                                    {participant[0].toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium sm:text-base">
                                    {participant}
                                  </p>
                                  <p className="text-xs text-muted-foreground sm:text-sm">
                                    Participante {index + 1}
                                  </p>
                                </div>
                              </div>
                              {!(
                                index === 0 && participant === organizerName
                              ) && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveParticipant(index)}
                                  className="opacity-100 transition-opacity group-hover:opacity-100 sm:opacity-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            {index === 0 && participant === organizerName && (
                              <Badge className="absolute right-2 top-2 text-xs">
                                Organizador
                              </Badge>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Textarea
                      placeholder="Escreva uma mensagem para o grupo..."
                      value={description}
                      maxLength={400}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[120px] resize-none text-base sm:min-h-[120px] sm:text-lg"
                    />
                  </motion.div>
                )}

                {currentStep === 3 && !drawId && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <Input
                      type="email"
                      placeholder="Seu email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-base sm:text-lg"
                    />
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
                      onClick={handleGoogleLogin}
                      className="relative h-12 w-full overflow-hidden text-sm transition-all"
                      variant="outline"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity hover:opacity-100" />
                      <FcGoogle className="mr-2 h-5 w-5" />
                      Entrar com Google
                    </Button>
                  </motion.div>
                )}

                {currentStep === 3 && drawId ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-100 via-violet-100 to-blue-100 p-6 text-center text-primary/80 sm:p-8"
                  >
                    <div className="absolute inset-0 opacity-10" />
                    <PartyPopper className="mx-auto mb-4 h-12 w-12 sm:h-16 sm:w-16" />
                    <h3 className="mb-2 text-2xl font-bold sm:text-3xl">
                      Sorteio Criado!
                    </h3>
                    <p className="mb-6 text-base text-muted-foreground sm:text-lg">
                      Compartilhe o link abaixo com todos os participantes:
                    </p>
                    <div className="relative mb-6 overflow-hidden rounded-lg bg-background/50 p-4 backdrop-blur-sm">
                      <p className="break-all text-sm font-medium sm:text-lg">
                        {drawLink}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 z-50 text-foreground hover:opacity-60 sm:top-3"
                        onClick={() => {
                          navigator.clipboard.writeText(drawLink || "");
                          toast.success(
                            "Link copiado para a área de transferência!",
                          );
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Snowflake className="absolute -bottom-4 -left-4 h-16 w-16 rotate-45 text-blue-100" />
                    </div>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="gap-2 bg-accent text-foreground backdrop-blur-sm hover:opacity-80"
                    >
                      <Mail className="h-5 w-5" />
                      Reenviar E-mail
                    </Button>
                  </motion.div>
                ) : (
                  <Button
                    className="mt-6 h-12 w-full gap-2"
                    variant="default"
                    size="lg"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    <span>
                      {currentStep === steps.length - 1
                        ? "Criar sorteio"
                        : "Continuar"}
                    </span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
}
