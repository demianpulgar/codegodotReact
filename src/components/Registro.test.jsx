import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import * as usuarioService from '../services/usuarioService'
import Registro from './Registro'

// Mock de useNavigate
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

jest.mock('../services/usuarioService', () => ({
  registro: jest.fn(),
}))

// Wrapper para proveer el contexto del router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Registro Component', () => {
  beforeEach(() => {
    localStorage.clear()
    mockNavigate.mockClear()
    jest.clearAllMocks()
    usuarioService.registro.mockReset()
  })

  describe('Renderizado inicial', () => {
    it('debe renderizar el formulario de registro correctamente', () => {
      renderWithRouter(<Registro />)
      
      expect(screen.getByText('Crea tu Cuenta')).toBeInTheDocument()
      expect(screen.getByLabelText(/Nombre\*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Apellido Paterno\*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Apellido Materno\*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Correo electrónico\*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Nombre de usuario\*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Teléfono/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^Contraseña\*/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Confirma contraseña\*/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Crear cuenta/i })).toBeInTheDocument()
    })

    it('debe mostrar el checkbox de términos y condiciones', () => {
      renderWithRouter(<Registro />)
      
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toBeInTheDocument()
      expect(screen.getByText(/Acepta los/i)).toBeInTheDocument()
      expect(screen.getByText(/términos y condiciones/i)).toBeInTheDocument()
    })

    it('debe mostrar el enlace a iniciar sesión', () => {
      renderWithRouter(<Registro />)
      
      expect(screen.getByText(/¿Ya tienes cuenta\?/i)).toBeInTheDocument()
      expect(screen.getByText(/Inicia sesión/i)).toBeInTheDocument()
    })

    it('debe mostrar el mensaje descriptivo', () => {
      renderWithRouter(<Registro />)
      
      expect(screen.getByText(/Únete a la comunidad de desarrolladores Godot/i)).toBeInTheDocument()
    })
  })

  describe('Validaciones de campos obligatorios', () => {
    it('debe mostrar error cuando el campo nombre está vacío', async () => {
      renderWithRouter(<Registro />)
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa tu nombre.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el campo apellido paterno está vacío', async () => {
      renderWithRouter(<Registro />)
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa tu apellido paterno.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el campo apellido materno está vacío', async () => {
      renderWithRouter(<Registro />)
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa tu apellido materno.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el campo correo está vacío o es inválido', async () => {
      renderWithRouter(<Registro />)
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el campo usuario está vacío', async () => {
      renderWithRouter(<Registro />)
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa un nombre de usuario.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el campo contraseña está vacío', async () => {
      renderWithRouter(<Registro />)
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa una contraseña.')).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando no se aceptan los términos', async () => {
      renderWithRouter(<Registro />)
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Debes aceptar los términos y condiciones.')).toBeInTheDocument()
      })
    })
  })

  describe('Validaciones de formato', () => {
    it('debe validar el formato del correo electrónico', async () => {
      renderWithRouter(<Registro />)
      
      const correoInput = screen.getByLabelText(/Correo electrónico\*/i)
      fireEvent.change(correoInput, { target: { value: 'correo-invalido' } })
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa un correo electrónico válido.')).toBeInTheDocument()
      })
    })

    it('debe validar que la contraseña tenga al menos 8 caracteres', async () => {
      renderWithRouter(<Registro />)
      
      // Llenar campos requeridos
      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Pass1!' } })
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('La contraseña debe tener al menos 8 caracteres.')).toBeInTheDocument()
      })
    })

    it('debe validar que la contraseña tenga al menos una mayúscula', async () => {
      renderWithRouter(<Registro />)
      
      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'password123!' } })
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('La contraseña debe tener al menos una letra mayúscula.')).toBeInTheDocument()
      })
    })

    it('debe validar que la contraseña tenga al menos un carácter especial', async () => {
      renderWithRouter(<Registro />)
      
      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Password123' } })
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText(/La contraseña debe tener al menos un carácter especial/i)).toBeInTheDocument()
      })
    })

    it('debe validar que las contraseñas coincidan', async () => {
      renderWithRouter(<Registro />)
      
      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.change(screen.getByLabelText(/Confirma contraseña\*/i), { target: { value: 'Password456!' } })
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument()
      })
    })
  })

  describe('Validación de duplicados', () => {
    it('debe mostrar error cuando el backend rechaza un correo duplicado', async () => {
      usuarioService.registro.mockRejectedValue(new Error('El correo ya está registrado.'))

      renderWithRouter(<Registro />)
      
      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'nuevouser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.change(screen.getByLabelText(/Confirma contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.click(screen.getByRole('checkbox'))
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(usuarioService.registro).toHaveBeenCalled()
        expect(screen.getByText('El correo ya está registrado.', { selector: '.text-danger' })).toBeInTheDocument()
      })
    })

    it('debe mostrar error cuando el backend rechaza un usuario duplicado', async () => {
      usuarioService.registro.mockRejectedValue(new Error('El nombre de usuario ya está registrado.'))

      renderWithRouter(<Registro />)
      
      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'nuevo@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.change(screen.getByLabelText(/Confirma contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.click(screen.getByRole('checkbox'))
      
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(usuarioService.registro).toHaveBeenCalled()
        expect(screen.getByText('El nombre de usuario ya está registrado.', { selector: '.text-danger' })).toBeInTheDocument()
      })
    })
  })

  describe('Manejo del estado del formulario', () => {
    it('debe actualizar el estado cuando se escribe en los campos', () => {
      renderWithRouter(<Registro />)
      
      const nombreInput = screen.getByLabelText(/Nombre\*/i)
      const apellidoPaternoInput = screen.getByLabelText(/Apellido Paterno\*/i)
      const correoInput = screen.getByLabelText(/Correo electrónico\*/i)

      fireEvent.change(nombreInput, { target: { value: 'Juan' } })
      fireEvent.change(apellidoPaternoInput, { target: { value: 'Pérez' } })
      fireEvent.change(correoInput, { target: { value: 'juan@test.com' } })

      expect(nombreInput.value).toBe('Juan')
      expect(apellidoPaternoInput.value).toBe('Pérez')
      expect(correoInput.value).toBe('juan@test.com')
    })

    it('debe manejar el checkbox de términos', () => {
      renderWithRouter(<Registro />)
      
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    it('debe limpiar errores cuando el usuario empieza a escribir', async () => {
      renderWithRouter(<Registro />)
      
      // Generar error primero
      const submitButton = screen.getByRole('button', { name: /Crear cuenta/i })
      fireEvent.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Ingresa tu nombre.')).toBeInTheDocument()
      })

      // Escribir en el campo
      const nombreInput = screen.getByLabelText(/Nombre\*/i)
      fireEvent.change(nombreInput, { target: { value: 'Juan' } })

      // El error debe desaparecer
      await waitFor(() => {
        expect(screen.queryByText('Ingresa tu nombre.')).not.toBeInTheDocument()
      })
    })
  })

  describe('Registro exitoso', () => {
    it('debe invocar al backend y mostrar el toast de éxito', async () => {
      usuarioService.registro.mockResolvedValue({ id: 1 })
      renderWithRouter(<Registro />)

      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Juan' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'Pérez' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'García' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'juan@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'juanperez' } })
      fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '123456789' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.change(screen.getByLabelText(/Confirma contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.click(screen.getByRole('checkbox'))

      fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }))

      await waitFor(() => {
        expect(usuarioService.registro).toHaveBeenCalledWith({
          nombre: 'Juan',
          apellidoPaterno: 'Pérez',
          apellidoMaterno: 'García',
          correo: 'juan@test.com',
          username: 'juanperez',
          telefono: '123456789',
          password: 'Password123!'
        })
        expect(screen.getByText(/Tu cuenta ha sido creada/i)).toBeInTheDocument()
      })
    })

    it('debe redirigir a login después del toast', async () => {
      usuarioService.registro.mockResolvedValue({ id: 2 })
      jest.useFakeTimers()
      renderWithRouter(<Registro />)

      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.change(screen.getByLabelText(/Confirma contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.click(screen.getByRole('checkbox'))

      fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }))

      await waitFor(() => {
        expect(usuarioService.registro).toHaveBeenCalled()
      })

      jest.advanceTimersByTime(2000)

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login')
      })

      jest.useRealTimers()
    })

    it('debe permitir registro sin teléfono enviando cadena vacía', async () => {
      usuarioService.registro.mockResolvedValue({ id: 3 })
      renderWithRouter(<Registro />)

      fireEvent.change(screen.getByLabelText(/Nombre\*/i), { target: { value: 'Test' } })
      fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'User' } })
      fireEvent.change(screen.getByLabelText(/Apellido Materno\*/i), { target: { value: 'Prueba' } })
      fireEvent.change(screen.getByLabelText(/Correo electrónico\*/i), { target: { value: 'test@test.com' } })
      fireEvent.change(screen.getByLabelText(/Nombre de usuario\*/i), { target: { value: 'testuser' } })
      fireEvent.change(screen.getByLabelText(/^Contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.change(screen.getByLabelText(/Confirma contraseña\*/i), { target: { value: 'Password123!' } })
      fireEvent.click(screen.getByRole('checkbox'))

      fireEvent.click(screen.getByRole('button', { name: /Crear cuenta/i }))

      await waitFor(() => {
        expect(usuarioService.registro).toHaveBeenCalledWith(expect.objectContaining({ telefono: '' }))
      })
    })
  })
})
