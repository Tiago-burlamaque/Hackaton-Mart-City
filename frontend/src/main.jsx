import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Bounce, ToastContainer } from 'react-toastify'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Layout from './ui/Layout.jsx'
import Home from './pages/Home.jsx'
import SuaConta from './pages/SuaConta.jsx'
import Trafego from './pages/Trafego.jsx'

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },

  {
    element: <Layout />,
    children: ([
      { path: "/home", element: <Home /> },
      { path: "/yourAccout", element: <SuaConta /> },
      { path: "/trafego", element: <Trafego /> },
    ])
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />
  </StrictMode>,
)
