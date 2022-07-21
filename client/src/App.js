import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "../src/screens/components/NavBar";
import Home from "./screens/Home";
import Post from "./screens/components/Post";
import SinglePost from "./screens/components/SinglePost";

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/singlepost" element={<SinglePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
