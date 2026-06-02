import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"

function Layout() {
    return (
        <div className='flex h-screen bg-[#3a867c]'>
            <div>
                <SideBar />
            </div>

            <section className="h-screen justify-center items-center flex w-full">
                <Outlet />
            </section>
        </div>
    )
}

export default Layout
