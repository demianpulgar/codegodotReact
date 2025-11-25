import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('usuarioLogeado')
    if (data) setUser(JSON.parse(data))
  }, [])

  const login = (username) => {
    const payload = { username }
    localStorage.setItem('usuarioLogeado', JSON.stringify(payload))
    setUser(payload)
  }

  const logout = () => {
    localStorage.removeItem('usuarioLogeado')
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
