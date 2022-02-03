import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { Auth } from "./Auth";
import { HomePage } from "./HomePage";
import { SearchUsers } from "./SearchUsers";
import { ChangePassword } from "./ChangePassword";

export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <Auth>
              <HomePage />
            </Auth>
          }
        />
        <Route
          path="/search-users"
          element={
            <Auth>
              <SearchUsers />
            </Auth>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <Auth>
              <ChangePassword />
            </Auth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
