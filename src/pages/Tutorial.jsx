import SectionHeader from '../components/ui/SectionHeader'
import TOC from '../components/ui/TOC'
import Callout from '../components/ui/Callout'

export default function Tutorial() {
  return (
    <section className="page-section">
      <div className="container">
      <SectionHeader title="Cómo usar los códigos" subtitle="Guía práctica paso a paso para integrar GDScript en tu proyecto" />
      <TOC items={[
        { href: '#inicio-rapido', label: 'Inicio rápido' },
        { href: '#pasos-detallados', label: 'Pasos detallados' },
        { href: '#editores', label: 'Configuración del editor' },
        { href: '#troubleshooting', label: 'Solución de problemas' },
        { href: '#buenas-practicas', label: 'Buenas prácticas' },
      ]} />
      
      <div id="inicio-rapido">
        <h3>Inicio rápido (5 minutos)</h3>
        <ol>
          <li>Elige un código que te interese en <a href="/comunidad">Comunidad</a></li>
          <li>Haz clic en el código para copiar</li>
          <li>En Godot, crea el nodo sugerido (ej: <code>CharacterBody2D</code>)</li>
          <li>Crea un nuevo script y pega el código</li>
          <li>Presiona F5 para probar (o clic en ▶ Play)</li>
        </ol>
      </div>

      <div id="pasos-detallados">
        <h3>Pasos detallados</h3>
        
        <h5 className="mt-4">1. Crear un nuevo proyecto en Godot</h5>
        <p>Abre Godot y crea un nuevo proyecto. Elige la plantilla que desees (2D o 3D según el código).</p>
        
        <h5 className="mt-4">2. Entender la estructura del código</h5>
        <p>Cada publicación en CodeGodot incluye:</p>
        <ul>
          <li><strong>Tipo de nodo:</strong> El nodo padre que necesitas (ej: Node2D, CharacterBody2D)</li>
          <li><strong>Dependencias:</strong> Nodos hijos requeridos (ej: AnimatedSprite2D, CollisionShape2D)</li>
          <li><strong>Entradas requeridas:</strong> Qué teclas/botones usa el script</li>
          <li><strong>Constantes:</strong> Valores que puedes ajustar (velocidad, gravedad, etc.)</li>
        </ul>

        <Callout variant="info" title="Ejemplo: Script de movimiento">
          <p className="mb-2">Un script que mueve un personaje requiere:</p>
          <ul className="mb-0" style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
            <li>Nodo padre: <code>CharacterBody2D</code></li>
            <li>Nodo hijo: <code>CollisionShape2D</code> (con forma cápsula)</li>
            <li>Entradas: <code>ui_left</code>, <code>ui_right</code>, <code>ui_up</code>, <code>ui_down</code></li>
            <li>Constantes: <code>SPEED = 200.0</code>, <code>GRAVITY = 980.0</code></li>
          </ul>
        </Callout>

        <h5 className="mt-4">3. Crear el nodo en Godot</h5>
        <ol>
          <li>En la escena, clic derecho → "Add Child Node"</li>
          <li>Busca el tipo de nodo (ej: CharacterBody2D)</li>
          <li>Selecciona y crea el nodo</li>
          <li>Crea los nodos hijos necesarios de la misma forma</li>
        </ol>

        <h5 className="mt-4">4. Crear y pegar el script</h5>
        <p>Selecciona el nodo padre, luego:</p>
        <ol>
          <li>Clic derecho en el nodo → "Attach Script"</li>
          <li>Elige guardar en la carpeta que desees</li>
          <li>Se abrirá el editor de scripts (vacío)</li>
          <li>Borra el contenido y pega el código de CodeGodot</li>
          <li>Presiona Ctrl+S para guardar</li>
        </ol>

        <div style={{ background: '#1e293b', padding: '16px', borderRadius: '8px', overflow: 'auto', marginTop: '12px', marginBottom: '12px' }}>
          <pre style={{ color: '#e2e8f0', margin: 0, fontSize: '13px' }}>
{`# Estructura típica de un script GDScript
extends CharacterBody2D

const SPEED = 200.0
const GRAVITY = 980.0

func _process(delta):
    # Captura entrada del jugador
    var direction = Vector2.ZERO
    # ... resto del código
    
func _physics_process(delta):
    # Actualiza física
    move_and_slide()`}
          </pre>
        </div>

        <h5 className="mt-4">5. Configurar entradas (Input Map)</h5>
        <p>Muchos scripts usan acciones como <code>ui_left</code>, <code>ui_accept</code>, etc. Godot ya tiene algunas configuradas por defecto, pero puedes personalizarlas:</p>
        <ol>
          <li>Ve a Project → Project Settings → Input Map</li>
          <li>Busca la acción que necesita tu script</li>
          <li>Si no existe, haz clic en "+ Add Item"</li>
          <li>Asigna la tecla deseada (clic en el botón vacío y presiona la tecla)</li>
        </ol>

        <Callout variant="success" title="Acciones predefinidas en Godot">
          <ul className="mb-0">
            <li><code>ui_up</code>, <code>ui_down</code>, <code>ui_left</code>, <code>ui_right</code> - Flechas o WASD</li>
            <li><code>ui_accept</code> - Espacio o Enter</li>
            <li><code>ui_cancel</code> - Escape</li>
          </ul>
        </Callout>

        <h5 className="mt-4">6. Ajustar constantes</h5>
        <p>Cada script tiene constantes al principio que puedes modificar:</p>
        <ul>
          <li><strong>SPEED:</strong> Qué tan rápido se mueve (en píxeles/seg)</li>
          <li><strong>ACCELERATION:</strong> Cuán rápido acelera</li>
          <li><strong>GRAVITY:</strong> Fuerza de gravedad</li>
          <li><strong>JUMP_FORCE:</strong> Fuerza del salto</li>
        </ul>
        <p>Puedes cambiar estos valores directamente en el script y ver los cambios al ejecutar.</p>

        <h5 className="mt-4">7. Probar el código</h5>
        <p>Selecciona la escena y presiona F5 (o el botón Play en la esquina superior derecha). El juego ejecutará y podrás ver el comportamiento.</p>
        
        <p className="mt-3"><strong>Si algo no funciona:</strong> Revisa la consola (abajo del editor) para ver mensajes de error.</p>
      </div>

      <div id="editores">
        <h3>Configuración recomendada del editor</h3>
        
        <div className="feature-card">
          <h6>Fuente de código</h6>
          <p>Ve a Editor → Editor Layout → Toggle Debug Bottom Panel para ver errores durante pruebas.</p>
        </div>
        
        <div className="feature-card mt-3">
          <h6>Ayuda interactiva</h6>
          <p>En el editor de scripts, presiona Ctrl+Espacio para autocompletar y ver sugerencias de funciones GDScript.</p>
        </div>

        <div className="feature-card mt-3">
          <h6>Depuración</h6>
          <p>Usa <code>print()</code> en tu código para ver información en la consola: <code className="text-light">print("Velocidad: ", velocity)</code></p>
        </div>
      </div>

      <div id="troubleshooting">
        <h3>Solución de problemas comunes</h3>
        
        <Callout variant="warning" title="Error: 'Nodo no encontrado'">
          <p className="mb-0">Verifica que los nodos hijos existan y tengan el nombre correcto. El script intenta acceder a nodos como <code>$CollisionShape2D</code> o <code>$Sprite</code>.</p>
        </Callout>

        <Callout variant="warning" title="Las teclas no funcionan">
          <p className="mb-0">Revisa que las acciones en Input Map existan. Ve a Project Settings → Input Map y busca la acción (ej: <code>ui_left</code>).</p>
        </Callout>

        <Callout variant="warning" title="El personaje se cae infinitamente">
          <p className="mb-0">Esto es normal sin una escena de suelo. Crea un nodo <code>StaticBody2D</code> con un <code>CollisionShape2D</code> para que el jugador colisione con algo.</p>
        </Callout>

        <Callout variant="info" title="La animación no se ve">
          <p className="mb-0">Asegúrate de que el nodo <code>AnimatedSprite2D</code> tenga una animación asignada en sus propiedades. Carga imágenes y crea fotogramas.</p>
        </Callout>
      </div>

      <div id="buenas-practicas">
        <h3>Buenas prácticas</h3>
        <ul>
          <li><strong>Lee primero:</strong> Siempre lee la descripción completa de cada código. Indica requisitos, constantes y ejemplos de uso.</li>
          <li><strong>Pequeñas pruebas:</strong> Crea una escena de prueba antes de integrar en tu proyecto principal.</li>
          <li><strong>Documenta cambios:</strong> Si modificas un código, añade comentarios explicando qué cambiaste.</li>
          <li><strong>Usa señales:</strong> Para comunicar entre nodos, usa señales en lugar de referencias directas.</li>
          <li><strong>Gestiona constantes:</strong> Los valores importantes (velocidad, daño, etc.) deben ser constantes en la parte superior del script.</li>
          <li><strong>Optimiza después:</strong> Primero haz que funcione, después optimiza rendimiento si es necesario.</li>
        </ul>
      </div>

      <Callout variant="success" title="¡Listo para empezar!">
        <p className="mb-2">Ahora que sabes cómo integrar códigos, ve a <a href="/comunidad">Comunidad</a> y elige el que te interese.</p>
        <p className="mb-0">Empieza por códigos simples como "Movimiento básico del jugador" y ve aumentando la complejidad.</p>
      </Callout>
      </div>
    </section>
  )
}
