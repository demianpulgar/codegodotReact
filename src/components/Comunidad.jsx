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

    // Filtrado combinado: búsqueda + categoría
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

        setCodigos(filtrados)
        setPaginaActual(1)
    }, [busqueda, selectedCategory, codigosOriginales])

    // Limpiar búsqueda y filtros
    const limpiarFiltros = () => {
        setBusqueda('')
        setSelectedCategory(null)
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
    const handleLike = (codigo) => {
        // Verificar si hay usuario en localStorage
        const usuarioLocal = localStorage.getItem('usuarioLogeado')
        const usuarioActivo = user || (usuarioLocal ? JSON.parse(usuarioLocal) : null)
        
        if (!usuarioActivo) {
            setLoginAction('dar me gusta a este código')
            setShowLoginPrompt(true)
            return
        }
        toggleLike(usuarioActivo.username, codigo.id)
        // Actualizar estado local
        const newLikes = new Set(userLikesState)
        if (newLikes.has(codigo.id)) {
            newLikes.delete(codigo.id)
        } else {
            newLikes.add(codigo.id)
        }
        setUserLikesState(newLikes)
    }

    const handleSave = (codigo) => {
        // Verificar si hay usuario en localStorage
        const usuarioLocal = localStorage.getItem('usuarioLogeado')
        const usuarioActivo = user || (usuarioLocal ? JSON.parse(usuarioLocal) : null)
        
        if (!usuarioActivo) {
            setLoginAction('guardar este código')
            setShowLoginPrompt(true)
            return
        }
        toggleSave(usuarioActivo.username, codigo.id)
        // Actualizar estado local
        const newSaves = new Set(userSavesState)
        if (newSaves.has(codigo.id)) {
            newSaves.delete(codigo.id)
        } else {
            newSaves.add(codigo.id)
        }
        setUserSavesState(newSaves)
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
                    {/* Filtro de categorías */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                        <div>
                            <CategoryFilter 
                                selectedCategory={selectedCategory}
                                onCategoryChange={setSelectedCategory}
                            />
                        </div>
                        {(busqueda || selectedCategory) && (
                            <button 
                                className="btn btn-outline-light btn-sm"
                                onClick={limpiarFiltros}
                            >
                                <i className="fas fa-times"></i> Limpiar filtros
                            </button>
                        )}
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
                                            <div className="card h-100 shadow-sm card-hover">
                                                <div className="card-code-preview">
                                                    <CodePreview codigo={codigo.codigo ? codigo.codigo.substring(0, 200) : ''} />
                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                                                        <small className="badge bg-info text-dark">{codigo.categoria || 'Sin categoría'}</small>
                                                        <small className="text-muted">{codigo.fecha || 'Sin fecha'}</small>
                                                    </div>
                                                    <h5 className="card-title fw-bold">{codigo.titulo || 'Sin título'}</h5>
                                                    <p className="card-text text-muted">
                                                        {codigo.descripcion ? codigo.descripcion.substring(0, 80) + '...' : 'Sin descripción'}
                                                    </p>
                                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                                                        <small className="text-muted">{codigo.autor || 'Anónimo'}</small>
                                                        <Link to={`/comunidad/${codigo.id}`} className="btn btn-sm btn-light fw-bold">
                                                            Ver más
                                                        </Link>
                                                    </div>
                                                    <div className="d-flex gap-2 flex-wrap">
                                                        <button
                                                            type="button"
                                                            className={`btn btn-sm flex-grow-1 ${isLiked(codigo.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                                                            onClick={() => handleLike(codigo)}
                                                        >
                                                            <i className={`${isLiked(codigo.id) ? 'fas' : 'far'} fa-heart`}></i> {codigo.likes || 0}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className={`btn btn-sm flex-grow-1 ${isSaved(codigo.id) ? 'btn-warning' : 'btn-outline-warning'}`}
                                                            onClick={() => handleSave(codigo)}
                                                        >
                                                            <i className={`${isSaved(codigo.id) ? 'fas' : 'far'} fa-bookmark`}></i> {codigo.guardados || 0}
                                                        </button>
                                                    </div>
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
