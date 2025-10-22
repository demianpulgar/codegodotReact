import { Link } from 'react-router-dom'

function Comunidad() {
    // Datos reales de las tarjetas
    const codigosData = [
        {
            id: 1,
            titulo: 'Configuracion de movimiento de personaje en 2D',
            descripcion: 'La configuracion de un personaje para moverle es fundamental y lo principal muchos juegos, por eso aqui presentamos un codigo simple para configurar tu personaje.',
            categoria: 'Movimiento',
            fecha: 'Oct 12, 2025',
            autor: 'codeGodot',
            likes: 42,
            guardados: 15
        },
        {
            id: 2,
            titulo: 'Interacion personaje con puertas',
            descripcion: 'Sistema de interacción que permite al jugador abrir puertas al presionar una tecla. Incluye detección de colisiones y señales para comunicarse con otros objetos del juego.',
            categoria: 'Interacción',
            fecha: 'Sep 28, 2025',
            autor: 'Marcus Johnson',
            likes: 38,
            guardados: 12
        },
        {
            id: 3,
            titulo: 'Ciclo día/noche',
            descripcion: 'Implementa un sistema dinámico de día y noche que cambia automáticamente la iluminación del juego. Perfecto para crear atmósferas inmersivas y mecánicas temporales.',
            categoria: 'Mundo',
            fecha: 'Oct 5, 2025',
            autor: 'Elena Wong',
            likes: 56,
            guardados: 23
        },
        {
            id: 4,
            titulo: 'Generacion de enemigos basico',
            descripcion: 'Sistema automático de generación de enemigos con intervalos de tiempo configurables. Spawnnea enemigos en posiciones aleatorias para crear desafíos constantes al jugador.',
            categoria: 'Combate',
            fecha: 'Ene 16, 2025',
            autor: 'codeGodot',
            likes: 67,
            guardados: 31
        },
        {
            id: 5,
            titulo: 'Zoom dinámico',
            descripcion: 'Control de cámara con zoom suave usando la rueda del mouse. Incluye límites configurables de zoom máximo y mínimo para mantener una experiencia de juego equilibrada.',
            categoria: 'Cámara',
            fecha: 'Mar 1, 2025',
            autor: 'codeGodot',
            likes: 44,
            guardados: 18
        },
        {
            id: 6,
            titulo: 'Musica segun interacciones',
            descripcion: 'Sistema de audio dinámico que cambia la música de fondo según las acciones del jugador. Incluye transiciones suaves entre diferentes pistas musicales.',
            categoria: 'Audio',
            fecha: 'Feb 12, 2025',
            autor: 'codeGodot',
            likes: 51,
            guardados: 22
        },
        {
            id: 7,
            titulo: 'Menu de inicio',
            descripcion: 'Interfaz de menú principal completa con botones para iniciar juego, configuraciones y salir. Incluye navegación entre escenas y gestión de eventos de botones.',
            categoria: 'UI / Interfaz',
            fecha: 'Jul 30, 2025',
            autor: 'codeGodot',
            likes: 39,
            guardados: 16
        }
    ]

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
