import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { codigosData } from '../data/codigosData'
import { useAuth } from '../context/AuthContext'
import { toggleLike, toggleSave } from '../services/userDataService'
import CategoryFilter from './CategoryFilter'
import CodePreview from './CodePreview'

function Comunidad() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [paginaActual, setPaginaActual] = useState(1)
    const [codigos, setCodigos] = useState(codigosData)
    const [busqueda, setBusqueda] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const codigosPorPagina = 9

    // Filtrado combinado: búsqueda + categoría
    useEffect(() => {
        let filtrados = codigosData

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
    }, [busqueda, selectedCategory])

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

                    {/* Mensaje de estado */}
                    {/* error && (
                        <div className="alert alert-warning" role="alert">
                            {error}
                        </div>
                    ) */}

                    {/* Sección de búsqueda simple */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="d-flex flex-column flex-sm-row gap-2">
                                <input 
                                    type="text" 
                                    className="form-control flex-grow-1" 
                                    placeholder="Buscar por título o descripción..." 
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Códigos */}
            <section className="comunidad-section">
                <div className="container">
                    {/* Filtro de categorías - Dropdown */}
                    <div className="d-flex justify-content-between align-items-flex-start flex-wrap gap-3 mb-4" style={{ position: 'relative', zIndex: '1050' }}>
                        <div style={{ position: 'relative' }}>
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
                    {codigosActuales.length === 0 ? (
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
                            <div className="col-12 col-sm-6 col-lg-4 mb-4" key={codigo.id}>
                                <div className="card h-100 shadow-sm card-hover">
                                    <div className="card-code-preview">
                                        <CodePreview codigo={codigo.código.substring(0, 200)} />
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
                                            <small className="badge bg-info text-dark">{codigo.categoria}</small>
                                            <small className="text-muted">{codigo.fecha}</small>
                                        </div>
                                        <h5 className="card-title fw-bold">{codigo.titulo}</h5>
                                        <p className="card-text text-muted text-truncate">{codigo.descripcion}</p>
                                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                            <small className="text-muted">{codigo.autor}</small>
                                            <Link to={`/comunidad/${codigo.id}`} className="btn btn-sm btn-light fw-bold">
                                                Ver más
                                            </Link>
                                        </div>
                                        <div className="d-flex gap-2 mt-2 flex-wrap">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger flex-grow-1"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (!user) { alert('Inicia sesión para dar me gusta'); navigate('/login'); return }
                                                    toggleLike(user.username, codigo.id)
                                                }}
                                            >
                                                <i className="far fa-heart"></i> {codigo.likes}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-warning flex-grow-1"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    if (!user) { alert('Inicia sesión para guardar'); navigate('/login'); return }
                                                    toggleSave(user.username, codigo.id)
                                                }}
                                            >
                                                <i className="far fa-bookmark"></i> {codigo.guardados}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Paginación */}
                    {totalPaginas > 1 && (
                        <nav className="d-flex justify-content-center mb-5">
                            <ul className="pagination">
                                {/* Botón anterior */}
                                <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => cambiarPagina(paginaActual - 1)}
                                        disabled={paginaActual === 1}
                                    >
                                        Anterior
                                    </button>
                                </li>

                                {/* Números de página */}
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

                                {/* Botón siguiente */}
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
                    <div className="row mt-5">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-3">¿Quieres publicar tus códigos?</h2>
                            <p className="mb-4">Si quieres ser parte de los creadores de contenido contactanos con nosotros y te ayudaremos a gestionar y evaluar para obtener a qué día beneficio!</p>
                            <button className="btn btn-light fw-bold px-4 py-2">Contactar</button>
                        </div>
                        <div className="col-lg-6 text-center">
                            <div className="cta-code-display">
                                <CodePreview codigo={`# Comparte tus mejores snippets\nfunc _ready():\n    print("Únete a CodeGodot")\n    # Y ayuda a otros a aprender`} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Comunidad
