import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import codigoService from '../services/codigoService'
import { codigosData } from '../data/codigosData'
import decoracionComunidad from '../assets/decoracionComunidad.png'

function Comunidad() {
    const [paginaActual, setPaginaActual] = useState(1)
    const [codigos, setCodigos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [busqueda, setBusqueda] = useState('')
    const codigosPorPagina = 9

    // Cargar códigos desde la API
    useEffect(() => {
        cargarCodigos()
    }, [])

    const cargarCodigos = async () => {
        try {
            setCargando(true)
            const datos = await codigoService.obtenerTodos()
            // Si la API no devuelve datos, usar datos locales como fallback
            setCodigos(datos.length > 0 ? datos : codigosData)
            setError(null)
        } catch (err) {
            console.warn('Error al cargar códigos desde API, usando datos locales:', err)
            setCodigos(codigosData)
            setError('Usando datos de ejemplo (API no disponible)')
        } finally {
            setCargando(false)
        }
    }

    const buscarCodigos = async () => {
        if (!busqueda.trim()) {
            cargarCodigos()
            return
        }

        try {
            setCargando(true)
            const resultados = await codigoService.buscarPorTitulo(busqueda)
            setCodigos(resultados)
            setPaginaActual(1)
            setError(null)
        } catch (err) {
            console.error('Error al buscar códigos:', err)
            // Fallback a búsqueda local
            const resultadosLocales = codigosData.filter(c => 
                c.titulo.toLowerCase().includes(busqueda.toLowerCase())
            )
            setCodigos(resultadosLocales)
            setError('Búsqueda local (API no disponible)')
        } finally {
            setCargando(false)
        }
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
                    {error && (
                        <div className="alert alert-warning" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Sección de búsqueda */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="d-flex flex-column flex-sm-row gap-2">
                                <input 
                                    type="text" 
                                    className="form-control flex-grow-1" 
                                    placeholder="Buscar códigos..." 
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && buscarCodigos()}
                                />
                                <button className="btn btn-light" onClick={buscarCodigos}>Buscar</button>
                                {busqueda && (
                                    <button className="btn btn-outline-light" onClick={cargarCodigos}>Limpiar</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Códigos */}
            <section className="comunidad-section">
                <div className="container">
                    <h2 className="fw-bold mb-4">Códigos</h2>

                    {/* Estado de carga */}
                    {cargando ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : codigosActuales.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted">No se encontraron códigos.</p>
                        </div>
                    ) : (
                        <>
                            {/* Grid de tarjetas */}
                            <div className="row mb-4">
                        {codigosActuales.map((codigo) => (
                            <div className="col-12 col-sm-6 col-lg-4 mb-4" key={codigo.id}>
                                <Link to={`/comunidad/${codigo.id}`} className="text-decoration-none">
                                    <div className="card h-100 shadow-sm card-hover">
                                        <div className="card-img-top d-flex align-items-center justify-content-center card-img-container">
                                            <img src={decoracionComunidad} alt="Godot Code" className="card-img-code" />
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
                                                <small className="text-muted">{codigo.categoria}</small>
                                                <small className="text-muted">{codigo.fecha}</small>
                                            </div>
                                            <h5 className="card-title fw-bold">{codigo.titulo}</h5>
                                            <p className="card-text text-muted">{codigo.descripcion}</p>
                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                                <small className="text-muted">{codigo.autor}</small>
                                                <div>
                                                    <span className="me-2"><i className="far fa-heart"></i> {codigo.likes}</span>
                                                    <span><i className="far fa-bookmark"></i> {codigo.guardados}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
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

                    {/* CTA */}
                    <div className="row">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-3">¿Quiere poder publicar tu, tus códigos?</h2>
                            <p className="mb-4">Si quieres ser parte de los creadores de contenido contactanos con nosotros y te ayudaremos a gestionar y evaluar para obtener a qué día beneficio!</p>
                            <button className="btn btn-light fw-bold px-4 py-2">Contactar</button>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img src={decoracionComunidad} alt="Community" className="cta-image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Comunidad
