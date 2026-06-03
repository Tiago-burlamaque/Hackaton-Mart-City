import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Cadastro from "./pages/cadastro";
import Home from "./pages/home";
import "./App.css";

// Componente Helper: Checa o token dinamicamente a cada mudança de rota
const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem("token");
  
  // Se não houver token, redireciona para o login na hora
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  // Se houver, renderiza a página (no caso, a Home)
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Pública: Login */}
        <Route path="/" element={<Login />} />

        {/* Rota Pública: Cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota Protegida: Home */}
        <Route 
          path="/home" 
          element={
            <RotaProtegida>
              <Home />
            </RotaProtegida>
          } 
        />

        {/* Rota de Segurança: Se o usuário digitar qualquer URL maluca, joga pro Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;