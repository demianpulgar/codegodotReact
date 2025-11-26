import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/loginPromptModal.css'

export default function LoginPromptModal({ isOpen, onClose, action = 'Dar me gusta' }) {
  const navigate = useNavigate()
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 300)
  }

  const handleLogin = () => {
    handleClose()
    navigate('/login')
  }

  const handleRegister = () => {
    handleClose()
    navigate('/registro')
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay oscuro */}
      <div 
        className={`login-prompt-overlay ${isClosing ? 'closing' : ''}`}
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`login-prompt-modal ${isClosing ? 'closing' : ''}`}>
        <button 
          className="close-btn"
          onClick={handleClose}
          aria-label="Cerrar modal"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="modal-content">
          {/* Icono */}
          <div className="modal-icon">
            <i className="fas fa-lock"></i>
          </div>

          {/* Título */}
          <h2 className="modal-title">Inicia sesión para continuar</h2>

          {/* Descripción */}
          <p className="modal-description">
            Para poder {action.toLowerCase()}, necesitas tener una cuenta activa en CodeGodot.
            <br />
            <span className="highlight">¡Es rápido y fácil!</span>
          </p>

          {/* Botones */}
          <div className="modal-buttons">
            <button 
              className="btn btn-login"
              onClick={handleLogin}
            >
              <i className="fas fa-sign-in-alt me-2"></i>
              Iniciar sesión
            </button>
            <button 
              className="btn btn-register"
              onClick={handleRegister}
            >
              <i className="fas fa-user-plus me-2"></i>
              Crear cuenta
            </button>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <p className="footer-text">
              O cierra este modal para continuar explorando
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
