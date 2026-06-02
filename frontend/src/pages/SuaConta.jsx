import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function SuaConta() {

    const usuario = JSON.parse(localStorage.getItem("usuario"))

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("usuario")
        localStorage.removeItem("token")

        toast.success("Usuário deslogado com sucesso.")
        navigate("/")

    }
    return (
        <section>
            <div className='w-100 h-100 bg-neutral-300 rounded-2xl shadow-2xl'>
                <header className='w-full h-20 flex items-center justify-center border-b-2'>
                    <h1 className='poppins-extrabold text-2xl'>Seus Dados</h1>
                </header>
                <main className='h-50 w-full justify-center items-center flex '>
                    <ul className='flex-col gap-5 flex text-2xl'>
                        <li className='flex gap-1'>
                            <h2 className='poppins-extrabold'>Nome:</h2> <span className='poppins-bold'>{usuario?.nome}</span>
                        </li>
                        <li className='flex gap-1'>
                            <h2 className='poppins-extrabold'>E-mail:</h2> <span className='poppins-bold'>{usuario?.email}</span>
                        </li>
                        <li className='flex gap-1'>
                            <h2 className='poppins-extrabold'>CPF:</h2> <span className='poppins-bold'>{usuario?.cpf}</span>
                        </li>
                    </ul>
                </main>
                <footer className='flex items-center justify-center '>
                    <button className='w-70 text-xl poppins-extrabold bg-red-500 text-white cursor-pointer hover:bg-red-900 transition-colors duration-300 rounded' onClick={handleLogout}>
                        Logout
                    </button>
                 
                </footer>
            </div>
        </section>
    )
}

export default SuaConta