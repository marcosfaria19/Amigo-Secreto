import { Button } from "components/ui/button";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Presente Surpresa</h1>
        <nav>
          <Button variant="secondary">Sair</Button>
        </nav>
      </div>
    </header>
  );
}
