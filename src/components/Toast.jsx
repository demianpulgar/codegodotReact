import { useState, useEffect } from 'react'
import '../style/toast.css'

function Toast({ mensaje, tipo, onClose, duracion = 4000 }) {
    const [mostrar, setMostrar] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setMostrar(false)
            if (onClose) onClose()
        }, duracion)

        return () => clearTimeout(timer)
    }, [duracion, onClose])

    if (!mostrar) return null

    const iconos = {
        success: '✓',
        danger: '✕',
        warning: '!',
        info: 'ℹ'
    }

    const colores = {
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    }

    return (
        <div className={`toast-container toast-${tipo}`} style={{ borderLeft: `4px solid ${colores[tipo]}` }}>
            <div className="toast-content">
                <span className="toast-icon" style={{ color: colores[tipo] }}>
                    {iconos[tipo]}
                </span>
                <div className="toast-text">
                    {mensaje}
                </div>
            </div>
            <div className="toast-progress" style={{ backgroundColor: colores[tipo] }}></div>
        </div>
    )
}

export default Toast
