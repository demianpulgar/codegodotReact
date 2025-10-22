import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function DetalleCode() {
    const { id } = useParams()
    const navigate = useNavigate()

    // Datos completos de todos los códigos
    const todosLosCodigos = [
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

    // Buscar el código correspondiente al ID
    const codigoEjemplo = todosLosCodigos.find(codigo => codigo.id === parseInt(id)) || todosLosCodigos[0]

    // Código de ejemplo (mismo para todos por ahora)
    const codigoGDScript = `extends CharacterBody2D

# Velocidad del personaje
const SPEED = 300.0
const JUMP_VELOCITY = -400.0

# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    # Add the gravity.
    if not is_on_floor():
        velocity.y += gravity * delta

    # Handle jump.
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # Get the input direction and handle the movement/deceleration.
    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()`

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

    const copiarCodigo = () => {
        navigator.clipboard.writeText(codigoGDScript)
        alert('Código copiado al portapapeles!')
    }

    const handleSubmitComentario = (e) => {
        e.preventDefault()
        if (nuevoComentario.trim()) {
            alert('Comentario agregado (funcionalidad pendiente)')
            setNuevoComentario('')
        }
    }

    return (
        <div className="detalle-code-container">
            <div className="container py-5">
                {/* Botón volver */}
                <button onClick={() => navigate('/comunidad')} className="btn btn-outline-light mb-4">
                    ← Volver a Comunidad
                </button>

                {/* Header del código */}
                <div className="code-header mb-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h1 className="fw-bold mb-2">{codigoEjemplo.titulo}</h1>
                            <div className="d-flex gap-3">
                                <span className="badge bg-primary">{codigoEjemplo.categoria}</span>
                                <span className="text-muted">{codigoEjemplo.fecha}</span>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <button 
                                className={`btn ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => setLiked(!liked)}
                            >
                                <i className="far fa-heart"></i> {codigoEjemplo.likes + (liked ? 1 : 0)}
                            </button>
                            <button 
                                className={`btn ${saved ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={() => setSaved(!saved)}
                            >
                                <i className="far fa-bookmark"></i>
                            </button>
                        </div>
                    </div>

                    {/* Autor */}
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <img 
                            src="/src/assets/Logo.png" 
                            alt={codigoEjemplo.autor}
                            className="rounded-circle autor-avatar"
                        />
                        <div>
                            <p className="mb-0 fw-bold">{codigoEjemplo.autor}</p>
                            <small className="text-muted">Desarrollador verificado</small>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <div className="code-description mb-4">
                    <h4 className="fw-bold mb-3">Descripción</h4>
                    <p>{codigoEjemplo.descripcion}</p>
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
                        <code>{codigoGDScript}</code>
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
                                        src="/src/assets/Logo.png" 
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
        </div>
    )
}

export default DetalleCode
