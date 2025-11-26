import SectionHeader from '../components/ui/SectionHeader'
import TOC from '../components/ui/TOC'
import Callout from '../components/ui/Callout'

export default function QueEsGodot() {
  return (
    <section className="page-section">
      <div className="container">
      <SectionHeader title="¿Qué es Godot?" subtitle="Introducción rápida para principiantes" />
      <TOC items={[
        { href: '#que-es', label: 'Resumen' },
        { href: '#caracteristicas', label: 'Características' },
        { href: '#recursos', label: 'Recursos' },
      ]} />
      <div id="que-es">
      <p>Godot Engine es un motor de videojuegos libre y de código abierto para 2D y 3D, con una filosofía de nodos y escenas que facilita la creación de juegos de forma modular.</p>
      </div>
      <div id="caracteristicas">
      <h3 className="mt-4">Características clave</h3>
      <ul>
        <li>Lenguaje GDScript, similar a Python, pensado para juegos.</li>
        <li>Soporte para 2D y 3D con un editor ligero.</li>
        <li>Sistema de señales para comunicar nodos de forma sencilla.</li>
        <li>Exportación a múltiples plataformas (Windows, Linux, Web, Android, iOS).</li>
      </ul>
      </div>
      <div id="recursos">
      <h3 className="mt-4">Recursos recomendados</h3>
      <ul>
        <li><a href="https://docs.godotengine.org" target="_blank" rel="noreferrer">Documentación oficial</a></li>
        <li><a href="https://godotengine.org" target="_blank" rel="noreferrer">Sitio oficial</a></li>
      </ul>
      </div>
      <Callout title="Siguiente paso">
        En CodeGodot te damos fragmentos listos para usar y una guía para integrarlos rápido en tu proyecto. Revisa el <a href="/tutorial">tutorial</a> para integrarlos.
      </Callout>
      </div>
    </section>
  )
}
