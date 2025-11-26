import { useState, useRef, useEffect } from 'react'
import { categories } from '../data/codigosData'
import '../style/categoryFilter.css'

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
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

  const handleSelect = (category) => {
    onCategoryChange(category)
    setIsOpen(false)
  }

  return (
    <div className="category-filter-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-btn"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <i className="fas fa-filter"></i>
        {selectedCategory ? `Categoría: ${selectedCategory}` : 'Todas las categorías'}
        <i className={`fas fa-chevron-down ms-2 ${isOpen ? 'open' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="dropdown-menu" role="menu">
          <div
            className={`dropdown-item ${selectedCategory === null ? 'active' : ''}`}
            onClick={() => handleSelect(null)}
            role="menuitem"
          >
            Todas las categorías
          </div>

          {categories && categories.length > 0 && categories.map((category) => (
            <div
              key={category}
              className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleSelect(category)}
              role="menuitem"
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

