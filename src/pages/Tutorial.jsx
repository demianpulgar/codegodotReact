import SectionHeader from '../components/ui/SectionHeader'
import TOC from '../components/ui/TOC'
import Callout from '../components/ui/Callout'

export default function Tutorial() {
  return (
    <section className="page-section">
      <div className="container">
      <SectionHeader title="Cómo usar los códigos" subtitle="Guía práctica para integrar GDScript en tu proyecto" />
      <TOC items={[
        { href: '#pasos', label: 'Pasos' },
        { href: '#buenas-practicas', label: 'Buenas prácticas' },
      ]} />
      <div id="pasos">
      <ol className="mb-4">
        <li>Elige una publicación y copia el bloque de código.</li>
        <li>En Godot, crea el nodo correspondiente (por ejemplo, <code>CharacterBody2D</code>).</li>
        <li>Crea un script GDScript y pega el código.</li>
        <li>Ajusta entradas en <strong>Project Settings → Input Map</strong> (ej: <code>ui_left</code>, <code>ui_right</code>, <code>ui_accept</code>).</li>
        <li>Prueba la escena y ajusta constantes (velocidad, gravedad, etc.).</li>
      </ol>
      </div>
      <div id="buenas-practicas">
      <h3>Buenas prácticas</h3>
      <ul>
        <li>Lee la descripción de cada publicación: solemos indicar nodos requeridos.</li>
        <li>Divide tu lógica en funciones pequeñas.</li>
        <li>Usa señales para comunicar nodos (por ejemplo, puertas que escuchan al jugador).</li>
      </ul>
      </div>
      <Callout variant="success" title="Tip">
        Si tu proyecto es grande, crea una escena de prueba mínima para validar el comportamiento del código antes de integrarlo en tu juego principal.
      </Callout>
      </div>
    </section>
  )
}
