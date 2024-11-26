import { CircleUserRound, Gift, Menu } from "lucide-react";
import { Button } from "components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full select-none border-b bg-white/80 p-3 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/home"
          className="flex items-center gap-2 text-lg font-semibold text-gray-800 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <Gift className="h-6 w-6 text-white" />
          </div>
          <span className="hidden sm:inline">Tirou quem?</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Entrar
          </Button>
          <CircleUserRound className="h-8 w-8 cursor-pointer text-gray-600 transition-colors hover:text-gray-800" />
          <Menu
            className="h-6 w-6 cursor-pointer text-gray-600 transition-colors hover:text-gray-800 sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-4 sm:hidden"
          >
            <Button variant="ghost" className="w-full justify-start">
              Entrar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
