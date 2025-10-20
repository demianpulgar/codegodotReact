import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './index.css'
import '/src/style/style.css'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/comunidad" element={<div>Comunidad</div>} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/registro" element={<div>Registro</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
