import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '/src/style/style.css'
import '/src/style/codePreview.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './components/Inicio'
import Comunidad from './components/Comunidad'
import DetalleCode from './components/DetalleCode'
import Login from './components/Login'
import Registro from './components/Registro'
import Perfil from './components/Perfil'
import QueEsGodot from './pages/QueEsGodot'
import Tutorial from './pages/Tutorial'
import { AuthProvider } from './context/AuthContext'
import { useEffect } from 'react'

// Componente wrapper para manejar rutas perdidas
function RouteHandler() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Si estamos en /index.html, significa que S3 redirigió aquí
    if (location.pathname === '/index.html') {
      const savedPath = sessionStorage.getItem('redirectPath')
      if (savedPath) {
        sessionStorage.removeItem('redirectPath')
        navigate(savedPath, { replace: true })
      } else {
        navigate('/', { replace: true })
      }
    }
  }, [location.pathname, navigate])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/comunidad" element={<Comunidad />} />
        <Route path="/comunidad/:id" element={<DetalleCode />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/que-es-godot" element={<QueEsGodot />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>
        <RouteHandler />
      </HashRouter>
    </AuthProvider>
  </StrictMode>,
)
