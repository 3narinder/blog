import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import NavBar from "../src/screens/components/NavBar";
import Home from "./screens/Home";
import SinglePost from "./screens/components/SinglePost";
import AddPost from "../src/screens/AddPost.jsx";
import Dashboard from "./screens/Dashboard";
import Register from "./screens/Register";
import Login from "./screens/Login";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/singlepost/:id" element={<SinglePost />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
