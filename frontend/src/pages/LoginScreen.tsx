import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const navigate = useNavigate();

  const handleLogin = (response: any) => {
    // Enviar o token do Google para o backend
    fetch("/api/auth/google", {
      method: "POST",
      body: JSON.stringify({ token: response.credential }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Armazenar o token de autenticação no localStorage
        localStorage.setItem("authToken", data.token);
        navigate("/create-draw"); // Redireciona para a tela de criação de sorteio
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log("Erro de login")}
      />
    </div>
  );
}
