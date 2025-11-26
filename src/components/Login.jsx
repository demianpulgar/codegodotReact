import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../config/api'
import Toast from './Toast'

function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        usuario: '',
        correo: '',
        password: ''
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

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }))
        }
    }

    const iniciarSesion = async (e) => {
        e.preventDefault()
        const newErrors = {}
        let valido = true

        // Validaciones
        if (!validarEmail(formData.correo)) {
            newErrors.correo = 'Ingresa un correo electrónico válido.'
            valido = false
        }
        if (campoVacio(formData.usuario)) {
            newErrors.usuario = 'Ingresa tu nombre de usuario.'
            valido = false
        }
        if (campoVacio(formData.password)) {
            newErrors.password = 'Ingresa tu contraseña.'
            valido = false
        }

        if (!valido) {
            setErrors(newErrors)
            return
        }

        setCargando(true)
        try {
            // Intentar login con el backend
            const response = await fetch(`${config.baseURL}/usuarios/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: formData.usuario,
                    correo: formData.correo,
                    password: formData.password
                })
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || 'Credenciales inválidas')
            }

            const userData = await response.json()
            
            // Guardar usuario en localStorage
            const usuarioParaGuardar = {
                ...userData,
                username: userData.username || formData.usuario
            }
            localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioParaGuardar))
            
            setToast({ 
                texto: '¡Bienvenido ' + userData.nombre + '!', 
                tipo: 'success' 
            })
            
            // Disparar evento
            window.dispatchEvent(new Event('storage'))
            
            setTimeout(() => {
                navigate('/')
            }, 1200)
        } catch (error) {
            console.error('Error en login:', error)
            setToast({ 
                texto: error.message || 'Correo, usuario o contraseña incorrectos.', 
                tipo: 'danger' 
            })
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
            <div className="row">
                <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="card border-0 shadow-sm bg-light">
                        <div className="card-body p-4">
                            <h3 className="fw-bold mb-4">Inicio Sesión</h3>
                            
                            {/* Mensaje de error/éxito */}
                            {mensaje.texto && (
                                <div className={`alert alert-${mensaje.tipo} mb-3`} role="alert">
                                    {mensaje.texto}
                                </div>
                            )}
                            
                            <form onSubmit={iniciarSesion}>
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label fw-semibold">Usuario</label>
                                    <input 
                                        type="text" 
                                        id="usuario" 
                                        className={`form-control ${errors.usuario ? 'is-invalid' : ''}`}
                                        placeholder="Ingrese su usuario"
                                        value={formData.usuario}
                                        onChange={handleChange}
                                    />
                                    {errors.usuario && (
                                        <div className="invalid-feedback d-block">{errors.usuario}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label fw-semibold">Correo electrónico</label>
                                    <input 
                                        type="email" 
                                        id="correo" 
                                        className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                                        placeholder="Ingrese su correo electrónico"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                    {errors.correo && (
                                        <div className="invalid-feedback d-block">{errors.correo}</div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Ingrese contraseña"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback d-block">{errors.password}</div>
                                    )}
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-light fw-bold px-5 py-2"
                                    disabled={cargando}
                                >
                                    {cargando ? 'Iniciando sesión...' : 'Inicio Sesión'}
                                </button>
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
        </>
    )
}

export default Login
