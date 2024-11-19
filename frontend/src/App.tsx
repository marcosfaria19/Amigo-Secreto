import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "routes/Routes";
import { Header } from "components/Header";
import { Footer } from "components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <AppRoutes />
      <Footer />
    </Router>
  );
}

export default App;
