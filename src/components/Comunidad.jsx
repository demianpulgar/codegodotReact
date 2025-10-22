import { Link } from 'react-router-dom'
import { codigosData } from '../data/codigosData'

function Comunidad() {
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
                        <div className="col-md-6">
                            <div className="d-flex">
                                <input type="text" className="form-control me-2" placeholder="Buscar códigos..." />
                                <button className="btn me-2 btn-light">Filtros</button>
                                <button className="btn btn-light">Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección de Códigos */}
            <section className="comunidad-section">
                <div className="container">
                    <h2 className="fw-bold mb-4">Códigos</h2>

                    {/* Grid de tarjetas */}
                    <div className="row mb-4">
                        {codigosData.map((codigo) => (
                            <div className="col-lg-4 mb-4" key={codigo.id}>
                                <Link to={`/comunidad/${codigo.id}`} className="text-decoration-none">
                                    <div className="card h-100 shadow-sm card-hover">
                                        <div className="card-img-top d-flex align-items-center justify-content-center card-img-container">
                                            <img src="/src/assets/decoracionComunidad.png" alt="Godot Code" className="card-img-code" />
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="text-muted">{codigo.categoria}</small>
                                                <small className="text-muted">{codigo.fecha}</small>
                                            </div>
                                            <h5 className="card-title fw-bold">{codigo.titulo}</h5>
                                            <p className="card-text text-muted">{codigo.descripcion}</p>
                                            <div className="d-flex justify-content-between align-items-center">
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

                    {/* CTA */}
                    <div className="row">
                        <div className="col-lg-6">
                            <h2 className="fw-bold mb-3">¿Quiere poder publicar tu, tus códigos?</h2>
                            <p className="mb-4">Si quieres ser parte de los creadores de contenido contactanos con nosotros y te ayudaremos a gestionar y evaluar para obtener a qué día beneficio!</p>
                            <button className="btn btn-light fw-bold px-4 py-2">Contactar</button>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img src="/src/assets/decoracionComunidad.png" alt="Community" className="cta-image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Comunidad
