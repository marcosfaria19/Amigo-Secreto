import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Propostas from "../pages/Propostas";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/propostas" element={<Propostas />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
