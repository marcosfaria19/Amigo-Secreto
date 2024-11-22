import { Route, Routes, Navigate } from "react-router-dom";
import DrawResult from "pages/DrawResult";
import JoinDraw from "pages/JoinDraw";
import CreateDraw from "pages/CreateDraw";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<CreateDraw />} />
      <Route path="/draw/:link" element={<JoinDraw />} />
      <Route path="/result" element={<DrawResult />} />
      {/*       <Route path="*" element={<Navigate to="/home" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
