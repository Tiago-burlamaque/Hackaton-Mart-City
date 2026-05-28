import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
    try {
        const { nome, email, cpf, senha } = req.body;

        if (nome == "" || email == "" || cpf == "", senha == "") {
            req.status(400).json({
                message: "Preencha os campos."
            })
        }

        const salts = 10;
        const hashSenha = await bcrypt.hash(senha, salts)
        
        const [rows] = await db.query(
            `INSERT INTO usuario 
            (nome, email, cpf, senha)
            VALUES 
            (?, ?, ?, ?)`, [nome, email, cpf, hashSenha]
        )
    } catch (error) {

    }
}