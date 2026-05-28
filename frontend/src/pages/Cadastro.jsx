// pages/Cadastro.jsx
import { Link } from "react-router-dom";
import "./style.css";

function Cadastro() {
  return (
    <div className="container">
      <div className="left">
        <h1>Smart Traffic</h1>

        <p>
          Cadastro de operadores e administradores do sistema.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
          alt="Cidade Inteligente"
        />
      </div>

      <div className="right">
        <form className="form">
          <h2>Cadastro</h2>

          <input type="text" placeholder="Nome completo" />

          <input type="email" placeholder="Email" />

          <input type="text" placeholder="CPF" />

          <input type="text" placeholder="Telefone" />

          <input type="password" placeholder="Senha" />

          <input type="password" placeholder="Confirmar senha" />

          <select>
            <option>Selecione o cargo</option>
            <option>Administrador</option>
            <option>Operador</option>
            <option>Emergência</option>
          </select>

          <button type="submit">Cadastrar</button>

          <span>
            Já possui conta? <Link to="/">Fazer Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;