export default function Tutorial() {
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Cómo usar los códigos</h1>
      <ol className="mb-4">
        <li>Elige una publicación y copia el bloque de código.</li>
        <li>En Godot, crea el nodo correspondiente (por ejemplo, <code>CharacterBody2D</code>).</li>
        <li>Crea un script GDScript y pega el código.</li>
        <li>Ajusta entradas en <strong>Project Settings → Input Map</strong> (ej: <code>ui_left</code>, <code>ui_right</code>, <code>ui_accept</code>).</li>
        <li>Prueba la escena y ajusta constantes (velocidad, gravedad, etc.).</li>
      </ol>
      <h3>Buenas prácticas</h3>
      <ul>
        <li>Lee la descripción de cada publicación: solemos indicar nodos requeridos.</li>
        <li>Divide tu lógica en funciones pequeñas.</li>
        <li>Usa señales para comunicar nodos (por ejemplo, puertas que escuchan al jugador).</li>
      </ul>
    </div>
  )
}
