import config from '../config/api'

/**
 * usuarioService.js
 * Punto central para sincronizar usuario con BD
 * Reemplaza el uso directo de localStorage con llamadas a la API
 */

/**
 * Obtener usuario actual desde localStorage
 */
export function obtenerUsuarioLocal() {
    const data = localStorage.getItem('usuarioLogeado')
    return data ? JSON.parse(data) : null
}

/**
 * Guardar usuario en localStorage
 */
export function guardarUsuarioLocal(usuario) {
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuario))
}

/**
 * Limpiar usuario de localStorage
 */
export function limpiarUsuarioLocal() {
    localStorage.removeItem('usuarioLogeado')
}

/**
 * Obtener usuario completo desde BD usando username
 * IMPORTANTE: Esto sincroniza los datos con la BD
 */
export async function obtenerUsuarioDeBD(username) {
    try {
        const response = await fetch(`${config.baseURL}/usuarios/${username}`)
        
        if (!response.ok) {
            throw new Error('Error al obtener usuario desde BD')
        }
        
        const usuarioCompleto = await response.json()
        return usuarioCompleto
    } catch (error) {
        console.error('Error en obtenerUsuarioDeBD:', error)
        throw error
    }
}

/**
 * LOGIN - Envía credenciales y obtiene usuario completo desde BD
 */
export async function login(usuario, correo, password) {
    try {
        const response = await fetch(`${config.baseURL}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario,
                correo,
                password
            })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Credenciales inválidas')
        }

        const usuarioData = await response.json()
        
        // Guardar usuario COMPLETO en localStorage
        guardarUsuarioLocal(usuarioData)
        
        return usuarioData
    } catch (error) {
        console.error('Error en login:', error)
        throw error
    }
}

/**
 * REGISTRO - Crea usuario y lo obtiene completo desde BD
 */
export async function registro(datosUsuario) {
    try {
        const response = await fetch(`${config.baseURL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosUsuario)
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Error al registrar el usuario')
        }

        const usuarioCreado = await response.json()
        
        // Guardar usuario en localStorage después de crear
        guardarUsuarioLocal(usuarioCreado)
        
        return usuarioCreado
    } catch (error) {
        console.error('Error en registro:', error)
        throw error
    }
}

/**
 * ACTUALIZAR PERFIL - Actualiza usuario en BD y sincroniza localStorage
 */
export async function actualizarPerfil(username, cambios) {
    try {
        // Usar FormData para manejar fotoUrl base64 (muy grande)
        const formData = new FormData()
        Object.keys(cambios).forEach(key => {
            formData.append(key, cambios[key])
        })

        const response = await fetch(`${config.baseURL}/usuarios/${username}`, {
            method: 'PUT',
            body: formData
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || 'Error al actualizar el perfil')
        }

        const usuarioActualizado = await response.json()
        
        // Obtener usuario COMPLETO desde BD para garantizar sincronización
        const usuarioCompleto = await obtenerUsuarioDeBD(usuarioActualizado.username || username)
        
        // Guardar usuario completo en localStorage
        guardarUsuarioLocal(usuarioCompleto)
        
        return usuarioCompleto
    } catch (error) {
        console.error('Error en actualizarPerfil:', error)
        throw error
    }
}

/**
 * LOGOUT - Limpia localStorage y desconecta usuario
 */
export function logout() {
    limpiarUsuarioLocal()
}

/**
 * Verificar disponibilidad de username
 */
export async function verificarUsernameDisponible(username) {
    try {
        const response = await fetch(`${config.baseURL}/usuarios/check-username/${username}`)
        
        if (!response.ok) {
            throw new Error('Error verificando username')
        }
        
        const data = await response.json()
        return !data.exists // Retorna true si el username está disponible
    } catch (error) {
        console.error('Error en verificarUsernameDisponible:', error)
        throw error
    }
}
