import DrawResult from "pages/DrawResult";
import JoinDraw from "pages/JoinDraw";
import CreateDraw from "pages/CreateDraw";
import { Route, Routes, Navigate } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<CreateDraw />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;
