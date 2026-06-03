import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false); // Evita cliques duplicados

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // 1. Validação básica com trim para ignorar espaços vazios acidentais
    if (!nome.trim() || !email.trim() || !cpf.trim() || !senha || !confirmarSenha) {
      return toast.warning("Preencha todos os campos.");
    }

    if (senha !== confirmarSenha) {
      return toast.warning("As senhas não coincidem.");
    }

    try {
      setLoading(true);

      // Envia os dados limpos ao backend
      await axios.post("http://localhost:5000/cadastro", {
        nome: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim(),
        senha: senha,
      });

      toast.success("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);

      // Captura tanto o status 400 (do nosso server) quanto o 409
      if (error.response?.status === 400 || error.response?.status === 409) {
        return toast.warning(error.response?.data?.message || "Usuário já cadastrado.");
      }

      toast.error(
        error.response?.data?.message || "Erro ao cadastrar usuário."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h1>🚦 Smart Traffic</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={loading}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <p>
            Já possui conta?{" "}
            <Link to="/">Fazer Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;