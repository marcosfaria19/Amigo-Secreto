
import { Button } from "components/ui/button"
import { useState } from "react"


// Simulating Google Auth
const fakeGoogleAuth = () => new Promise<{ name: string, email: string }>((resolve) => {
  setTimeout(() => {
    resolve({ name: "Usuário Google", email: "usuario@gmail.com" })
  }, 1000)
})

export function GoogleAuth({ onLogin }: { onLogin: (user: { name: string, email: string }) => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const user = await fakeGoogleAuth()
      onLogin(user)
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleGoogleLogin} disabled={isLoading}>
      {isLoading ? "Carregando..." : "Entrar com Google"}
    </Button>
  )
}