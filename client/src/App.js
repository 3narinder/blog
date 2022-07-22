import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import NavBar from "../src/screens/components/NavBar";
import Home from "./screens/Home";
import Post from "./screens/components/Post";
import SinglePost from "./screens/components/SinglePost";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singlepost/:id" element={<SinglePost />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
