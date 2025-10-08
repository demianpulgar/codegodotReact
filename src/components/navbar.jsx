import '/src/style/style.css'
import './Navbar.css'
import logo from '../assets/Logo.png'

function NavBar(){
    return(
       <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">
                <img src={logo} alt="CodeGodot Logo" className="d-none d-md-block" style={{height: '60px', width: 'auto'}} />
                <img src={logo} alt="CodeGodot Logo" className="d-md-none" style={{height: '40px', width: 'auto'}} />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/">INICIO</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/comunidad">COMUNIDAD</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/login">INICIO SESIÓN</a>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-light fw-bold ms-2 px-3" href="/registro" style={{color: '#1a5490'}}>REGISTRAR</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default NavBar


