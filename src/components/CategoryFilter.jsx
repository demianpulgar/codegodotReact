import { useState, useRef, useEffect } from 'react'
import { categories } from '../data/codigosData'
import '../style/categoryFilter.css'

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange,
  ordenamiento,
  onOrdenamientoChange,
  onClearFilters
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleCategorySelect = (category) => {
    onCategoryChange(category)
  }

  const handleOrdenamientoSelect = (tipo) => {
    onOrdenamientoChange(tipo)
  }

  const tieneFilters = selectedCategory !== null || ordenamiento !== 'reciente'

  return (
    <div className="category-filter-dropdown" ref={dropdownRef}>
      <button
        className={`filter-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <i className="fas fa-sliders-h"></i>
        Filtros
        {tieneFilters && <span className="badge bg-danger ms-2">1</span>}
        <i className="fas fa-chevron-down ms-auto"></i>
      </button>

      <div className={`filter-menu ${isOpen ? 'active' : ''}`} role="menu">
        {/* Sección de Categorías */}
        <div className="filter-section">
          <label className="filter-label">
            <i className="fas fa-tag me-2"></i>Categoría
          </label>
          <div className="filter-options">
            <button
              className={`filter-option ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => handleCategorySelect(null)}
              type="button"
            >
              Todas las categorías
            </button>

            {categories && categories.length > 0 && categories.map((category) => (
              <button
                key={category}
                className={`filter-option ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sección de Ordenamiento */}
        <div className="filter-section">
          <label className="filter-label">
            <i className="fas fa-sort me-2"></i>Ordenar por
          </label>
          <div className="filter-options">
            <button
              className={`filter-option ${ordenamiento === 'reciente' ? 'active' : ''}`}
              onClick={() => handleOrdenamientoSelect('reciente')}
              type="button"
            >
              Más recientes
            </button>
            <button
              className={`filter-option ${ordenamiento === 'fecha-desc' ? 'active' : ''}`}
              onClick={() => handleOrdenamientoSelect('fecha-desc')}
              type="button"
            >
              Fecha más antigua
            </button>
            <button
              className={`filter-option ${ordenamiento === 'likes-desc' ? 'active' : ''}`}
              onClick={() => handleOrdenamientoSelect('likes-desc')}
              type="button"
            >
              Mayor a menor me gusta
            </button>
            <button
              className={`filter-option ${ordenamiento === 'likes-asc' ? 'active' : ''}`}
              onClick={() => handleOrdenamientoSelect('likes-asc')}
              type="button"
            >
              Menor a mayor me gusta
            </button>
            <button
              className={`filter-option ${ordenamiento === 'guardados-desc' ? 'active' : ''}`}
              onClick={() => handleOrdenamientoSelect('guardados-desc')}
              type="button"
            >
              Mayor a menor guardados
            </button>
            <button
              className={`filter-option ${ordenamiento === 'guardados-asc' ? 'active' : ''}`}
              onClick={() => handleOrdenamientoSelect('guardados-asc')}
              type="button"
            >
              Menor a mayor guardados
            </button>
          </div>
        </div>

        {/* Botón Limpiar Filtros */}
        {tieneFilters && (
          <div className="filter-section">
            <button
              className="clear-filters-btn"
              onClick={() => {
                onClearFilters()
                setIsOpen(false)
              }}
              type="button"
            >
              <i className="fas fa-times me-2"></i>Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

