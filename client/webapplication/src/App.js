import { Routes, Route } from "react-router-dom"; // Use 'Routes' without renaming to 'Switch'
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateContact from "./pages/CreateContact";
import AllContact from "./pages/AllContact";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Routes> {/* Correct component name */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/mycontacts" element={<AllContact />} />
          </Routes>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
