import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 mb-4">
                        <img src="/src/assets/Logo.png" alt="CodeGodot Logo" className="footer-logo" />
                        <p className="mt-3 footer-text">Tu fuente para obtener codigo optimizado de godot y ahorrar tu tiempo :)</p>
                        <div className="d-flex">
                            <a href="#" className="text-white me-3">
                                <img src="/src/assets/instagram.png" alt="Instagram" className="social-icon" />
                            </a>
                            <a href="#" className="text-white me-3">
                                <img src="/src/assets/x.png" alt="Twitter/X" className="social-icon" />
                            </a>
                            <a href="#" className="text-white me-3">
                                <img src="/src/assets/reddit.png" alt="Reddit" className="social-icon" />
                            </a>
                            <a href="#" className="text-white">
                                <img src="/src/assets/discordia.png" alt="Discord" className="social-icon" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 mb-4">
                        <h6 className="fw-bold mb-3">Enlaces</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white-50 text-decoration-none">Inicio</Link></li>
                            <li><a href="#" className="text-white-50 text-decoration-none">Sobre nosotros</a></li>
                            <li><a href="#" className="text-white-50 text-decoration-none">Servicios</a></li>
                            <li><a href="#" className="text-white-50 text-decoration-none">Contacto</a></li>
                            <li><Link to="/comunidad" className="text-white-50 text-decoration-none">Comunidad</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 mb-4">
                        <h6 className="fw-bold mb-3">Contacto y soporte</h6>
                        <p className="footer-text">
                            +56 9 0710 2001<br />
                            supportcodegodot@codegodot.cl<br />
                            Avenida Peruano, Tokyio, Indonesia
                        </p>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                    <div className="col-lg-6">
                        <p className="mb-0 footer-text">© 2025 CodeGodot. All rights reserved.</p>
                    </div>
                    <div className="col-lg-6 text-lg-end">
                        <a href="#" className="text-white-50 text-decoration-none me-3">Privacy Policy</a>
                        <a href="#" className="text-white-50 text-decoration-none me-3">Terms of Service</a>
                        <a href="#" className="text-white-50 text-decoration-none">Cookie Policy</a>
                        <a href="#" className="text-white-50 text-decoration-none">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
