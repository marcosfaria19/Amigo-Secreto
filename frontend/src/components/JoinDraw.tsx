import { useState } from "react"
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "components/ui/card"
import { GoogleAuth } from "services/GoogleAuth"


export function JoinDraw({ drawId, participants, onJoin }: { 
  drawId: string, 
  participants: string[], 
  onJoin: (name: string, email: string) => void 
}) {
  const [selectedName, setSelectedName] = useState("")
  const [email, setEmail] = useState("")

  const handleJoin = () => {
    if (selectedName && email) {
      onJoin(selectedName, email)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Participar do Sorteio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Select onValueChange={setSelectedName}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu nome" />
            </SelectTrigger>
            <SelectContent>
              {participants.map((name) => (
                <SelectItem key={name} value={name}>{name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" onClick={handleJoin} disabled={!selectedName || !email}>
          Participar
        </Button>
        <GoogleAuth onLogin={(user) => onJoin(selectedName, user.email)} />
      </CardFooter>
    </Card>
  )
}