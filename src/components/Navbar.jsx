import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Logo from '../assets/Logo.png'

function Navbar() {
    const [usuarioLogueado, setUsuarioLogueado] = useState(null)
    const [navOpen, setNavOpen] = useState(false)

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

    // Función para cerrar el navbar móvil
    const cerrarNavbar = () => {
        setNavOpen(false)
        // Cerrar el collapse de Bootstrap manualmente
        const navbarCollapse = document.getElementById('navbarNav')
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show')
        }
    }

    const handleLogout = () => {
        cerrarNavbar()
        localStorage.removeItem('usuarioLogeado')
        setUsuarioLogueado(null)
        // Navegación compatible con HashRouter en S3
        window.location.hash = '/'
    }

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <Link className="navbar-brand me-4" to="/" onClick={cerrarNavbar}>
                    <img src={Logo} alt="CodeGodot Logo" className="d-none d-md-block" style={{height: '80px', width: 'auto'}} />
                    <img src={Logo} alt="CodeGodot Logo" className="d-md-none" style={{height: '60px', width: 'auto'}} />
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={navOpen}
                    aria-label="Toggle navigation"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" onClick={cerrarNavbar}>INICIO</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/que-es-godot" onClick={cerrarNavbar}>¿QUÉ ES GODOT?</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tutorial" onClick={cerrarNavbar}>TUTORIAL</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/comunidad" onClick={cerrarNavbar}>COMUNIDAD</Link>
                        </li>
                        {usuarioLogueado ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/perfil" onClick={cerrarNavbar}>
                                        <i className="fas fa-user me-2" style={{color: '#00ff88'}}></i> {usuarioLogueado.username || 'Usuario'}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="btn btn-outline-danger fw-bold px-3 py-1" 
                                        onClick={handleLogout}
                                        style={{fontSize: '0.9rem', borderWidth: '2px'}}
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>SALIR
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={cerrarNavbar}>
                                        <i className="fas fa-sign-in-alt me-1"></i> INICIO SESIÓN
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-registrar fw-bold" to="/registro" onClick={cerrarNavbar}>
                                        <i className="fas fa-user-plus me-1"></i> REGISTRAR
                                    </Link>
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
