import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import HomePage from "./pages/home.page";
import Editor from "./pages/editor.pages";
import { useState } from "react";
import { useEffect } from "react";
import { lookInSession } from "./common/session";

const App = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor" element={<Editor />} />

        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<UserAuthForm type="log-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-Up" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
