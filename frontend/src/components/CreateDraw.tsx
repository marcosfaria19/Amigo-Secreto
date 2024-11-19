import { useState } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "components/ui/card"

export function CreateDraw({ onDrawCreated }: { onDrawCreated: (drawId: string) => void }) {
  const [participants, setParticipants] = useState<string[]>([])
  const [newParticipant, setNewParticipant] = useState("")

  const addParticipant = () => {
    if (newParticipant.trim() !== "" && !participants.includes(newParticipant.trim())) {
      setParticipants([...participants, newParticipant.trim()])
      setNewParticipant("")
    }
  }

  const createDraw = () => {
    if (participants.length >= 3) {
      // Simulating draw creation with a unique ID
      const drawId = Math.random().toString(36).substr(2, 9)
      onDrawCreated(drawId)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Criar Novo Sorteio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Nome do participante"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          />
          <Button onClick={addParticipant}>Adicionar</Button>
        </div>
        <ul className="space-y-2">
          {participants.map((participant, index) => (
            <li key={index} className="bg-secondary p-2 rounded">{participant}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={createDraw} disabled={participants.length < 3}>
          Criar Sorteio
        </Button>
      </CardFooter>
    </Card>
  )
}