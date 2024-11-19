import React, { useContext } from "react";
import { BrowserRouter as Router, Navigate } from "react-router-dom";

import Rotas from "./routes/Rotas";
import "./App.css";


function App() {



  return (
    <Router>
   

       <Header />
      <Rotas />
       <Footer />

 
    </Router>
  );
}

export default App;