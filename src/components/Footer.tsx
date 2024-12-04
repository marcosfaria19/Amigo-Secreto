import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto select-none bg-menu py-4 text-menu-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 text-center md:flex-row md:space-y-0 md:text-left">
          <div>
            <p className="text-sm sm:text-base">
              &copy; {currentYear} - Todos os direitos reservados a PPI Testes e Ensaios Elétricos
            </p>
          </div>
          <div>
            <p className="text-sm sm:text-base">
              Desenvolvedor:{" "}
              <a
                href="https://www.linkedin.com/in/marcosfaria19/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                Marcos Faria
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
