import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false); // Estado para evitar múltiplos cliques

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // 1. Validação básica de campos
        if (!email.trim() || !senha.trim()) {
            return toast.warning("Preencha todos os campos.");
        }

        try {
            setLoading(true);

            const res = await axios.post("http://localhost:5000/login", {
                email: email.trim(),
                senha,
            });

            // 2. Validação da resposta do servidor
            if (!res.data || !res.data.token) {
                throw new Error("Resposta do servidor inválida. Token não encontrado.");
            }

            // 3. Salvando de forma segura
            localStorage.setItem("token", res.data.token);

            if (res.data.usuario) {
                localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
            }

            toast.success("Login realizado com sucesso!");
            navigate("/home");

        } catch (error) {
            console.error("Erro no login:", error);

            // Trata erros de resposta do servidor ou erros disparados manualmente no try
            const mensagemErro = error.response?.data?.message || error.message || "Email ou senha inválidos.";
            toast.error(mensagemErro);
        } finally {
            setLoading(false); // Desativa o loading independente de sucesso ou erro
        }
    };

    return (
        <div className="container">
            <div className="box">
                <h1>🚦 Smart Traffic</h1>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        disabled={loading}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Carregando..." : "Entrar"}
                    </button>

                    <p>
                        Não possui conta?{" "}
                        <Link to="/cadastro">Criar Cadastro</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;