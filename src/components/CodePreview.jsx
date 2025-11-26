import { useState } from 'react'
import '../style/codePreview.css'

export default function CodePreview({ codigo }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(codigo)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="code-preview-container">
      <div className="code-preview-header">
        <span className="code-language">GDScript</span>
        <button 
          className="btn-copy-code" 
          onClick={handleCopy}
          title="Copiar código"
        >
          <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i>
          {isCopied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <pre className="code-preview-content">
        <code>{codigo}</code>
      </pre>
    </div>
  )
}
