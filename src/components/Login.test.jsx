import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as usuarioService from '../services/usuarioService'
import Login from './Login'

// Mock de useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('../services/usuarioService', () => ({
  login: jest.fn(),
}))

// Wrapper para proveer el contexto del router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
    usuarioService.login.mockReset()
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
    it('debe mostrar error cuando el backend rechaza las credenciales', async () => {
      usuarioService.login.mockRejectedValue(new Error('Credenciales inválidas'))

      renderWithRouter(<Login />)

      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'usuarioIncorrecto' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } })

      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(usuarioService.login).toHaveBeenCalledWith('usuarioIncorrecto', 'test@test.com', 'password123')
        expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
      })
    })

    it('debe iniciar sesión exitosamente cuando el backend responde 200', async () => {
      jest.useFakeTimers()
      const dispatchSpy = jest.spyOn(window, 'dispatchEvent')
      const usuario = {
        nombre: 'Test',
        correo: 'test@test.com',
        usuario: 'testuser'
      }
      usuarioService.login.mockImplementation(async () => {
        localStorage.setItem('usuarioLogeado', JSON.stringify(usuario))
        return usuario
      })

      renderWithRouter(<Login />)

      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Password123!' } })

      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(usuarioService.login).toHaveBeenCalledWith('testuser', 'test@test.com', 'Password123!')
        expect(screen.getByText('¡Bienvenido Test!')).toBeInTheDocument()
      })

      jest.advanceTimersByTime(1200)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/')
        expect(dispatchSpy).toHaveBeenCalled()
      })

      dispatchSpy.mockRestore()
      jest.useRealTimers()
    })

    it('debe deshabilitar el botón mientras se envía la petición', async () => {
      let resolver
      usuarioService.login.mockReturnValue(new Promise(resolve => { resolver = resolve }))

      renderWithRouter(<Login />)

      fireEvent.change(screen.getByLabelText(/Usuario/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'Password123!' } })

      const submitButton = screen.getByRole('button', { name: /Inicio Sesión/i })
      fireEvent.click(submitButton)

      expect(submitButton).toBeDisabled()

      await act(async () => resolver({ nombre: 'Test' }))

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
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

})
