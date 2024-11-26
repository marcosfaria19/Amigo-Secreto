import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "routes/Routes";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import { Toaster } from "components/ui/sonner";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
      <Toaster position="bottom-right" richColors />
    </Router>
  );
}

export default App;
