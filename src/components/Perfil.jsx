import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Perfil() {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(null)
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })

    useEffect(() => {
        // Obtener usuario logueado
        const usuarioLogeado = localStorage.getItem('usuarioLogeado')
        
        if (!usuarioLogeado) {
            // Si no hay usuario logueado, redirigir al login
            setMensaje({ 
                texto: 'Debes iniciar sesión para ver tu perfil.', 
                tipo: 'warning' 
            })
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } else {
            setUsuario(JSON.parse(usuarioLogeado))
        }
    }, [navigate])

    // Si no hay usuario, mostrar mensaje de carga o redirección
    if (!usuario) {
        return (
            <main className="container py-5" style={{ marginTop: '100px' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {mensaje.texto && (
                            <div className={`alert alert-${mensaje.tipo}`} role="alert">
                                {mensaje.texto}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        )
    }

    // Obtener nombre completo
    const nombreCompleto = `${usuario.nombre || ''} ${usuario.apellidoPaterno || ''} ${usuario.apellidoMaterno || ''}`.trim()

    return (
        <main className="container py-5" style={{ marginTop: '100px' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm bg-light">
                        <div className="card-body p-4">
                            <h3 className="fw-bold mb-4 text-center">Mi Perfil</h3>
                            
                            {/* Foto de perfil */}
                            <div className="text-center mb-4">
                                <div className="d-inline-block position-relative">
                                    <img 
                                        src="/src/assets/Logo.png" 
                                        alt="Foto de perfil" 
                                        className="rounded-circle border border-3"
                                        style={{ 
                                            width: '150px', 
                                            height: '150px', 
                                            objectFit: 'cover',
                                            borderColor: '#1a5490'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Información del usuario */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={nombreCompleto}
                                        readOnly
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Usuario</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={usuario.usuario || ''}
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        value={usuario.correo || ''}
                                        readOnly
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Teléfono</label>
                                    <input 
                                        type="tel" 
                                        className="form-control" 
                                        value={usuario.telefono || 'No especificado'}
                                        readOnly
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Mensaje informativo */}
                            <div className="alert alert-info mt-4" role="alert">
                                <i className="fas fa-info-circle me-2"></i>
                                Esta es tu información de perfil. Próximamente podrás editar tus datos.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Perfil
