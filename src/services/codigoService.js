import config from '../config/api';

/**
 * Servicio para interactuar con la API de códigos
 */
class CodigoService {
  constructor() {
    this.baseURL = config.baseURL;
  }

  /**
   * Obtiene todos los códigos
   */
  async obtenerTodos() {
    try {
      const response = await fetch(`${this.baseURL}/codigos`);
      if (!response.ok) {
        throw new Error(`Error al obtener códigos: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  /**
   * Obtiene un código por ID
   */
  async obtenerPorId(id) {
    try {
      const response = await fetch(`${this.baseURL}/codigos/${id}`);
      if (!response.ok) {
        throw new Error(`Error al obtener código: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw error;
    }
  }

  /**
   * Busca códigos por título
   */
  async buscarPorTitulo(titulo) {
    try {
      const response = await fetch(`${this.baseURL}/codigos/search?titulo=${encodeURIComponent(titulo)}`);
      if (!response.ok) {
        throw new Error(`Error al buscar códigos: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en buscarPorTitulo:', error);
      throw error;
    }
  }

  /**
   * Crea un nuevo código
   */
  async crear(codigoDTO) {
    try {
      const response = await fetch(`${this.baseURL}/codigos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(codigoDTO),
      });
      if (!response.ok) {
        throw new Error(`Error al crear código: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en crear:', error);
      throw error;
    }
  }

  /**
   * Actualiza un código existente
   */
  async actualizar(id, codigoDTO) {
    try {
      const response = await fetch(`${this.baseURL}/codigos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(codigoDTO),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar código: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error en actualizar:', error);
      throw error;
    }
  }

  /**
   * Elimina un código
   */
  async eliminar(id) {
    try {
      const response = await fetch(`${this.baseURL}/codigos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar código: ${response.status}`);
      }
    } catch (error) {
      console.error('Error en eliminar:', error);
      throw error;
    }
  }
}

// Exportar una instancia única del servicio
export default new CodigoService();
