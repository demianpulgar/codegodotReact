import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Toast from './Toast'
import * as usuarioService from '../services/usuarioService'

function Registro() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        usuario: '',
        telefono: '',
        password: '',
        confirmar: '',
        terminos: false
    })
    const [errors, setErrors] = useState({})
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
    const [cargando, setCargando] = useState(false)
    const [toast, setToast] = useState(null)

    const validarEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    const campoVacio = (valor) => {
        return !valor || valor.trim() === ''
    }

    const validarPassword = (pass) => {
        if (pass.length < 8) return false
        if (!/[A-Z]/.test(pass)) return false
        if (!/[!@#$%^&*()_+\-=\[\]{}|;':".,<>?`~]/.test(pass)) return false
        return true
    }

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }))
        // Limpiar error del campo
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}
        let valido = true

        // Validaciones
        if (campoVacio(formData.nombre)) {
            newErrors.nombre = 'Ingresa tu nombre.'
            valido = false
        }
        if (campoVacio(formData.apellidoPaterno)) {
            newErrors.apellidoPaterno = 'Ingresa tu apellido paterno.'
            valido = false
        }
        if (campoVacio(formData.apellidoMaterno)) {
            newErrors.apellidoMaterno = 'Ingresa tu apellido materno.'
            valido = false
        }
        if (!validarEmail(formData.correo)) {
            newErrors.correo = 'Ingresa un correo electrónico válido.'
            valido = false
        }
        if (campoVacio(formData.usuario)) {
            newErrors.usuario = 'Ingresa un nombre de usuario.'
            valido = false
        }
        if (campoVacio(formData.password)) {
            newErrors.password = 'Ingresa una contraseña.'
            valido = false
        } else if (!validarPassword(formData.password)) {
            let mensajeError = ''
            if (formData.password.length < 8) {
                mensajeError = 'La contraseña debe tener al menos 8 caracteres.'
            } else if (!/[A-Z]/.test(formData.password)) {
                mensajeError = 'La contraseña debe tener al menos una letra mayúscula.'
            } else if (!/[!@#$%^&*()_+\-=\[\]{}|;':".,<>?`~]/.test(formData.password)) {
                mensajeError = 'La contraseña debe tener al menos un carácter especial (!@#$%^&* etc.).'
            }
            newErrors.password = mensajeError
            valido = false
        }
        if (formData.password !== formData.confirmar) {
            newErrors.confirmar = 'Las contraseñas no coinciden.'
            valido = false
        }
        if (!formData.terminos) {
            newErrors.terminos = 'Debes aceptar los términos y condiciones.'
            valido = false
        }

        if (!valido) {
            setErrors(newErrors)
            return
        }

        setCargando(true)
        try {
            // Usar el nuevo servicio de usuario
            await usuarioService.registro({
                nombre: formData.nombre,
                apellidoPaterno: formData.apellidoPaterno,
                apellidoMaterno: formData.apellidoMaterno,
                correo: formData.correo,
                username: formData.usuario,
                telefono: formData.telefono,
                password: formData.password
            })

            setToast({ 
                texto: '¡Bienvenido! Tu cuenta ha sido creada. Redirigiendo a login...', 
                tipo: 'success' 
            })
            
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            console.error('Error en registro:', error)
            setToast({ 
                texto: error.message || 'Error al registrar. Intenta nuevamente.', 
                tipo: 'danger' 
            })
            // Si es error de usuario duplicado, mostrar en el campo específico
            if (error.message.includes('usuario')) {
                setErrors(prev => ({...prev, usuario: error.message}))
            } else if (error.message.includes('correo')) {
                setErrors(prev => ({...prev, correo: error.message}))
            }
        } finally {
            setCargando(false)
        }
    }

    return (
        <>
            {toast && (
                <Toast 
                    mensaje={toast.texto} 
                    tipo={toast.tipo}
                    onClose={() => setToast(null)}
                />
            )}
            <main className="container py-5" style={{ marginTop: '100px' }}>
            <div className="row justify-content-center">
                <div className="col-lg-6 col-xl-5">
                    <div className="card border-0 shadow-lg bg-dark text-light" style={{borderTop: '3px solid #00ff88'}}>
                        <div className="card-body p-5">
                            <h3 className="fw-bold mb-3" style={{color: '#00ff88'}}>Crea tu Cuenta</h3>
                            <p className="text-muted mb-4" style={{ fontSize: '0.95em' }}>
                                Únete a la comunidad de desarrolladores Godot. Comparte tus códigos y aprende de otros.
                            </p>
                            
                            {/* Mensaje de error/éxito */}
                            {mensaje.texto && (
                                <div className={`alert alert-${mensaje.tipo} mb-3`} role="alert">
                                    {mensaje.texto}
                                </div>
                            )}
                            
                            <form id="formRegistro" noValidate onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nombre" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Nombre*</label>
                                        <input 
                                            type="text" 
                                            id="nombre" 
                                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                            style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                            required 
                                            placeholder="Tu nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                        {errors.nombre && (
                                            <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.nombre}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="apellidoPaterno" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Apellido Paterno*</label>
                                        <input 
                                            type="text" 
                                            id="apellidoPaterno" 
                                            className={`form-control ${errors.apellidoPaterno ? 'is-invalid' : ''}`}
                                            style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                            required 
                                            placeholder="Tu apellido paterno"
                                            value={formData.apellidoPaterno}
                                            onChange={handleChange}
                                        />
                                        {errors.apellidoPaterno && (
                                            <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.apellidoPaterno}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellidoMaterno" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Apellido Materno*</label>
                                    <input 
                                        type="text" 
                                        id="apellidoMaterno" 
                                        className={`form-control ${errors.apellidoMaterno ? 'is-invalid' : ''}`}
                                        style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                        required 
                                        placeholder="Tu apellido materno"
                                        value={formData.apellidoMaterno}
                                        onChange={handleChange}
                                    />
                                    {errors.apellidoMaterno && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.apellidoMaterno}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Correo electrónico*</label>
                                    <input 
                                        type="email" 
                                        id="correo" 
                                        className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                                        style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                        required 
                                        placeholder="tu@correo.com"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                    {errors.correo && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.correo}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Nombre de usuario*</label>
                                    <input 
                                        type="text" 
                                        id="usuario" 
                                        className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                                        style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                        required 
                                        placeholder="Tu usuario"
                                        value={formData.usuario}
                                        onChange={handleChange}
                                    />
                                    {errors.usuario && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.usuario}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Teléfono</label>
                                    <input 
                                        type="tel"
                                        id="telefono" 
                                        className="form-control" 
                                        style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                        placeholder="Tu número de teléfono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Contraseña*</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                        required 
                                        placeholder="Crea una contraseña segura"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.password}</div>
                                    )}
                                    <div className="form-text text-muted" style={{ fontSize: '0.8em' }}>Mín. 8 caracteres, una mayúscula y un carácter especial (!@#$%^&*)</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmar" className="form-label fw-semibold" style={{color: '#e2e8f0'}}>Confirma contraseña*</label>
                                    <input 
                                        type="password" 
                                        id="confirmar" 
                                        className={`form-control ${errors.confirmar ? 'is-invalid' : ''}`}
                                        style={{backgroundColor: '#1e293b', color: '#e2e8f0', borderColor: '#00ff88'}}
                                        required 
                                        placeholder="Confirma tu contraseña"
                                        value={formData.confirmar}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmar && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.confirmar}</div>
                                    )}
                                </div>
                                <div className="mb-4 form-check">
                                    <input 
                                        type="checkbox" 
                                        className={`form-check-input ${errors.terminos ? 'is-invalid' : ''}`}
                                        id="terminos" 
                                        required
                                        checked={formData.terminos}
                                        onChange={handleChange}
                                        style={{cursor: 'pointer'}}
                                    />
                                    <label className="form-check-label ms-2" htmlFor="terminos" style={{ fontSize: '0.9em', color: '#e2e8f0', cursor: 'pointer' }}>
                                        Acepta los <a href="#" style={{ color: '#00ff88', textDecoration: 'none' }}>términos y condiciones</a>
                                    </label>
                                    {errors.terminos && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.terminos}</div>
                                    )}
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn fw-bold w-100 py-2" 
                                    style={{ background: '#00ff88', color: '#0f172a' }}
                                    disabled={cargando}
                                >
                                    <i className="fas fa-user-plus me-2"></i> {cargando ? 'Registrando...' : 'Crear Cuenta'}
                                </button>
                            </form>
                            
                            <div className="text-center mt-4">
                                <span style={{ fontSize: '0.9em', color: '#cbd5e1' }}>¿Ya tienes cuenta? </span>
                                <Link to="/login" style={{ textDecoration: 'none', fontSize: '0.9em', color: '#00ff88', fontWeight: 'bold' }}>
                                    Inicia sesión aquí
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
        </>
    )
}

export default Registro
