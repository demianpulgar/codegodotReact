import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

    // Utilidades
    const obtenerUsuarios = () => {
        const usuarios = localStorage.getItem('usuarios')
        return usuarios ? JSON.parse(usuarios) : []
    }

    const guardarUsuarios = (usuarios) => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }

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

    const handleSubmit = (e) => {
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

        // Verificar si el correo o usuario ya existe
        const usuarios = obtenerUsuarios()
        if (usuarios.some(u => u.correo === formData.correo)) {
            setMensaje({ texto: 'El correo ya está registrado.', tipo: 'danger' })
            newErrors.correo = 'Este correo ya está registrado.'
            valido = false
        }
        if (usuarios.some(u => u.usuario === formData.usuario)) {
            setMensaje({ texto: 'El nombre de usuario ya está registrado.', tipo: 'danger' })
            newErrors.usuario = 'Este nombre de usuario ya está registrado.'
            valido = false
        }

        if (!valido) {
            setErrors(newErrors)
            return
        }

        // Guardar usuario
        usuarios.push({
            nombre: formData.nombre,
            apellidoPaterno: formData.apellidoPaterno,
            apellidoMaterno: formData.apellidoMaterno,
            correo: formData.correo,
            usuario: formData.usuario,
            telefono: formData.telefono,
            password: formData.password
        })
        guardarUsuarios(usuarios)

        // Mostrar mensaje de éxito
        setMensaje({ texto: '¡Registro exitoso! Ahora puedes iniciar sesión.', tipo: 'success' })
        alert('¡Cuenta creada exitosamente! Serás redirigido al login para iniciar sesión.')

        // Redirigir después de 2 segundos
        setTimeout(() => {
            navigate('/login')
        }, 2000)
    }

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
                            {mensaje.texto && (
                                <div className={`alert alert-${mensaje.tipo} mb-3`} role="alert">
                                    {mensaje.texto}
                                </div>
                            )}
                            
                            <form id="formRegistro" noValidate onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nombre" className="form-label fw-semibold">Nombre*</label>
                                        <input 
                                            type="text" 
                                            id="nombre" 
                                            className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                                            required 
                                            placeholder="Ingrese tu nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                        />
                                        {errors.nombre && (
                                            <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.nombre}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="apellidoPaterno" className="form-label fw-semibold">Apellido Paterno*</label>
                                        <input 
                                            type="text" 
                                            id="apellidoPaterno" 
                                            className={`form-control ${errors.apellidoPaterno ? 'is-invalid' : ''}`}
                                            required 
                                            placeholder="Ingrese apellido paterno"
                                            value={formData.apellidoPaterno}
                                            onChange={handleChange}
                                        />
                                        {errors.apellidoPaterno && (
                                            <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.apellidoPaterno}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellidoMaterno" className="form-label fw-semibold">Apellido Materno*</label>
                                    <input 
                                        type="text" 
                                        id="apellidoMaterno" 
                                        className={`form-control ${errors.apellidoMaterno ? 'is-invalid' : ''}`}
                                        required 
                                        placeholder="Ingrese apellido materno"
                                        value={formData.apellidoMaterno}
                                        onChange={handleChange}
                                    />
                                    {errors.apellidoMaterno && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.apellidoMaterno}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label fw-semibold">Correo electrónico*</label>
                                    <input 
                                        type="email" 
                                        id="correo" 
                                        className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                                        required 
                                        placeholder="Ingrese tu correo electrónico"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                    {errors.correo && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.correo}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label fw-semibold">Nombre de usuario*</label>
                                    <input 
                                        type="text" 
                                        id="usuario" 
                                        className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                                        required 
                                        placeholder="Ingrese su nombre de usuario"
                                        value={formData.usuario}
                                        onChange={handleChange}
                                    />
                                    {errors.usuario && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.usuario}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label fw-semibold">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        id="telefono" 
                                        className="form-control" 
                                        placeholder="Ingrese tu número de teléfono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Contraseña*</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        required 
                                        placeholder="Crea una contraseña segura"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.password}</div>
                                    )}
                                    <div className="form-text text-muted" style={{ fontSize: '0.8em' }}>La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter especial (!@#$%^&* etc.).</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmar" className="form-label fw-semibold">Confirma contraseña*</label>
                                    <input 
                                        type="password" 
                                        id="confirmar" 
                                        className={`form-control ${errors.confirmar ? 'is-invalid' : ''}`}
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
                                    />
                                    <label className="form-check-label" htmlFor="terminos" style={{ fontSize: '0.9em' }}>
                                        Acepta los <a href="#" style={{ color: '#1a5490' }}>términos y condiciones</a>
                                    </label>
                                    {errors.terminos && (
                                        <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{errors.terminos}</div>
                                    )}
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
