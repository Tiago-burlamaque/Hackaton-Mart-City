// pages/Login.jsx
import { Link } from "react-router-dom";
import "./style.css";

function Login() {
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
        <form className="form">
          <h2>Login</h2>

          <input type="email" placeholder="Digite seu email" />

          <input type="password" placeholder="Digite sua senha" />

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