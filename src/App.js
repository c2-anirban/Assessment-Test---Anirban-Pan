import logo from "./logo.svg";
import "./App.css";
import SignInPage from "./Pages/SignInPage";
import Home from "./home/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DataListPage from "./Pages/DataListPage";
import ProtectedRoute from "./routes/protected/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<SignInPage />} />
          <Route
            path="/home"
            exact
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list"
            exact
            element={
              <ProtectedRoute>
                <DataListPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
