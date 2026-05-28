import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config()

export const createUser = async (req, res) => {
    try {
        const { nome, email, cpf, senha } = req.body;

        // Validar campos
        if (!nome || !email || !cpf || !senha) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        // Verificar se email ou cpf já existem
        const [userExists] = await db.query(
            `SELECT * FROM usuario 
             WHERE email = ? OR cpf = ?`,
            [email, cpf]
        );

        if (userExists.length > 0) {
            return res.status(409).json({
                message: "Email ou CPF já cadastrados."
            });
        }

        // Criptografar senha
        const saltRounds = 10;
        const hashSenha = await bcrypt.hash(senha, saltRounds);

        // Inserir usuário
        await db.query(
            `INSERT INTO usuario 
            (nome, email, cpf, senha)
            VALUES (?, ?, ?, ?)`,
            [nome, email, cpf, hashSenha]
        );

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso."
        });

    } catch (error) {

        // Caso o UNIQUE do banco capture duplicado
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email ou CPF já cadastrados."
            });
        }

        console.log("Erro interno no servidor:", error);

        return res.status(500).json({
            message: "Erro interno no servidor."
        });
    }
};

export const login = async (req, res) => {
    try {

        const { email, senha } = req.body;

        // Verifica campos
        if (!email || !senha) {
            return res.status(400).json({
                message: "Preencha todos os campos."
            });
        }

        // Busca usuário
        const [rows] = await db.query(
            `SELECT * FROM usuario WHERE email = ?`,
            [email]
        );

        // Verifica se usuário existe
        if (rows.length === 0) {
            return res.status(404).json({
                message: "Usuário não encontrado."
            });
        }

        const usuario = rows[0];

        // Comparar senha digitada com hash do banco
        const senhaCorreta = await bcrypt.compare(
            senha,          // senha digitada
            usuario.senha   // hash salvo no banco
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                message: "Senha incorreta."
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                cpf: usuario.cpf
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Login realizado com sucesso.",
            token,
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cpf: usuario.cpf
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Erro interno no servidor."
        });
    }
};