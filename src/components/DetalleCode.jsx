import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { toggleLike, toggleSave, getUserData } from '../services/userDataService'
import codigoService from '../services/codigoService'
import { codigosData } from '../data/codigosData'
import Logo from '../assets/Logo.svg'
import LoginPromptModal from './LoginPromptModal'

function DetalleCode() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()

    const [codigoActual, setCodigoActual] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    // Cargar código desde la API
    useEffect(() => {
        cargarCodigo()
    }, [id])

    const cargarCodigo = async () => {
        try {
            setCargando(true)
            const datos = await codigoService.obtenerPorId(parseInt(id))
            setCodigoActual(datos)
            setError(null)
        } catch (err) {
            console.warn('Error al cargar código desde API, usando datos locales:', err)
            const codigoLocal = codigosData.find(codigo => codigo.id === parseInt(id)) || codigosData[0]
            setCodigoActual(codigoLocal)
            setError('Usando datos de ejemplo (API no disponible)')
        } finally {
            setCargando(false)
        }
    }

    // Comentarios de ejemplo
    const comentariosEjemplo = [
        {
            id: 1,
            autor: 'GamerDev',
            fecha: 'Oct 13, 2025',
            texto: '¡Excelente código! Me funcionó perfecto para mi plataformer.'
        },
        {
            id: 2,
            autor: 'CodeMaster',
            fecha: 'Oct 14, 2025',
            texto: '¿Podrías agregar un ejemplo con doble salto?'
        }
    ]

    const [nuevoComentario, setNuevoComentario] = useState('')
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [showLoginPrompt, setShowLoginPrompt] = useState(false)
    const [loginAction, setLoginAction] = useState('Dar me gusta')

    useEffect(() => {
        if (user) {
            const data = getUserData(user.username)
            setLiked(data.likes.includes(parseInt(id)))
            setSaved(data.saves.includes(parseInt(id)))
        } else {
            setLiked(false)
            setSaved(false)
        }
    }, [user, id])

    const copiarCodigo = () => {
        if (codigoActual && codigoActual.codigo) {
            navigator.clipboard.writeText(codigoActual.codigo)
            alert('Código copiado al portapapeles!')
        }
    }

    const handleLike = () => {
        if (!user) {
            setLoginAction('dar me gusta a este código')
            setShowLoginPrompt(true)
            return
        }
        const likes = toggleLike(user.username, parseInt(id))
        setLiked(likes.includes(parseInt(id)))
    }

    const handleSave = () => {
        if (!user) {
            setLoginAction('guardar este código')
            setShowLoginPrompt(true)
            return
        }
        const saves = toggleSave(user.username, parseInt(id))
        setSaved(saves.includes(parseInt(id)))
    }

    const handleSubmitComentario = (e) => {
        e.preventDefault()
        if (nuevoComentario.trim()) {
            alert('Comentario agregado (funcionalidad pendiente)')
            setNuevoComentario('')
        }
    }

    if (cargando) {
        return (
            <div className="detalle-code-container">
                <div className="container py-5 text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (!codigoActual) {
        return (
            <div className="detalle-code-container">
                <div className="container py-5 text-center">
                    <h2>Código no encontrado</h2>
                    <button onClick={() => navigate('/comunidad')} className="btn btn-primary mt-3">
                        Volver a Comunidad
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="detalle-code-container">
            <div className="container py-5">
                {/* Botón volver */}
                <button onClick={() => navigate('/comunidad')} className="btn btn-outline-light mb-4">
                    ← Volver a Comunidad
                </button>

                {/* Mensaje de estado */}
                {error && (
                    <div className="alert alert-warning" role="alert">
                        {error}
                    </div>
                )}

                {/* Header del código */}
                <div className="code-header mb-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
                        <div className="w-100">
                            <h1 className="fw-bold mb-2">{codigoActual.titulo}</h1>
                            <div className="d-flex flex-wrap gap-3">
                                <span className="badge bg-primary">{codigoActual.categoria}</span>
                                <span className="text-muted">{codigoActual.fecha}</span>
                            </div>
                        </div>
                        <div className="d-flex gap-2 flex-shrink-0">
                            <button 
                                className={`btn btn-sm ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={handleLike}
                            >
                                <i className="far fa-heart"></i> {codigoActual.likes + (liked ? 1 : 0)}
                            </button>
                            <button 
                                className={`btn btn-sm ${saved ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={handleSave}
                            >
                                <i className="far fa-bookmark"></i>
                            </button>
                        </div>
                    </div>

                    {/* Autor */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <img 
                            src={Logo} 
                            alt={codigoActual.autor}
                            className="rounded-circle autor-avatar"
                        />
                        <div>
                            <p className="mb-0 fw-bold">{codigoActual.autor}</p>
                            <small className="text-muted">Desarrollador verificado</small>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <div className="code-description mb-4">
                    <h4 className="fw-bold mb-3">Descripción</h4>
                    <p>{codigoActual.descripcion}</p>
                </div>

                {/* Bloque de código */}
                <div className="code-block mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h4 className="fw-bold mb-0">Código</h4>
                        <button className="btn btn-outline-light btn-sm" onClick={copiarCodigo}>
                            <i className="far fa-copy"></i> Copiar código
                        </button>
                    </div>
                    <pre className="code-content">
                        <code>{codigoActual.codigo}</code>
                    </pre>
                </div>

                {/* Sección de comentarios */}
                <div className="comments-section">
                    <h4 className="fw-bold mb-4">Comentarios ({comentariosEjemplo.length})</h4>
                    
                    {/* Formulario nuevo comentario */}
                    <form onSubmit={handleSubmitComentario} className="mb-4">
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Escribe un comentario..."
                                value={nuevoComentario}
                                onChange={(e) => setNuevoComentario(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Publicar comentario</button>
                    </form>

                    {/* Lista de comentarios */}
                    <div className="comments-list">
                        {comentariosEjemplo.map((comentario) => (
                            <div key={comentario.id} className="comment-item mb-3">
                                <div className="d-flex gap-2">
                                    <img 
                                        src={Logo} 
                                        alt={comentario.autor}
                                        className="rounded-circle autor-avatar"
                                    />
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <p className="mb-0 fw-bold">{comentario.autor}</p>
                                                <small className="text-muted">{comentario.fecha}</small>
                                            </div>
                                        </div>
                                        <p className="mt-2 mb-0">{comentario.texto}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal de Login */}
            <LoginPromptModal 
                isOpen={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                action={loginAction}
            />
        </div>
    )
}

export default DetalleCode
