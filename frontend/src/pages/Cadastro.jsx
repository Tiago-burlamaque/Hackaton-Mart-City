// pages/Cadastro.jsx
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from 'axios'
import { useState } from "react";
import { toast } from 'react-toastify'
import { InputMask } from 'primereact/inputmask'

function Cadastro() {

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [cpf, setCpf] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    if (senha !== confirmarSenha) {
      return toast.warning("As senhas não considem.")
    }
    try {
      await axios.post("http://localhost:3000/user/registro", {
        nome: nome,
        email: email,
        cpf: cpf,
        senha: senha
      })

      toast.success("Usuário criado com sucesso")
      navigate('/')
    } catch (error) {
      if (error.status === 409) {
        return toast.warning("Usuário já cadastrado")
      }
      if (error.status === 500) {
        return toast.error("Erro interno no servidor. ", error)
      }
    }
  }

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
        <form className="form" onSubmit={handleRegister}>
          <h2>Cadastro</h2>

          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputMask
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask="999.999.999-99"
            placeholder="999.999.999-99"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />

          {/* <select>
            <option>Selecione o cargo</option>
            <option>Administrador</option>
            <option>Operador</option>
            <option>Emergência</option>
          </select> */}

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