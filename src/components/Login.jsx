function Login() {
    return (
        <main className="container py-5" style={{ marginTop: '100px' }}>
            <div className="row">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="card border-0 shadow-sm bg-light">
                        <div className="card-body p-4">
                            <h3 className="fw-bold mb-4">Inicio Sesión</h3>
                            
                            {/* Mensaje de error/éxito */}
                            <div id="mensajeError" className="alert alert-danger d-none mb-3" role="alert"></div>
                            
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="UserLabel" className="form-label fw-semibold">Usuario</label>
                                    <input type="text" id="UserLabel" className="form-control" placeholder="Ingrese su usuario" />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correoLabel" className="form-label fw-semibold">Correo electrónico</label>
                                    <input type="email" id="correoLabel" className="form-control" placeholder="Ingrese su correo electrónico" />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="passwordLabel" className="form-label fw-semibold">Contraseña</label>
                                    <input type="password" id="passwordLabel" className="form-control" placeholder="Ingrese contraseña" />
                                    <div className="invalid-feedback"></div>
                                </div>
                                <button type="button" className="btn btn-light fw-bold px-5 py-2">Inicio Sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="p-4 rounded bg-light">
                        <div className="mb-3">
                            <p className="fw-bold">"Bienvenido a CodeGodot. Aquí la comunidad comparte, aprende y acelera su desarrollo."</p>
                        </div>
                        <div className="mb-3">
                            <p>"Entra y encuentra el snippet que te ahorrará horas de café ☕ y frustración."</p>
                        </div>
                        <div className="mb-3">
                            <p>"Error 404: Motivación no encontrada... hasta que inicies sesión 😎"</p>
                        </div>
                        <div className="mb-3">
                            <p>"Tu próximo proyecto empieza aquí 🚀"</p>
                        </div>
                        <div className="mb-0">
                            <p>"Gracias por confiar en CodeGodot. Cada línea de código que aprendes hoy, es un error menos que cometerás mañana."</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login
