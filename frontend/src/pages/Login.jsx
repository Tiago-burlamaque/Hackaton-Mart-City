// pages/Login.jsx
import { Link } from "react-router-dom";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        email: email,
        senha: senha
      })
      toast.success("Usuário logado com sucesso.")

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario))

      console.log(res.data.token)
      console.log(res.data.usuario)



    } catch (error) {
      if (error.status === 500) {
        toast.error("Erro interno no servidor.")
        return console.log("Erro interno no servidor. ", error)
      }
    }
  }

  return (
    <div className="container">
      <div className="left">
        <h1>Smart Traffic</h1>
        <p>
          Monitoramento inteligente para um trânsito mais seguro.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
          alt="Semáforo"
        />
      </div>

      <div className="right">
        <form className="form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>

          <span>
            Não possui conta? <Link to="/cadastro">Criar Cadastro</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;

