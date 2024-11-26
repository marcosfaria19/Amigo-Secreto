import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "components/ui/dialog";
import Container from "components/Container";
import { toast } from "sonner";

interface ParticipantsResponse {
  participants: { name: string; hasJoined: boolean }[];
}

export default function JoinDraw() {
  const { link } = useParams();
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState("");
  const [email, setEmail] = useState("");
  const [participants, setParticipants] = useState<
    { name: string; hasJoined: boolean }[]
  >([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (link) {
      const fetchParticipants = async () => {
        try {
          const response = await axiosInstance.get<ParticipantsResponse>(
            `/api/draws/${link}`,
          );

          if (response.data && response.data.participants) {
            setParticipants(response.data.participants);
          } else {
            toast.error("Nenhum participante encontrado.");
          }
        } catch (error) {
          toast.error("Falha ao buscar participantes.");
        }
      };

      fetchParticipants();
    }
  }, [link]);

  const handleJoin = async () => {
    if (!selectedName || !email) {
      toast.error("Por favor, selecione seu nome e insira seu email.");

      return;
    }

    try {
      const response = await axiosInstance.post<{
        message: string;
        link?: string;
        email?: string;
      }>(`/api/draws/${link}/participate`, {
        name: selectedName,
        email,
      });

      if (response.data.message === "Already joined") {
        setIsDialogOpen(true);
      } else if (response.data.message === "Joined successfully") {
        toast.success("Registrado com sucesso!");

        if (response.data.link) {
          setTimeout(() => navigate(response.data.link!), 500);
        }
      }
    } catch (error) {
      toast.error(
        "Ocorreu um erro ao tentar registrar. Por favor, tente novamente.",
      );
    }
  };

  const handleResendEmail = async () => {
    try {
      await axiosInstance.post(`/api/draws/${link}/resend-email`, {
        name: selectedName,
      });
      toast.success("Link reenviado para o email cadastrado.");

      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Falha ao reenviar o email. Por favor, tente novamente.");
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
                    {participants.map((participant) => (
                      <SelectItem
                        key={participant.name}
                        value={participant.name}
                      >
                        {participant.name}{" "}
                        {participant.hasJoined ? "(Já registrado)" : ""}
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
                disabled
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 transition-opacity hover:opacity-100" />
                <FcGoogle className="h-5 w-5" />
                Entrar com Google
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Participante já registrado</DialogTitle>
            <DialogDescription>
              Você já está registrado neste sorteio. Deseja reenviar o link para
              o email cadastrado?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleResendEmail}>Reenviar Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
