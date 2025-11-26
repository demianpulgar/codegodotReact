import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getUserData } from '../services/userDataService'
import codigoService from '../services/codigoService'
import config from '../config/api'
import Logo from '../assets/Logo.png'

function Perfil() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [usuarioLocal, setUsuarioLocal] = useState(null)
    const [perfilEdicion, setPerfilEdicion] = useState({})
    const [userData, setUserData] = useState({ likes: [], saves: [] })
    const [codigosLikeados, setCodigosLikeados] = useState([])
    const [codigosGuardados, setCodigosGuardados] = useState([])
    const [cargando, setCargando] = useState(true)
    const [cargandoGuardar, setCargandoGuardar] = useState(false)
    const [tabs, setTabs] = useState('likes') // 'likes', 'guardados'
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })
    const [fotoPreview, setFotoPreview] = useState(null)

    // Scroll a top cuando cambia el tab
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [tabs])

    useEffect(() => {
        // Verificar si hay usuario logueado
        const usuarioLogeado = localStorage.getItem('usuarioLogeado')
        
        if (!usuarioLogeado) {
            setMensaje({ 
                texto: 'Debes iniciar sesión para ver tu perfil.', 
                tipo: 'warning' 
            })
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } else {
            const usuarioParsed = JSON.parse(usuarioLogeado)
            setUsuarioLocal(usuarioParsed)
            
            // Inicializar formulario de edición
            setPerfilEdicion({
                nombre: usuarioParsed.nombre || '',
                apellidoPaterno: usuarioParsed.apellidoPaterno || '',
                apellidoMaterno: usuarioParsed.apellidoMaterno || '',
                correo: usuarioParsed.correo || '',
                telefono: usuarioParsed.telefono || '',
                username: usuarioParsed.username || '',
                fotoUrl: usuarioParsed.fotoUrl || ''
            })
            
            // Mostrar foto preview si existe
            if (usuarioParsed.fotoUrl) {
                setFotoPreview(usuarioParsed.fotoUrl)
            }
            
            // Obtener datos de likes y guardados
            const data = getUserData(usuarioParsed.username)
            setUserData(data)
            
            // Cargar códigos likeados y guardados
            cargarCodigos(data)
        }
    }, [navigate])

    const cargarCodigos = async (data) => {
        try {
            setCargando(true)
            const todosLosCodigos = await codigoService.obtenerTodos()
            
            // Filtrar códigos likeados
            const likes = todosLosCodigos.filter(c => data.likes.includes(c.id))
            setCodigosLikeados(likes)
            
            // Filtrar códigos guardados
            const saves = todosLosCodigos.filter(c => data.saves.includes(c.id))
            setCodigosGuardados(saves)
        } catch (error) {
            console.error('Error cargando códigos:', error)
            setMensaje({
                texto: 'Error al cargar tus códigos favoritos',
                tipo: 'danger'
            })
        } finally {
            setCargando(false)
        }
    }

    const handleFotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setMensaje({
                    texto: 'Por favor selecciona una imagen válida',
                    tipo: 'warning'
                })
                return
            }

            // Validar tamaño (máximo 500KB)
            if (file.size > 500 * 1024) {
                setMensaje({
                    texto: 'La imagen debe ser menor a 500KB. Por favor usa una imagen más pequeña o comprimida.',
                    tipo: 'warning'
                })
                return
            }

            // Convertir a base64
            const reader = new FileReader()
            reader.onloadend = () => {
                // Validar tamaño del base64 (máximo ~500KB en base64)
                if (reader.result.length > 700000) {
                    setMensaje({
                        texto: 'La imagen codificada es demasiado grande. Usa una imagen más pequeña.',
                        tipo: 'warning'
                    })
                    return
                }
                setFotoPreview(reader.result)
                setPerfilEdicion({
                    ...perfilEdicion,
                    fotoUrl: reader.result
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleGuardarPerfil = async (e) => {
        e.preventDefault()
        
        if (!perfilEdicion.correo || !perfilEdicion.nombre || !perfilEdicion.apellidoPaterno) {
            setMensaje({
                texto: 'Por favor completa los campos requeridos',
                tipo: 'warning'
            })
            return
        }

        if (!usuarioLocal || !usuarioLocal.username) {
            setMensaje({
                texto: 'Error: Usuario no identificado',
                tipo: 'danger'
            })
            return
        }

        // Validar username con solo letras y números
        if (perfilEdicion.username && !/^[a-zA-Z0-9_]+$/.test(perfilEdicion.username)) {
            setMensaje({
                texto: 'El usuario solo puede contener letras, números y guiones bajos',
                tipo: 'warning'
            })
            return
        }

        setCargandoGuardar(true)
        try {
            // Construir objeto con solo los cambios
            const cambios = {}
            
            // Solo agregar campos que cambiaron
            if (perfilEdicion.nombre !== usuarioLocal.nombre) cambios.nombre = perfilEdicion.nombre
            if (perfilEdicion.apellidoPaterno !== usuarioLocal.apellidoPaterno) cambios.apellidoPaterno = perfilEdicion.apellidoPaterno
            if (perfilEdicion.apellidoMaterno !== usuarioLocal.apellidoMaterno) cambios.apellidoMaterno = perfilEdicion.apellidoMaterno
            if (perfilEdicion.correo !== usuarioLocal.correo) cambios.correo = perfilEdicion.correo
            if (perfilEdicion.telefono !== usuarioLocal.telefono) cambios.telefono = perfilEdicion.telefono
            
            // Verificar si hay foto nueva (siempre que sea diferente a la original)
            if (perfilEdicion.fotoUrl) {
                if (!usuarioLocal.fotoUrl || perfilEdicion.fotoUrl !== usuarioLocal.fotoUrl) {
                    cambios.fotoUrl = perfilEdicion.fotoUrl
                }
            }
            
            let nuevoUsername = perfilEdicion.username
            if (nuevoUsername && nuevoUsername !== usuarioLocal.username) {
                // Verificar disponibilidad del nuevo username
                const checkResponse = await fetch(`${config.baseURL}/usuarios/check-username/${nuevoUsername}`)
                if (checkResponse.ok) {
                    const data = await checkResponse.json()
                    if (data.exists) {
                        setMensaje({
                            texto: 'El nombre de usuario ya está en uso',
                            tipo: 'danger'
                        })
                        setCargandoGuardar(false)
                        return
                    }
                }
                cambios.username = nuevoUsername
            }

            // Si no hay cambios, mostrar mensaje
            if (Object.keys(cambios).length === 0) {
                setMensaje({
                    texto: 'No hay cambios para guardar',
                    tipo: 'info'
                })
                setCargandoGuardar(false)
                return
            }

            // Usar FormData en lugar de JSON para manejar datos grandes (especialmente fotos)
            const formData = new FormData()
            Object.keys(cambios).forEach(key => {
                formData.append(key, cambios[key])
            })

            const response = await fetch(`${config.baseURL}/usuarios/${usuarioLocal.username}`, {
                method: 'PUT',
                body: formData
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || 'Error al actualizar el perfil')
            }

            const usuarioActualizado = await response.json()

            // Actualizar localStorage
            const usuarioActualizadoCompleto = {
                ...usuarioLocal,
                ...usuarioActualizado
            }
            localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioActualizadoCompleto))
            setUsuarioLocal(usuarioActualizadoCompleto)

            // Reinicializar formulario con datos actualizados
            setPerfilEdicion({
                nombre: usuarioActualizado.nombre || '',
                apellidoPaterno: usuarioActualizado.apellidoPaterno || '',
                apellidoMaterno: usuarioActualizado.apellidoMaterno || '',
                correo: usuarioActualizado.correo || '',
                telefono: usuarioActualizado.telefono || '',
                username: usuarioActualizado.username || '',
                fotoUrl: usuarioActualizado.fotoUrl || ''
            })

            setMensaje({
                texto: '✅ Perfil actualizado correctamente',
                tipo: 'success'
            })

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000)
        } catch (error) {
            console.error('Error al guardar perfil:', error)
            setMensaje({
                texto: 'Error al actualizar el perfil. Intenta más tarde.',
                tipo: 'danger'
            })
        } finally {
            setCargandoGuardar(false)
        }
    }

    if (!usuarioLocal) {
        return (
            <main className="container py-5" style={{ marginTop: '100px', minHeight: '80vh' }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        {mensaje.texto && (
                            <div className={`alert alert-${mensaje.tipo}`} role="alert">
                                <i className="fas fa-info-circle me-2"></i>
                                {mensaje.texto}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        )
    }

    const nombreCompleto = `${usuarioLocal.nombre || ''} ${usuarioLocal.apellidoPaterno || ''} ${usuarioLocal.apellidoMaterno || ''}`.trim()

    return (
        <main className="profile-container">
            <div className="container py-5" style={{ marginTop: '100px' }}>
                {/* Header del Perfil */}
                <div className="profile-header mb-5">
                    <div className="row align-items-center">
                        <div className="col-md-3 text-center mb-4 mb-md-0">
                            <div className="profile-avatar-wrapper">
                                <img 
                                    src={fotoPreview || Logo} 
                                    alt="Foto de perfil" 
                                    className="profile-avatar"
                                    style={{maxWidth: '140px', height: 'auto'}}
                                />
                            </div>
                            <div className="mt-3">
                                <label className="btn btn-sm btn-outline-primary" style={{cursor: 'pointer', borderColor: '#00ff88', color: '#00ff88'}}>
                                    <i className="fas fa-camera me-2"></i>
                                    Cambiar Foto
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        style={{display: 'none'}}
                                        onChange={handleFotoChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <h1 className="profile-name fw-bold mb-2">
                                {nombreCompleto || usuarioLocal.username}
                            </h1>
                            <p className="profile-username text-muted mb-3">
                                <i className="fas fa-at me-2" style={{color: '#00ff88'}}></i>
                                {usuarioLocal.username}
                            </p>
                            {usuarioLocal.correo && (
                                <p className="profile-email text-muted">
                                    <i className="fas fa-envelope me-2" style={{color: '#0088ff'}}></i>
                                    {usuarioLocal.correo}
                                </p>
                            )}
                            
                            {/* Mini form inline en el header */}
                            <div className="mt-4 p-3" style={{backgroundColor: '#1e293b', borderRadius: '8px'}}>
                                <form onSubmit={handleGuardarPerfil}>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label fw-semibold text-small" style={{color: '#cbd5e1'}}>Nombre</label>
                                            <input 
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{backgroundColor: '#0f172a', color: '#e2e8f0', borderColor: '#00ff88'}}
                                                value={perfilEdicion.nombre || ''}
                                                onChange={(e) => setPerfilEdicion({...perfilEdicion, nombre: e.target.value})}
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label fw-semibold text-small" style={{color: '#cbd5e1'}}>Usuario</label>
                                            <input 
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{backgroundColor: '#0f172a', color: '#e2e8f0', borderColor: '#00ff88'}}
                                                value={perfilEdicion.username || ''}
                                                onChange={(e) => setPerfilEdicion({...perfilEdicion, username: e.target.value})}
                                                placeholder="Tu usuario"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label fw-semibold text-small" style={{color: '#cbd5e1'}}>A. Paterno</label>
                                            <input 
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{backgroundColor: '#0f172a', color: '#e2e8f0', borderColor: '#00ff88'}}
                                                value={perfilEdicion.apellidoPaterno || ''}
                                                onChange={(e) => setPerfilEdicion({...perfilEdicion, apellidoPaterno: e.target.value})}
                                                placeholder="Paterno"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label fw-semibold text-small" style={{color: '#cbd5e1'}}>A. Materno</label>
                                            <input 
                                                type="text"
                                                className="form-control form-control-sm"
                                                style={{backgroundColor: '#0f172a', color: '#e2e8f0', borderColor: '#00ff88'}}
                                                value={perfilEdicion.apellidoMaterno || ''}
                                                onChange={(e) => setPerfilEdicion({...perfilEdicion, apellidoMaterno: e.target.value})}
                                                placeholder="Materno"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label fw-semibold text-small" style={{color: '#cbd5e1'}}>Correo</label>
                                            <input 
                                                type="email"
                                                className="form-control form-control-sm"
                                                style={{backgroundColor: '#0f172a', color: '#e2e8f0', borderColor: '#00ff88'}}
                                                value={perfilEdicion.correo || ''}
                                                onChange={(e) => setPerfilEdicion({...perfilEdicion, correo: e.target.value})}
                                                placeholder="correo@ejemplo.com"
                                            />
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <label className="form-label fw-semibold text-small" style={{color: '#cbd5e1'}}>Teléfono</label>
                                            <input 
                                                type="tel"
                                                className="form-control form-control-sm"
                                                style={{backgroundColor: '#0f172a', color: '#e2e8f0', borderColor: '#00ff88'}}
                                                value={perfilEdicion.telefono || ''}
                                                onChange={(e) => setPerfilEdicion({...perfilEdicion, telefono: e.target.value})}
                                                placeholder="+123456789"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex gap-2">
                                        <button 
                                            type="submit" 
                                            className="btn btn-success btn-sm fw-bold"
                                            disabled={cargandoGuardar}
                                        >
                                            <i className="fas fa-save me-1"></i>
                                            {cargandoGuardar ? 'Guardando...' : 'Guardar'}
                                        </button>
                                        <button 
                                            type="button"
                                            className="btn btn-outline-secondary btn-sm fw-bold"
                                            onClick={() => setPerfilEdicion({
                                                nombre: usuarioLocal.nombre,
                                                apellidoPaterno: usuarioLocal.apellidoPaterno,
                                                apellidoMaterno: usuarioLocal.apellidoMaterno,
                                                correo: usuarioLocal.correo,
                                                telefono: usuarioLocal.telefono,
                                                username: usuarioLocal.username
                                            })}
                                        >
                                            <i className="fas fa-undo me-1"></i>
                                            Cancelar
                                        </button>
                                    </div>
                                    {mensaje.texto && (
                                        <div className={`alert alert-${mensaje.tipo} mt-2 mb-0`} role="alert">
                                            <i className="fas fa-check-circle me-2"></i>
                                            {mensaje.texto}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <ul className="nav nav-tabs profile-tabs mb-4" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link fw-bold ${tabs === 'likes' ? 'active' : ''}`}
                            onClick={() => setTabs('likes')}
                            type="button"
                        >
                            <i className="fas fa-heart me-2" style={{color: '#ef4444'}}></i>
                            Me Gusta ({userData.likes.length})
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link fw-bold ${tabs === 'guardados' ? 'active' : ''}`}
                            onClick={() => setTabs('guardados')}
                            type="button"
                        >
                            <i className="fas fa-bookmark me-2" style={{color: '#f59e0b'}}></i>
                            Guardados ({userData.saves.length})
                        </button>
                    </li>
                </ul>

                {/* Tab: Me Gusta */}
                {tabs === 'likes' && (
                    <div className="profile-content-section">
                        <h5 className="mb-4">
                            <i className="fas fa-heart me-2" style={{color: '#ff4757'}}></i>
                            Códigos que te gustan ({codigosLikeados.length})
                        </h5>
                        
                        {cargando ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        ) : codigosLikeados.length === 0 ? (
                            <div className="empty-state text-center py-5">
                                <i className="fas fa-heart fa-3x mb-3" style={{color: '#ccc'}}></i>
                                <p className="text-muted">Aún no has dado me gusta a ningún código</p>
                            </div>
                        ) : (
                            <div className="row">
                                {codigosLikeados.map(codigo => (
                                    <div key={codigo.id} className="col-md-6 col-lg-4 mb-4">
                                        <Link 
                                            to={`/comunidad/${codigo.id}`} 
                                            style={{textDecoration: 'none', color: 'inherit'}}
                                        >
                                            <div className="favorite-card h-100" style={{cursor: 'pointer', transition: 'all 0.3s ease'}}>
                                                <div className="favorite-card-header">
                                                    <span className="badge bg-info">{codigo.categoria}</span>
                                                    <span className="favorite-icon">
                                                        <i className="fas fa-heart" style={{color: '#ff4757'}}></i>
                                                    </span>
                                                </div>
                                                <h6 className="favorite-card-title">{codigo.titulo}</h6>
                                                <p className="favorite-card-desc">{codigo.descripcion?.substring(0, 80)}...</p>
                                                <div className="favorite-card-footer">
                                                    <small className="text-muted">{codigo.autor}</small>
                                                    <small className="text-muted">{codigo.fecha}</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Tab: Guardados */}
                {tabs === 'guardados' && (
                    <div className="profile-content-section">
                        <h5 className="mb-4">
                            <i className="fas fa-bookmark me-2" style={{color: '#ffa502'}}></i>
                            Códigos guardados ({codigosGuardados.length})
                        </h5>
                        
                        {cargando ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        ) : codigosGuardados.length === 0 ? (
                            <div className="empty-state text-center py-5">
                                <i className="fas fa-bookmark fa-3x mb-3" style={{color: '#ccc'}}></i>
                                <p className="text-muted">Aún no has guardado ningún código</p>
                            </div>
                        ) : (
                            <div className="row">
                                {codigosGuardados.map(codigo => (
                                    <div key={codigo.id} className="col-md-6 col-lg-4 mb-4">
                                        <Link 
                                            to={`/comunidad/${codigo.id}`} 
                                            style={{textDecoration: 'none', color: 'inherit'}}
                                        >
                                            <div className="favorite-card h-100" style={{cursor: 'pointer', transition: 'all 0.3s ease'}}>
                                                <div className="favorite-card-header">
                                                    <span className="badge bg-warning">{codigo.categoria}</span>
                                                    <span className="favorite-icon">
                                                        <i className="fas fa-bookmark" style={{color: '#ffa502'}}></i>
                                                    </span>
                                                </div>
                                                <h6 className="favorite-card-title">{codigo.titulo}</h6>
                                                <p className="favorite-card-desc">{codigo.descripcion?.substring(0, 80)}...</p>
                                                <div className="favorite-card-footer">
                                                    <small className="text-muted">{codigo.autor}</small>
                                                    <small className="text-muted">{codigo.fecha}</small>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Perfil
