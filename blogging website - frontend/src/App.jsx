import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import HomePage from "./pages/home.page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="login" element={<UserAuthForm type="log-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-Up" />} />
          <Route path="login" element={<UserAuthForm type="log-in" />} />
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
