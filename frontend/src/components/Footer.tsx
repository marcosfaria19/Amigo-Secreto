export function Footer() {
  return (
    <footer
      draggable={false}
      className="mt-auto select-none bg-secondary p-4 text-secondary-foreground"
    >
      <div className="container mx-auto space-y-2 text-center md:flex md:items-center md:justify-between md:space-y-0">
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
