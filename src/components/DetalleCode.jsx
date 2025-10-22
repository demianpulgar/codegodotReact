import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function DetalleCode() {
    const { id } = useParams()
    const navigate = useNavigate()

    // Datos de ejemplo - en el futuro esto vendrá de una API o base de datos
    const codigoEjemplo = {
        id: id,
        titulo: `Ejemplo de código #${id}`,
        categoria: 'Movimiento 2D',
        fecha: 'Oct 12, 2025',
        autor: 'DevGodot123',
        descripcion: 'Este código implementa un sistema de movimiento básico para personajes en 2D. Incluye controles suaves, aceleración y desaceleración progresiva para una mejor experiencia de juego.',
        codigo: `extends CharacterBody2D

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

    move_and_slide()`,
        likes: 42,
        guardados: 15,
        comentarios: [
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
    }

    const [nuevoComentario, setNuevoComentario] = useState('')
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)

    const copiarCodigo = () => {
        navigator.clipboard.writeText(codigoEjemplo.codigo)
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
                            className="rounded-circle"
                            style={{width: '40px', height: '40px', objectFit: 'cover'}}
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
                        <code>{codigoEjemplo.codigo}</code>
                    </pre>
                </div>

                {/* Sección de comentarios */}
                <div className="comments-section">
                    <h4 className="fw-bold mb-4">Comentarios ({codigoEjemplo.comentarios.length})</h4>
                    
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
                        {codigoEjemplo.comentarios.map((comentario) => (
                            <div key={comentario.id} className="comment-item mb-3">
                                <div className="d-flex gap-2">
                                    <img 
                                        src="/src/assets/Logo.png" 
                                        alt={comentario.autor}
                                        className="rounded-circle"
                                        style={{width: '40px', height: '40px', objectFit: 'cover'}}
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
