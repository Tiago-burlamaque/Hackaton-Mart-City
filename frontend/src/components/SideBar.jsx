import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {

    const usuario = JSON.parse(localStorage.getItem("usuario"))

    return (
        <aside class="w-67 bg-slate-900 text-white p-6 h-full">
            <header className='w-full h-50 flex items-center justify-center'>
                <h1 className='poppins-extrabold text-4xl '>
                    SMTART CITY
                </h1>
            </header>
            <nav className=''>
                <ul class="space-y-4 text-2xl poppins-extralight flex flex-col gap-5  justify-center items-center w-full h-100">
                    <li>
                        <Link to="/home" class="block hover:text-blue-400 ">
                            Início
                        </Link>
                    </li>

                    <li>
                        <Link to="/trafego" class="block hover:text-blue-400">
                            Bairros
                        </Link>
                    </li>

                    <li>
                        <Link to="/yourAccout" class="block hover:text-blue-400">
                            Sua conta
                        </Link>
                    </li>
                </ul>
            </nav>
            <footer className='w-full border-t-2 flex items-center justify-center h-32 poppins-extrabold text-2xl'>
                <h1>{usuario?.email}</h1>
            </footer>
        </aside>
    )
}

export default SideBar