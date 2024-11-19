export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground p-4 mt-auto">
      <div className="container mx-auto text-center space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Meu amigo é...
        </p>
        <p className="text-sm">
          Desenvolvido por:{" "}
          <a
            href="https://br.linkedin.com/in/marcosfaria19"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            Marcos Faria
          </a>
        </p>
      </div>
    </footer>
  );
}
