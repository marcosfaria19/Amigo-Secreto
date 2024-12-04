import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "components/ui/button";
import { Sun, Moon } from "lucide-react";
import logo from "assets/logo.png";

const Header: React.FC = () => {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle(
      "light-theme",
      savedTheme === "light",
    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle(
      "light-theme",
      newTheme === "light",
    );
  };

  return (
    <header>
      <div className="m:max-w-screen pointer-events-auto flex select-none items-center justify-between bg-menu px-4 py-2 text-menu-foreground lg:px-12">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="PPI Testes em EPI e EPC" className="mr-5 w-20" />
          <span className="text-xl font-semibold md:text-2xl">
            Sistema de Propostas
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-menu-foreground hover:bg-secondary/20 hover:opacity-80"
            onClick={toggleTheme}
            aria-label={`Alternar para modo ${
              theme === "dark" ? "claro" : "escuro"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
