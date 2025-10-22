import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Logo from '../assets/Logo.png'

function Navbar() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(null)

    useEffect(() => {
        // Verificar si hay usuario logueado
        const usuario = localStorage.getItem('usuarioLogeado')
        if (usuario) {
            setUsuarioLogueado(JSON.parse(usuario))
        }

        // Escuchar cambios en localStorage
        const handleStorageChange = () => {
            const usuario = localStorage.getItem('usuarioLogeado')
            setUsuarioLogueado(usuario ? JSON.parse(usuario) : null)
        }

        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('usuarioLogeado')
        setUsuarioLogueado(null)
        window.location.href = '/'
    }

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} alt="CodeGodot Logo" className="d-none d-md-block" style={{height: '60px', width: 'auto'}} />
                    <img src={Logo} alt="CodeGodot Logo" className="d-md-none" style={{height: '40px', width: 'auto'}} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">INICIO</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/comunidad">COMUNIDAD</Link>
                        </li>
                        {usuarioLogueado ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/perfil">
                                        <i className="fas fa-user me-1"></i> MI PERFIL
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="btn btn-light fw-bold ms-2 px-3" 
                                        onClick={handleLogout}
                                        style={{color: '#1a5490'}}
                                    >
                                        CERRAR SESIÓN
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/login">INICIO SESIÓN</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-light fw-bold ms-2 px-3" to="/registro" style={{color: '#1a5490'}}>REGISTRAR</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
