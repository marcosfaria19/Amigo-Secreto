export function Footer() {
  return (
    <footer
      draggable={false}
      className="w-full select-none border-t bg-white/80 p-4 backdrop-blur-sm"
    >
      <div className="container mx-auto space-y-2 text-center md:flex md:items-center md:justify-between md:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} Tirou quem?</p>
        <p className="text-sm">
          Desenvolvido por:{" "}
          <a
            href="https://br.linkedin.com/in/marcosfaria19"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-pink-600"
          >
            Marcos Faria
          </a>
        </p>
      </div>
    </footer>
  );
}
