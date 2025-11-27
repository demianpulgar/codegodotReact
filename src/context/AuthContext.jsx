import { createContext, useContext, useEffect, useState } from 'react'
import * as usuarioService from '../services/usuarioService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Obtener usuario de localStorage al montar el componente
  useEffect(() => {
    const usuarioLocal = usuarioService.obtenerUsuarioLocal()
    if (usuarioLocal) {
      setUser(usuarioLocal)
    }
  }, [])

  // Escuchar cambios en localStorage (útil cuando se logea en otra pestaña)
  useEffect(() => {
    const handleStorageChange = () => {
      const usuarioLocal = usuarioService.obtenerUsuarioLocal()
      setUser(usuarioLocal)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const login = (userData) => {
    // El usuario ya está guardado en localStorage por usuarioService.login
    setUser(userData)
  }

  const logout = () => {
    usuarioService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
