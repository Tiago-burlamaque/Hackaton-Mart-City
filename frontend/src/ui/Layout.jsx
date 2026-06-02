import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function Layout() {
    return (
        <section className='h-screen flex flex-col'>
            <nav className="w-full h-50 flex flex items-center justify-center fixed">
                <Navbar />
            </nav>

            <main>
                <Outlet />
            </main>
        </section>
    )
}

export default Layout
