export default function TOC({ items }) {
  return (
    <nav className="toc mb-4">
      <div className="toc-title">Contenido</div>
      <ul className="toc-list">
        {items.map((it) => (
          <li key={it.href}><a href={it.href}>{it.label}</a></li>
        ))}
      </ul>
    </nav>
  )
}
