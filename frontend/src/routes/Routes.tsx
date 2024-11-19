import DrawResult from "components/DrawResult";
import JoinDraw from "components/JoinDraw";
import Home from "pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<DrawResult />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;
