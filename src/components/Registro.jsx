import { Link } from 'react-router-dom'

function Registro() {
    return (
        <main className="container py-5" style={{ marginTop: '100px' }}>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-xl-5">
                    <div className="card border-0 shadow-sm bg-light">
                        <div className="card-body p-4">
                            <h3 className="fw-bold mb-3">Crea tu Cuenta</h3>
                            <p className="text-muted mb-4" style={{ fontSize: '0.9em' }}>
                                Crea tu cuenta para entrar al mundo de la sencillez y rapidez, donde podrás ver y la 
                                posibilidad de mostrar tu trabajo y ayudar a la comunidad :)
                            </p>
                            
                            {/* Mensaje de error/éxito */}
                            <div id="mensajeRegistro" className="alert alert-danger d-none mb-3" role="alert"></div>
                            
                            <form id="formRegistro" noValidate>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nombre" className="form-label fw-semibold">Nombre*</label>
                                        <input type="text" id="nombre" className="form-control" required placeholder="Ingrese tu nombre" />
                                        <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="apellidoPaterno" className="form-label fw-semibold">Apellido Paterno*</label>
                                        <input type="text" id="apellidoPaterno" className="form-control" required placeholder="Ingrese apellido paterno" />
                                        <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellidoMaterno" className="form-label fw-semibold">Apellido Materno*</label>
                                    <input type="text" id="apellidoMaterno" className="form-control" required placeholder="Ingrese apellido materno" />
                                    <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label fw-semibold">Correo electrónico*</label>
                                    <input type="email" id="correo" className="form-control" required placeholder="Ingrese tu correo electrónico" />
                                    <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label fw-semibold">Nombre de usuario*</label>
                                    <input type="text" id="usuario" className="form-control" required placeholder="Ingrese su nombre de usuario" />
                                    <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label fw-semibold">Teléfono</label>
                                    <input type="tel" id="telefono" className="form-control" placeholder="Ingrese tu número de teléfono" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Contraseña*</label>
                                    <input type="password" id="password" className="form-control" required placeholder="Crea una contraseña segura" />
                                    <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                    <div className="form-text text-muted" style={{ fontSize: '0.8em' }}>La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial (!@#$%^&* etc.).</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmar" className="form-label fw-semibold">Confirma contraseña*</label>
                                    <input type="password" id="confirmar" className="form-control" required placeholder="Confirma tu contraseña" />
                                    <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                </div>
                                <div className="mb-4 form-check">
                                    <input type="checkbox" className="form-check-input" id="terminos" required />
                                    <label className="form-check-label" htmlFor="terminos" style={{ fontSize: '0.9em' }}>
                                        Acepta los <a href="#" style={{ color: '#1a5490' }}>términos y condiciones</a>
                                    </label>
                                    <div className="error-message d-none text-danger mt-1" style={{ fontSize: '0.875em' }}></div>
                                </div>
                                <button type="submit" className="btn fw-bold w-100 py-3 mb-3" style={{ background: '#1a5490', color: 'white' }}>Crear cuenta</button>
                            </form>
                            
                            <div className="text-center">
                                <span style={{ fontSize: '0.9em' }}>Ya tienes una cuenta? </span>
                                <Link to="/login" style={{ textDecoration: 'none', fontSize: '0.9em' }}>Inicia sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Registro
