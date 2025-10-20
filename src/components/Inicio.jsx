import { Link } from 'react-router-dom'

function Inicio() {
    return (
        <>
            {/* Hero Section con fondo azul */}
            <section className="hero-section min-vh-100" style={{backgroundImage: "url('/src/assets/background.webp')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                <div className="container min-vh-100">
                    <div className="row min-vh-100 py-5">
                        {/* Columna de contenido (izquierda) */}
                        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center text-center">
                            <h1 className="display-4 fw-bold mb-4">Copiar y pegar</h1>
                            <p className="lead mb-4">Una experiencia agradable, fácil uso y ahorro de tiempo.<br/>CodeGodot es una página que te ayudará ahorrar tiempo y ayudando al aprendizaje con la rápida adquisición de código fácil y rápido que entregamos para tu proyecto de godot :)</p>
                            <div>
                                <Link to="/comunidad" className="btn btn-light fw-bold px-4 py-2" style={{color: '#1a5490'}}>Comenzar</Link>
                            </div>
                        </div>
                        {/* Columna vacía (derecha) - Solo visible en desktop */}
                        <div className="col-lg-6 d-none d-lg-block"></div>
                    </div>
                </div>
            </section>

            {/* Sección "¿Qué entregamos?" */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-4 text-center">¿Qué entregamos?</h2>
                            <p style={{lineHeight: '1.6'}}>
                                Aquí encontrarás fragmentos de código listos para usar, ejemplos prácticos y 
                                soluciones rápidas que podrás copiar, pegar y adaptar a tus proyectos.
                            </p>
                            <p style={{lineHeight: '1.6'}}>En nuestra comunidad podrás:</p>
                            <ul style={{lineHeight: '1.6'}}>
                                <li>Explorar códigos verificados y fácil de implementar.</li>
                                <li>Guardar tus favoritos y dar "me gusta" a los que más te ayuden.</li>
                                <li>Personalizar tu perfil y mostrar tu estilo de desarrollo.</li>
                                <li>Subir tus propios códigos para ayudar a la comunidad y compartir tus propios códigos, llegar a otros desarrolladores y hacer crecer tu comunidad.</li>
                                <li>Cada aporte será revisado por nuestros administradores para asegurar calidad y confianza.</li>
                                <li>Este es tu lugar para aprender, compartir y crear sin límites.</li>
                            </ul>
                            <p style={{lineHeight: '1.6'}}>
                                Únete hoy a <strong>CodeGodot</strong> y sé parte de la comunidad que transforma ideas en juegos.
                            </p>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <img style={{height:'200px'}} className="navbar-brand" src="/src/assets/Logo.png" alt="CodeGodot Logo" />
                                <h3 className="fw-bold" style={{margin: 0}}></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección "¿Qué es Godot?" */}
            <section className="py-5" style={{color: 'white'}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-4">¿Qué es Godot?</h2>
                            <p style={{lineHeight: '1.6', marginBottom: '1rem'}}>
                                Godot es un motor de desarrollo de videojuegos libre y de código abierto, que permite crear 
                                juegos en 2D y 3D con facilidad. Su filosofía de nodos y escenas facilita la 
                                programación intuitiva. GDScript facilita tu creación de proyectos sin necesidad de 
                                conocimientos complejos, ideal tanto para principiantes como para desarrolladores 
                                experimentados.
                            </p>
                            <p style={{lineHeight: '1.6'}}>
                                En nuestra página te proporcionamos fragmentos de código listos para usar en Godot, 
                                ahorrándote tiempo y guiándote en el desarrollo de mecánicas complejas y aplicar el código a tu 
                                proyecto acelerando tu flujo de trabajo y ayudándote a llevar tus ideas a la realidad más rápido.
                            </p>
                        </div>
                        <div className="col-lg-5 text-center">
                            <img src="/src/assets/Godot.png" alt="Godot Engine" className="img-fluid" style={{maxWidth: '300px', filter: 'brightness(0) invert(1)'}} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cuarta sección - Herramientas */}
            <section className="py-5 bg-light">
                <div className="container text-center">
                    <h2 className="fw-bold mb-5">Esta página tendrá herramientas que te harán la vida mas fácil! :)</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="p-4">
                                <div className="mb-3">
                                    <div className="card-icon" style={{width: '60px', height: '60px', margin: '0 auto', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <span style={{fontSize: '1.5em'}}>⚡</span>
                                    </div>
                                </div>
                                <h5 className="fw-bold">Rápido!</h5>
                                <p className="text-muted" style={{fontSize: '0.9em'}}>
                                    La implementación de código será súper rápido, podrás copiar y pegar el código, tendrá una descripción cada publicación que te ayudará a entender de cómo hacerlo funcionar :)
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="p-4">
                                <div className="mb-3">
                                    <div className="card-icon" style={{width: '60px', height: '60px', margin: '0 auto', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <span style={{fontSize: '1.5em'}}>🎁</span>
                                    </div>
                                </div>
                                <h5 className="fw-bold">Gratis!</h5>
                                <p className="text-muted" style={{fontSize: '0.9em'}}>
                                    Esta página será hasta sin fines de lucro, todo para que tú puedas usar y disfrutar de estos códigos y poder avanzar en sus proyectos personales o profesionales!
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="p-4">
                                <div className="mb-3">
                                    <div className="card-icon" style={{width: '60px', height: '60px', margin: '0 auto', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <span style={{fontSize: '1.5em'}}>🌍</span>
                                    </div>
                                </div>
                                <h5 className="fw-bold">Para todo mundo!</h5>
                                <p className="text-muted" style={{fontSize: '0.9em'}}>
                                    Esta página está hecha para todo el mundo, para que cualquiera pueda usarla, probar y sacar provecho a esta herramienta hecha con mucho cariño.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 mb-4">
                            <img src="/src/assets/Logo.png" alt="CodeGodot Logo" style={{height: '50px', filter: 'brightness(0) invert(1)'}} />
                            <p className="mt-3" style={{fontSize: '0.9em'}}>Tu fuente para obtener codigo optimizado de godot y ahorrar tu tiempo :)</p>
                            <div className="d-flex">
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-instagram" style={{fontSize: '24px'}}></i>
                                </a>
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-twitter" style={{fontSize: '24px'}}></i>
                                </a>
                                <a href="#" className="text-white me-3">
                                    <i className="fab fa-reddit" style={{fontSize: '24px'}}></i>
                                </a>
                                <a href="#" className="text-white">
                                    <i className="fab fa-discord" style={{fontSize: '24px'}}></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-2 mb-4">
                            <h6 className="fw-bold mb-3">Enlaces</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white-50 text-decoration-none">Inicio</a></li>
                                <li><a href="#" className="text-white-50 text-decoration-none">Sobre nosotros</a></li>
                                <li><a href="#" className="text-white-50 text-decoration-none">Servicios</a></li>
                                <li><a href="#" className="text-white-50 text-decoration-none">Contacto</a></li>
                                <li><a href="#" className="text-white-50 text-decoration-none">Comunidad</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 mb-4">
                            <h6 className="fw-bold mb-3">Contacto y soporte</h6>
                            <p style={{fontSize: '0.9em'}}>+56 9 0710 2001<br/>supportcodegodot@codegodot.cl<br/>Avenida Peruano, Tokyio, Indonesia</p>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="mb-0" style={{fontSize: '0.9em'}}>© 2025 CodeGodot. All rights reserved.</p>
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
        </>
    )
}

export default Inicio
