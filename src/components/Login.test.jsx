import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'

// Mock de useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

// Wrapper para proveer el contexto del router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
  })

  describe('Renderizado inicial', () => {
    it('debe renderizar el formulario de login correctamente', () => {
      renderWithRouter(<Login />)
      
      expect(screen.getByRole('heading', { name: /Inicio Sesión/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/Usuario/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Inicio Sesión/i })).toBeInTheDocument()
    })

    it('debe mostrar las frases motivacionales', () => {
      renderWithRouter(<Login />)
      
      expect(screen.getByText(/Bienvenido a CodeGodot/i)).toBeInTheDocument()
      expect(screen.getByText(/snippet que te ahorrará horas/i)).toBeInTheDocument()
      expect(screen.getByText(/Error 404: Motivación no encontrada/i)).toBeInTheDocument()
    })
  })

  describe('Validaciones de campos', () => {
    it('debe mostrar error cuando el campo usuario está vacío', async () => {
      renderWithRouter(<Login />)
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa tu nombre de usuario.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el campo correo está vacío o es inválido', async () => {
      renderWithRouter(<Login />)
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el campo contraseña está vacío', async () => {
      renderWithRouter(<Login />)
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa tu contraseña.')).toBeInTheDocument()
      })
    })

    it('debe limpiar errores cuando el usuario empieza a escribir', async () => {
      renderWithRouter(<Login />)
      
      // Generar error primero
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa tu nombre de usuario.')).toBeInTheDocument()
      })

      // Escribir en el campo
      const usuarioInput = screen.getByLabelText(/Usuario/i)
      fireEvent.change(usuarioInput, { target: { value: 'testuser' } })

      // El error debe desaparecer
      await waitFor(() => {
        expect(screen.queryByText('Ingresa tu nombre de usuario.')).not.toBeInTheDocument()
      })
    })
  })

  describe('Funcionalidad de login', () => {
    it('debe mostrar error cuando las credenciales son incorrectas', async () => {
      renderWithRouter(<Login />)
      
      // Llenar el formulario con datos incorrectos
      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'usuarioIncorrecto' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } })
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Correo, usuario o contraseña incorrectos.')).toBeInTheDocument()
      })
    })

    it('debe iniciar sesión exitosamente con correo válido', async () => {
      // Crear un usuario en localStorage
      const usuario = {
        nombre: 'Test',
        apellidoPaterno: 'User',
        apellidoMaterno: 'Prueba',
        correo: 'test@test.com',
        usuario: 'testuser',
        password: 'Password123!'
      }
      localStorage.setItem('usuarios', JSON.stringify([usuario]))

      renderWithRouter(<Login />)
      
      // Llenar el formulario
      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Password123!' } })
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('¡Inicio de sesión exitoso!')).toBeInTheDocument()
      })

      // Verificar que se guardó en localStorage
      const usuarioLogeado = JSON.parse(localStorage.getItem('usuarioLogeado'))
      expect(usuarioLogeado).toEqual(usuario)
    })

    it('debe iniciar sesión con nombre de usuario válido', async () => {
      // Crear un usuario en localStorage
      const usuario = {
        nombre: 'Test',
        apellidoPaterno: 'User',
        apellidoMaterno: 'Prueba',
        correo: 'test@test.com',
        usuario: 'testuser',
        password: 'Password123!'
      }
      localStorage.setItem('usuarios', JSON.stringify([usuario]))

      renderWithRouter(<Login />)
      
      // Llenar el formulario solo con usuario y password
      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'cualquier@email.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Password123!' } })
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('¡Inicio de sesión exitoso!')).toBeInTheDocument()
      })
    })

    it('debe redirigir a la página principal después de login exitoso', async () => {
      jest.useFakeTimers()
      
      const usuario = {
        nombre: 'Test',
        correo: 'test@test.com',
        usuario: 'testuser',
        password: 'Password123!'
      }
      localStorage.setItem('usuarios', JSON.stringify([usuario]))

      renderWithRouter(<Login />)
      
      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Password123!' } })
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      // Avanzar el tiempo para el setTimeout
      jest.advanceTimersByTime(1200)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/')
      })

      jest.useRealTimers()
    })
  })

  describe('Manejo del estado del formulario', () => {
    it('debe actualizar el estado cuando se escribe en los campos', () => {
      renderWithRouter(<Login />)
      
      const usuarioInput = screen.getByLabelText(/Usuario/i)
      const correoInput = screen.getByLabelText(/Correo electrónico/i)
      const passwordInput = screen.getByLabelText(/Contraseña/i)

      fireEvent.change(usuarioInput, { target: { value: 'miusuario' } })
      fireEvent.change(correoInput, { target: { value: 'mi@correo.com' } })
      fireEvent.change(passwordInput, { target: { value: 'mipassword' } })

      expect(usuarioInput.value).toBe('miusuario')
      expect(correoInput.value).toBe('mi@correo.com')
      expect(passwordInput.value).toBe('mipassword')
    })
  })

  describe('Integración con localStorage', () => {
    it('debe leer usuarios desde localStorage', async () => {
      const usuarios = [
        { correo: 'user1@test.com', usuario: 'user1', password: 'Pass1!' },
        { correo: 'user2@test.com', usuario: 'user2', password: 'Pass2!' }
      ]
      localStorage.setItem('usuarios', JSON.stringify(usuarios))

      renderWithRouter(<Login />)
      
      // Intentar login con el segundo usuario
      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'user2' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'user2@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Pass2!' } })
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('¡Inicio de sesión exitoso!')).toBeInTheDocument()
      })
    })

    it('debe manejar localStorage vacío', async () => {
      localStorage.removeItem('usuarios')

      renderWithRouter(<Login />)
      
      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'usuario' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password' } })
      
      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Correo, usuario o contraseña incorrectos.')).toBeInTheDocument()
      })
    })
  })
})
