import { CreateDraw } from "components/CreateDraw";
import { DrawResult } from "components/DrawResult";
import { JoinDraw } from "components/JoinDraw";
import { GoogleAuth } from "services/GoogleAuth";
import { useState } from "react";
import Container from "components/Container";

type User = { name: string; email: string };
type DrawState = "login" | "create" | "join" | "result";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [drawState, setDrawState] = useState<DrawState>("login");
  const [drawId, setDrawId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);

  const handleLogin = (loggedUser: User) => {
    setUser(loggedUser);
    setDrawState("create");
  };

  const handleDrawCreated = (newDrawId: string) => {
    setDrawId(newDrawId);
    setDrawState("join");
  };

  const handleJoinDraw = (name: string, email: string) => {
    setUser({ name, email });
    setParticipants([...participants, name]);
    setDrawState("result");
  };

  const handleDraw = () => {
    // Implementação simplificada do sorteio
    const availableParticipants = participants.filter((p) => p !== user?.name);
    return availableParticipants[
      Math.floor(Math.random() * availableParticipants.length)
    ];
  };

  return (
    <Container>
      {drawState === "login" && <GoogleAuth onLogin={handleLogin} />}
      {drawState === "create" && user && (
        <CreateDraw onDrawCreated={handleDrawCreated} />
      )}
      {drawState === "join" && drawId && (
        <JoinDraw
          drawId={drawId}
          participants={participants}
          onJoin={handleJoinDraw}
        />
      )}
      {drawState === "result" && user && (
        <DrawResult
          participants={participants}
          currentUser={user.name}
          onDraw={handleDraw}
        />
      )}
    </Container>
  );
}
