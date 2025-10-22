import { Link } from 'react-router-dom'

function Comunidad() {
    return (
        <>
            {/* Header de Comunidad */}
            <section className="py-5 bg-light" style={{ paddingTop: '120px' }}>
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
            <section className="py-5 bg-light">
                <div className="container">
                    <h2 className="fw-bold mb-4">Códigos</h2>

                    {/* Grid de tarjetas (stático por ahora) */}
                    <div className="row mb-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div className="col-lg-4 mb-4" key={i}>
                                <Link to={`/comunidad/${i + 1}`} className="text-decoration-none">
                                    <div className="card h-100 shadow-sm card-hover">
                                        <div className="card-img-top d-flex align-items-center justify-content-center" style={{ height: 200 }}>
                                            <img src="/src/assets/decoracionComunidad.png" alt="Godot Code" style={{ maxHeight: 150 }} />
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <small className="text-muted">Categoría</small>
                                                <small className="text-muted">Oct 12, 2025</small>
                                            </div>
                                            <h5 className="card-title fw-bold">Título de ejemplo #{i + 1}</h5>
                                            <p className="card-text text-muted">Descripción corta del snippet que explica de qué va y cómo se usa en pocas líneas.</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">Autor</small>
                                                <div>
                                                    <span className="me-2"><i className="far fa-heart"></i> 42</span>
                                                    <span><i className="far fa-bookmark"></i> 15</span>
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
                            <h2 className="fw-bold mb-3">¿Quiere publicar tus códigos?</h2>
                            <p className="mb-4">Si quieres ser parte de los creadores de contenido contáctanos y te ayudaremos a gestionar y evaluar para obtener beneficios.</p>
                            <button className="btn btn-light fw-bold px-4 py-2">Contactar</button>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img src="/src/assets/decoracionComunidad.png" alt="Community" style={{ maxWidth: 300 }} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Comunidad
