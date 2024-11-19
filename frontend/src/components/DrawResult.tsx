import { useState } from "react"
import { Button } from "components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "components/ui/card"

export function DrawResult({ participants, currentUser, onDraw }: { 
  participants: string[], 
  currentUser: string,
  onDraw: () => string
}) {
  const [drawnPerson, setDrawnPerson] = useState<string | null>(null)

  const handleDraw = () => {
    const drawn = onDraw()
    setDrawnPerson(drawn)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Resultado do Sorteio</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Participantes:</p>
        <ul className="list-disc pl-5 mb-4">
          {participants.map((participant) => (
            <li key={participant} className={participant === currentUser ? "font-bold" : ""}>
              {participant}
            </li>
          ))}
        </ul>
        {drawnPerson ? (
          <p className="text-center text-xl font-bold">
            Seu amigo secreto é: {drawnPerson}
          </p>
        ) : (
          <p className="text-center">Clique no botão abaixo para sortear seu amigo secreto.</p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleDraw} disabled={!!drawnPerson}>
          {drawnPerson ? "Sorteado!" : "Sortear Amigo Secreto"}
        </Button>
      </CardFooter>
    </Card>
  )
}