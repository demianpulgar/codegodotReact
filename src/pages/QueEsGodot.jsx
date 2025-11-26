import SectionHeader from '../components/ui/SectionHeader'
import TOC from '../components/ui/TOC'
import Callout from '../components/ui/Callout'

export default function QueEsGodot() {
  return (
    <section className="page-section">
      <div className="container">
      <SectionHeader title="¿Qué es Godot?" subtitle="Motor de videojuegos libre, potente y accesible para todos" />
      <TOC items={[
        { href: '#que-es', label: 'Resumen' },
        { href: '#caracteristicas', label: 'Características' },
        { href: '#conceptos', label: 'Conceptos clave' },
        { href: '#gdscript', label: 'GDScript' },
        { href: '#recursos', label: 'Recursos' },
      ]} />
      
      <div id="que-es">
        <h3 className="mt-4">Resumen</h3>
        <p className="lead">Godot Engine es un motor de videojuegos libre y de código abierto para 2D y 3D, con una filosofía de nodos y escenas que facilita la creación de juegos de forma modular.</p>
        <p>Desarrollado por una comunidad global, Godot es ideal tanto para principiantes como para desarrolladores experimentados. Su filosofía intuitiva y su lenguaje GDScript hacen que sea fácil aprender, pero lo suficientemente potente para crear juegos AAA.</p>
        <p>Con más de <strong>años de desarrollo</strong> y una comunidad vibrante, Godot ha ganado popularidad entre indie developers y estudios profesionales por su facilidad de uso y flexibilidad.</p>
      </div>

      <div id="caracteristicas">
        <h3 className="mt-4">Características clave</h3>
        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <div className="feature-card">
              <h6>🎮 GDScript</h6>
              <p>Lenguaje intuitivo similar a Python, optimizado para juegos. Fácil de aprender y extremadamente eficiente.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="feature-card">
              <h6>🎨 2D y 3D</h6>
              <p>Soporte nativo para juegos 2D y 3D con renderizador ligero y rápido.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="feature-card">
              <h6>🌍 Multiplataforma</h6>
              <p>Exporta a Windows, Linux, macOS, Web, Android, iOS y consolas.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="feature-card">
              <h6>🆓 Libre y Gratuito</h6>
              <p>Código abierto bajo licencia MIT. Sin costos, sin royalties, sin dependencias.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="feature-card">
              <h6>⚡ Editor integrado</h6>
              <p>Editor visual completo incluido. Crea y depura directamente sin herramientas externas.</p>
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="feature-card">
              <h6>🔌 Sistema de Señales</h6>
              <p>Comunicación entre nodos desacoplada. Elementos se conectan sin dependencias directas.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="conceptos">
        <h3 className="mt-4">Conceptos fundamentales</h3>
        <Callout variant="info" title="Nodos">
          Un nodo es la unidad básica en Godot. Representa cualquier cosa: un personaje, un enemigo, una bala, un efecto de luz, etc. Los nodos tienen propiedades, métodos y pueden recibir señales.
        </Callout>
        <Callout variant="info" title="Escenas">
          Las escenas son colecciones de nodos organizados jerárquicamente. Una escena puede ser un personaje, un nivel completo, un menú, etc. Las escenas son reutilizables e instanciables.
        </Callout>
        <Callout variant="info" title="Señales">
          Las señales permiten que los nodos comuniquen eventos sin acoplamiento directo. Cuando algo importante ocurre, un nodo emite una señal que otros pueden "escuchar" y responder.
        </Callout>
        <Callout variant="success" title="Ejemplo de flujo">
          Un botón emite "pressed" → una escena escucha ese evento → ejecuta código de respuesta. Todo sin que el botón sepa qué hace el código.
        </Callout>
      </div>

      <div id="gdscript">
        <h3 className="mt-4">GDScript: El lenguaje de Godot</h3>
        <p>GDScript es un lenguaje dinámico, tipado y muy parecido a Python. Está totalmente integrado en el editor de Godot y optimizado para desarrollo de juegos.</p>
        
        <div style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', overflow: 'auto', marginTop: '12px', marginBottom: '12px' }}>
          <pre style={{ color: '#e2e8f0', margin: 0, fontSize: '13px' }}>
{`# Ejemplo simple: Script de movimiento
extends CharacterBody2D

const SPEED = 200.0

func _process(delta):
    var direction = Vector2.ZERO
    
    if Input.is_action_pressed("ui_right"):
        direction.x += 1
    if Input.is_action_pressed("ui_left"):
        direction.x -= 1
    if Input.is_action_pressed("ui_down"):
        direction.y += 1
    if Input.is_action_pressed("ui_up"):
        direction.y -= 1
    
    if direction != Vector2.ZERO:
        velocity = direction.normalized() * SPEED
    else:
        velocity = Vector2.ZERO
    
    move_and_slide()`}
          </pre>
        </div>

        <p>Este script habilita movimiento básico del jugador con las flechas del teclado. En CodeGodot encontrarás cientos de snippets como este, listos para copiar y adaptar.</p>
      </div>

      <div id="recursos">
        <h3 className="mt-4">Recursos recomendados</h3>
        <ul>
          <li><a href="https://docs.godotengine.org" target="_blank" rel="noreferrer">Documentación oficial</a> - Referencia completa y tutoriales</li>
          <li><a href="https://godotengine.org" target="_blank" rel="noreferrer">Sitio oficial</a> - Descargas y noticias</li>
          <li><a href="https://github.com/godotengine/godot" target="_blank" rel="noreferrer">Repositorio GitHub</a> - Código fuente y contribuciones</li>
          <li><a href="https://godotengine.org/community" target="_blank" rel="noreferrer">Comunidad</a> - Foros, Discord y otros espacios</li>
        </ul>
      </div>

      <div className="mt-5 p-4" style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', borderRadius: '8px', borderLeft: '4px solid #60a5fa' }}>
        <h5 className="mb-3">Comienza con CodeGodot 🚀</h5>
        <p>Explora cientos de fragmentos de código listos para copiar y pegar. Cada código incluye explicación detallada de cómo usarlo y adaptarlo a tu proyecto.</p>
        <div className="mt-3 d-flex gap-2 flex-wrap">
          <a href="/comunidad" className="btn btn-light fw-bold px-4">Ver Códigos</a>
          <a href="/tutorial" className="btn btn-outline-light fw-bold px-4">Leer Tutorial</a>
        </div>
      </div>
      </div>
    </section>
  )
}
