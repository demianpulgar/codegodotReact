import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import codigoService from '../services/codigoService'
import { useAuth } from '../context/AuthContext'
import { toggleLike, toggleSave, getUserData } from '../services/userDataService'
import CategoryFilter from './CategoryFilter'
import CodePreview from './CodePreview'
import LoginPromptModal from './LoginPromptModal'

function Comunidad() {
    const { user } = useAuth()
    const [paginaActual, setPaginaActual] = useState(1)
    const [codigosOriginales, setCodigosOriginales] = useState([])
    const [codigos, setCodigos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [showLoginPrompt, setShowLoginPrompt] = useState(false)
    const [loginAction, setLoginAction] = useState('Dar me gusta')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [userLikesState, setUserLikesState] = useState(new Set())
    const [userSavesState, setUserSavesState] = useState(new Set())
    const [ordenamiento, setOrdenamiento] = useState('reciente')
    const codigosPorPagina = 9

    // Cargar datos desde la API
    useEffect(() => {
        const cargarCodigos = async () => {
            try {
                setCargando(true)
                const datos = await codigoService.obtenerTodos()
                setCodigosOriginales(datos)
                setCodigos(datos)
                setError(null)
            } catch (err) {
                console.error('Error cargando códigos desde API:', err)
                setError('Error al cargar los códigos. Por favor, intenta más tarde.')
                setCodigos([])
            } finally {
                setCargando(false)
            }
        }
        cargarCodigos()
    }, [])

    // Actualizar estado de likes y guardados cuando cambia el usuario
    useEffect(() => {
        if (user) {
            const userData = getUserData(user.username)
            setUserLikesState(new Set(userData.likes))
            setUserSavesState(new Set(userData.saves))
        }
    }, [user])

    // Filtrado combinado: búsqueda + categoría + ordenamiento
    useEffect(() => {
        if (!codigosOriginales || codigosOriginales.length === 0) {
            setCodigos([])
            return
        }

        let filtrados = [...codigosOriginales]

        // Aplicar filtro de categoría
        if (selectedCategory) {
            filtrados = filtrados.filter(c => c.categoria === selectedCategory)
        }

        // Aplicar búsqueda
        if (busqueda.trim()) {
            const query = busqueda.toLowerCase()
            filtrados = filtrados.filter(c =>
                c.titulo.toLowerCase().includes(query) ||
                c.descripcion.toLowerCase().includes(query)
            )
        }

        // Aplicar ordenamiento
        switch(ordenamiento) {
            case 'likes-desc':
                filtrados.sort((a, b) => (b.likes || 0) - (a.likes || 0))
                break
            case 'likes-asc':
                filtrados.sort((a, b) => (a.likes || 0) - (b.likes || 0))
                break
            case 'guardados-desc':
                filtrados.sort((a, b) => (b.guardados || 0) - (a.guardados || 0))
                break
            case 'guardados-asc':
                filtrados.sort((a, b) => (a.guardados || 0) - (b.guardados || 0))
                break
            case 'fecha-desc':
                // Más antiguo primero (fecha menor = más viejo)
                filtrados.sort((a, b) => {
                    const fechaA = a.fecha ? new Date(a.fecha).getTime() : 0
                    const fechaB = b.fecha ? new Date(b.fecha).getTime() : 0
                    return fechaA - fechaB
                })
                break
            case 'reciente':
            default:
                // Más reciente primero (fecha mayor = más nuevo)
                filtrados.sort((a, b) => {
                    const fechaA = a.fecha ? new Date(a.fecha).getTime() : 0
                    const fechaB = b.fecha ? new Date(b.fecha).getTime() : 0
                    return fechaB - fechaA
                })
                break
        }

        setCodigos(filtrados)
        setPaginaActual(1)
    }, [busqueda, selectedCategory, codigosOriginales, ordenamiento])

    // Limpiar búsqueda y filtros
    const limpiarFiltros = () => {
        setBusqueda('')
        setSelectedCategory(null)
        setOrdenamiento('reciente')
        setPaginaActual(1)
    }
    
    // Calcular índices para la paginación
    const indiceUltimo = paginaActual * codigosPorPagina
    const indicePrimero = indiceUltimo - codigosPorPagina
    const codigosActuales = codigos.slice(indicePrimero, indiceUltimo)
    
    // Calcular número total de páginas
    const totalPaginas = Math.ceil(codigos.length / codigosPorPagina)
    
    // Cambiar de página
    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Manejadores con modal de login
    const handleLike = async (codigo) => {
        // Verificar si hay usuario en localStorage
        const usuarioLocal = localStorage.getItem('usuarioLogeado')
        const usuarioActivo = user || (usuarioLocal ? JSON.parse(usuarioLocal) : null)
        
        if (!usuarioActivo) {
            setLoginAction('dar me gusta a este código')
            setShowLoginPrompt(true)
            return
        }
        const yaLeGusta = userLikesState.has(codigo.id)
        const increment = !yaLeGusta
        const likesUsuario = toggleLike(usuarioActivo.username, codigo.id)
        setUserLikesState(new Set(likesUsuario))
        actualizarContadorLocal(codigo.id, 'likes', increment)

        try {
            await codigoService.actualizarLikes(codigo.id, increment)
        } catch (err) {
            console.error('Error actualizando likes en servidor:', err)
            // revertir cambios locales
            const revertLikes = toggleLike(usuarioActivo.username, codigo.id)
            setUserLikesState(new Set(revertLikes))
            actualizarContadorLocal(codigo.id, 'likes', !increment)
            setError('No pudimos actualizar tu like. Intenta nuevamente.')
        }
    }

    const handleSave = async (codigo) => {
        // Verificar si hay usuario en localStorage
        const usuarioLocal = localStorage.getItem('usuarioLogeado')
        const usuarioActivo = user || (usuarioLocal ? JSON.parse(usuarioLocal) : null)
        
        if (!usuarioActivo) {
            setLoginAction('guardar este código')
            setShowLoginPrompt(true)
            return
        }
        const yaGuardado = userSavesState.has(codigo.id)
        const increment = !yaGuardado
        const savesUsuario = toggleSave(usuarioActivo.username, codigo.id)
        setUserSavesState(new Set(savesUsuario))
        actualizarContadorLocal(codigo.id, 'guardados', increment)

        try {
            await codigoService.actualizarGuardados(codigo.id, increment)
        } catch (err) {
            console.error('Error actualizando guardados en servidor:', err)
            const revertSaves = toggleSave(usuarioActivo.username, codigo.id)
            setUserSavesState(new Set(revertSaves))
            actualizarContadorLocal(codigo.id, 'guardados', !increment)
            setError('No pudimos actualizar tus guardados. Intenta nuevamente.')
        }
    }

    const actualizarContadorLocal = (codigoId, campo, increment) => {
        setCodigos(prev => prev.map(item => {
            if (item.id !== codigoId) return item
            const valorActual = item[campo] ?? 0
            return {
                ...item,
                [campo]: Math.max(0, valorActual + (increment ? 1 : -1))
            }
        }))
        setCodigosOriginales(prev => prev.map(item => {
            if (item.id !== codigoId) return item
            const valorActual = item[campo] ?? 0
            return {
                ...item,
                [campo]: Math.max(0, valorActual + (increment ? 1 : -1))
            }
        }))
    }

    // Verificar si un código tiene like del usuario actual
    const isLiked = (codigoId) => userLikesState.has(codigoId)
    
    // Verificar si un código está guardado del usuario actual
    const isSaved = (codigoId) => userSavesState.has(codigoId)

    return (
        <>
            {/* Header de Comunidad */}
            <section className="comunidad-header">
                <div className="container text-center">
                    <h1 className="fw-bold mb-3">Comunidad</h1>
                    <p className="mb-4">
                        Aquí podrás visualizar, dar "Like", y guardar los códigos que te interesen.
                        <br />
                        Podrás buscar por lo que te interesa, los gustos que te apasionen y ahorrar todo el tiempo del mundo :). 
                    </p>

                    {/* Sección de búsqueda */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 col-md-10 col-lg-8">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar por título o descripción..." 
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Códigos */}
            <section className="comunidad-section">
                <div className="container">
                    {/* Filtro de categorías y ordenamiento */}
                    <div className="row align-items-start mb-4">
                        <div className="col-12 col-md-8 mb-3 mb-md-0">
                            <CategoryFilter 
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                                ordenamiento={ordenamiento}
                                onOrdenamientoChange={setOrdenamiento}
                                onClearFilters={() => {
                                    setBusqueda('')
                                    setSelectedCategory(null)
                                    setOrdenamiento('reciente')
                                    setPaginaActual(1)
                                }}
                            />
                        </div>
                        <div className="col-12 col-md-4">
                            {(busqueda || selectedCategory || ordenamiento !== 'reciente') && (
                                <button 
                                    className="btn btn-outline-danger btn-sm w-100"
                                    onClick={limpiarFiltros}
                                >
                                    <i className="fas fa-times"></i> Limpiar todo
                                </button>
                            )}
                        </div>
                    </div>

                    <h2 className="fw-bold mb-4">
                        Códigos 
                        {selectedCategory && <span className="text-info ms-2">({selectedCategory})</span>}
                        {codigos.length > 0 && <span className="text-muted ms-2">({codigos.length} total)</span>}
                    </h2>

                    {/* Estado de carga */}
                    {cargando ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="text-muted mt-3">Cargando códigos desde el servidor...</p>
                        </div>
                    ) : error ? (
                        <div className="alert alert-danger text-center py-5" role="alert">
                            <i className="fas fa-exclamation-circle"></i> {error}
                        </div>
                    ) : codigosActuales.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted fs-5">
                                {busqueda || selectedCategory 
                                    ? '❌ No se encontraron códigos con esos filtros.'
                                    : '❌ No hay códigos disponibles.'
                                }
                            </p>
                            {(busqueda || selectedCategory) && (
                                <button className="btn btn-light mt-3" onClick={limpiarFiltros}>
                                    Mostrar todos los códigos
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {/* Grid de tarjetas */}
                            <div className="row mb-4">
                                {codigosActuales.map((codigo) => (
                                    codigo && codigo.id ? (
                                        <div className="col-12 col-sm-6 col-lg-4 mb-4" key={codigo.id}>
                                            <div className="card h-100 shadow-sm card-hover" style={{cursor: 'pointer', transition: 'all 0.3s ease'}}>
                                                <div className="card-code-preview" onClick={() => window.location.href = '#/comunidad/' + codigo.id}>
                                                    <CodePreview codigo={codigo.codigo ? codigo.codigo.substring(0, 200) : ''} />
                                                </div>
                                                <div className="card-body d-flex flex-column" onClick={() => window.location.href = '#/comunidad/' + codigo.id} style={{cursor: 'pointer'}}>
                                                    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                                                        <small className="badge bg-info text-dark flex-shrink-0">{codigo.categoria || 'Sin categoría'}</small>
                                                        <small className="text-muted text-end flex-shrink-0">{codigo.fecha || 'Sin fecha'}</small>
                                                    </div>
                                                    <h5 className="card-title fw-bold mb-2" style={{minHeight: '3rem', display: 'flex', alignItems: 'center'}}>{codigo.titulo || 'Sin título'}</h5>
                                                    <p className="card-text text-muted flex-grow-1 mb-3" style={{minHeight: '4rem'}}>
                                                        {codigo.descripcion ? codigo.descripcion.substring(0, 80) + '...' : 'Sin descripción'}
                                                    </p>
                                                    <div className="d-flex justify-content-between align-items-center mb-3 pt-2 border-top border-secondary">
                                                        <small className="text-muted">{codigo.autor || 'Anónimo'}</small>
                                                        <Link to={`/comunidad/${codigo.id}`} className="btn btn-sm btn-light fw-bold">
                                                            Ver más
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-0 d-grid gap-2">
                                                    <button
                                                        type="button"
                                                        className={`btn btn-sm fw-bold ${isLiked(codigo.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                                                        onClick={() => handleLike(codigo)}
                                                    >
                                                        <i className={`${isLiked(codigo.id) ? 'fas' : 'far'} fa-heart me-1`}></i> Me gusta ({codigo.likes || 0})
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className={`btn btn-sm fw-bold ${isSaved(codigo.id) ? 'btn-warning' : 'btn-outline-warning'}`}
                                                        onClick={() => handleSave(codigo)}
                                                    >
                                                        <i className={`${isSaved(codigo.id) ? 'fas' : 'far'} fa-bookmark me-1`}></i> Guardar ({codigo.guardados || 0})
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                ))}
                            </div>

                            {/* Paginación */}
                            {totalPaginas > 1 && (
                                <nav className="d-flex justify-content-center mb-5">
                                    <ul className="pagination">
                                        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => cambiarPagina(paginaActual - 1)}
                                                disabled={paginaActual === 1}
                                            >
                                                Anterior
                                            </button>
                                        </li>

                                        {[...Array(totalPaginas)].map((_, index) => (
                                            <li 
                                                key={index + 1} 
                                                className={`page-item ${paginaActual === index + 1 ? 'active' : ''}`}
                                            >
                                                <button 
                                                    className="page-link" 
                                                    onClick={() => cambiarPagina(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}

                                        <li className={`page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => cambiarPagina(paginaActual + 1)}
                                                disabled={paginaActual === totalPaginas}
                                            >
                                                Siguiente
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </>
                    )}

                    {/* CTA Section */}
                    <div className="row mt-5 pt-5 border-top border-secondary">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-3">¿Quieres publicar tus códigos?</h2>
                            <p className="text-muted mb-4">
                                Si quieres ser parte de los creadores de contenido, contáctanos con nosotros y te ayudaremos a gestionar y evaluar para obtener a qué día beneficio!
                            </p>
                            <button className="btn btn-light fw-bold px-4 py-2">
                                Contactar
                            </button>
                        </div>
                        <div className="col-lg-6">
                            <div className="cta-code-display">
                                <CodePreview codigo={`# Comparte tus mejores snippets\nfunc _ready():\n    print("Únete a CodeGodot")\n    # Y ayuda a otros a aprender`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Modal de Login */}
            <LoginPromptModal 
                isOpen={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
                action={loginAction}
            />
        </>
    )
}

export default Comunidad
