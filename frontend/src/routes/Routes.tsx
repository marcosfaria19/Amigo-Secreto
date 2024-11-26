import { Route, Routes, Navigate } from "react-router-dom";
import DrawResult from "pages/DrawResult";
import JoinDraw from "pages/JoinDraw";
import CreateDraw from "pages/CreateDraw";
import Home from "pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateDraw />} />
      <Route path="/draw/:link" element={<JoinDraw />} />
      <Route path="/draw/:drawId/:userResult" element={<DrawResult />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default AppRoutes;
