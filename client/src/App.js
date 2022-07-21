import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../src/screens/components/NavBar";
import Home from "./screens/Home";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
