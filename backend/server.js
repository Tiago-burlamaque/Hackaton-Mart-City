const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mysql2 = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql2.createPool({
    user: "root",
    password: "senai",
    host: "localhost",
    database: "hackaton_smart_city"
});

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   CADASTRO
========================= */
app.post("/cadastro", async (req, res) => {
    try {
        const { nome, email, senha, cpf } = req.body;

        const [existe] = await db.query(
            "SELECT id FROM usuario WHERE email = ?",
            [email]
        );

        if (existe.length > 0) {
            return res.status(400).json({
                message: "Email já cadastrado", // Alterado para 'message' para alinhar com o front
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await db.query(
            `INSERT INTO usuario (nome, email, cpf, senha)
             VALUES (?, ?, ?, ?)`,
            [nome, email, cpf, senhaHash]
        );

        return res.json({
            message: "Usuário cadastrado com sucesso",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro no servidor"
        });
    }
});

/* =========================
   LOGIN
========================= */
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const [rows] = await db.query(
            "SELECT * FROM usuario WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({
                message: "Usuário não encontrado", // Alterado para 'message'
            });
        }

        const usuario = rows[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(400).json({
                message: "Senha inválida", // Alterado para 'message'
            });
        }

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        },
            process.env.JWT_SECRET || "sua_chave_secreta_fallback", {
            expiresIn: "1h"
        });

        return res.status(200).json({
            message: "Login realizado",
            token,
            usuario: {
                nome: usuario.nome,
                email: usuario.email,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro no servidor"
        });
    }
});

/* =========================
   LÓGICA DA IA DO SEMÁFORO
========================= */
app.post("/api/semaforo/analisar", async (req, res) => {
    try {
        // O front-end envia a quantidade de veículos que a "câmera com IA" detectou
        const { veiculosDetectados } = req.body;

        let tempoVerde = 10; // Tempo padrão em segundos
        let statusTrafego = "Normal";

        // Algoritmo de tomada de decisão baseado no fluxo
        if (veiculosDetectados > 15) {
            tempoVerde = 30; // Trânsito pesado: estende o tempo do verde
            statusTrafego = "Pesado (IA priorizando esta via)";
        } else if (veiculosDetectados > 7) {
            tempoVerde = 20; // Trânsito moderado
            statusTrafego = "Moderado";
        } else {
            tempoVerde = 8;  // Via praticamente vazia: fecha rápido para fluir outros cruzamentos
            statusTrafego = "Leve";
        }

        // Opcional: Se você quiser registrar o histórico no banco de dados mais tarde, a conexão 'db' está pronta aqui.

        return res.json({
            veiculosDetectados,
            tempoVerde,
            statusTrafego,
            timestamp: new Date().toLocaleTimeString()
        });

    } catch (error) {
        console.error("Erro na análise da IA:", error);
        return res.status(500).json({
            message: "Erro ao processar dados de tráfego."
        });
    }
});

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});