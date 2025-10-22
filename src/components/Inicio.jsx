import { Link } from 'react-router-dom'

function Inicio() {
    return (
        <>
            {/* Hero Section con fondo azul */}
            <section className="hero-section min-vh-100">
                <div className="container min-vh-100">
                    <div className="row min-vh-100 py-5">
                        {/* Columna de contenido (izquierda) */}
                        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center text-center">
                            <h1 className="display-4 fw-bold mb-4">Copiar y pegar</h1>
                            <p className="lead mb-4">Una experiencia agradable, fácil uso y ahorro de tiempo.<br/>CodeGodot es una página que te ayudará ahorrar tiempo y ayudando al aprendizaje con la rápida adquisición de código fácil y rápido que entregamos para tu proyecto de godot :)</p>
                            <div>
                                <Link to="/comunidad" className="btn btn-light fw-bold px-4 py-2">Comenzar</Link>
                            </div>
                        </div>
                        {/* Columna vacía (derecha) - Solo visible en desktop */}
                        <div className="col-lg-6 d-none d-lg-block"></div>
                    </div>
                </div>
            </section>

            {/* Sección "¿Qué entregamos?" */}
            <section className="white-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-4">¿Qué entregamos?</h2>
                            <p>
                                Aquí encontrarás fragmentos de código listos para usar, ejemplos prácticos y 
                                soluciones rápidas que podrás copiar, pegar y adaptar a tus proyectos.
                            </p>
                            <p>En nuestra comunidad podrás:</p>
                            <ul>
                                <li>Explorar códigos verificados y fácil de implementar.</li>
                                <li>Guardar tus favoritos y dar "me gusta" a los que más te ayuden.</li>
                                <li>Personalizar tu perfil y mostrar tu estilo de desarrollo.</li>
                                <li>Subir tus propios códigos para ayudar a la comunidad y compartir tus propios códigos, llegar a otros desarrolladores y hacer crecer tu comunidad.</li>
                                <li>Cada aporte será revisado por nuestros administradores para asegurar calidad y confianza.</li>
                                <li>Este es tu lugar para aprender, compartir y crear sin límites.</li>
                            </ul>
                            <p>
                                Únete hoy a <strong>CodeGodot</strong> y sé parte de la comunidad que transforma ideas en juegos.
                            </p>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="d-flex align-items-center justify-content-center">
                                <img className="navbar-brand" src="/src/assets/Logo.png" alt="CodeGodot Logo" />
                                <h3 className="fw-bold"></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección "¿Qué es Godot?" */}
            <section className="godot-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-4">¿Qué es Godot?</h2>
                            <p>
                                Godot es un motor de desarrollo de videojuegos libre y de código abierto, que permite crear 
                                juegos en 2D y 3D con facilidad. Su filosofía de nodos y escenas facilita la 
                                programación intuitiva. GDScript facilita tu creación de proyectos sin necesidad de 
                                conocimientos complejos, ideal tanto para principiantes como para desarrolladores 
                                experimentados.
                            </p>
                            <p>
                                En nuestra página te proporcionamos fragmentos de código listos para usar en Godot, 
                                ahorrándote tiempo y guiándote en el desarrollo de mecánicas complejas y aplicar el código a tu 
                                proyecto acelerando tu flujo de trabajo y ayudándote a llevar tus ideas a la realidad más rápido.
                            </p>
                        </div>
                        <div className="col-lg-5 text-center">
                            <img src="/src/assets/Godot.png" alt="Godot Engine" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Cuarta sección - Herramientas */}
            <section className="tools-section">
                <div className="container text-center">
                    <h2 className="fw-bold mb-5">Esta página tendrá herramientas que te harán la vida mas fácil! :)</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="tool-card">
                                <div className="mb-3">
                                    <div className="tool-icon">
                                        <span>⚡</span>
                                    </div>
                                </div>
                                <h5>Rápido!</h5>
                                <p>
                                    La implementación de código será súper rápido, podrás copiar y pegar el código, tendrá una descripción cada publicación que te ayudará a entender de cómo hacerlo funcionar :)
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="tool-card">
                                <div className="mb-3">
                                    <div className="tool-icon">
                                        <span>🎁</span>
                                    </div>
                                </div>
                                <h5>Gratis!</h5>
                                <p>
                                    Esta página será hasta sin fines de lucro, todo para que tú puedas usar y disfrutar de estos códigos y poder avanzar en sus proyectos personales o profesionales!
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="tool-card">
                                <div className="mb-3">
                                    <div className="tool-icon">
                                        <span>🌍</span>
                                    </div>
                                </div>
                                <h5>Para todo mundo!</h5>
                                <p>
                                    Esta página está hecha para todo el mundo, para que cualquiera pueda usarla, probar y sacar provecho a esta herramienta hecha con mucho cariño.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Inicio
