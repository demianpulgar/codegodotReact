import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/src/assets/Logo.png" alt="CodeGodot Logo" className="d-none d-md-block" style={{height: '60px', width: 'auto'}} />
                    <img src="/src/assets/Logo.png" alt="CodeGodot Logo" className="d-md-none" style={{height: '40px', width: 'auto'}} />
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
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/login">INICIO SESIÓN</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="btn btn-light fw-bold ms-2 px-3" to="/registro" style={{color: '#1a5490'}}>REGISTRAR</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
