export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header mb-4">
      <h1 className="display-6 fw-bold mb-2 section-title-gradient">{title}</h1>
      {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
      <hr className="section-divider" />
    </div>
  )
}
