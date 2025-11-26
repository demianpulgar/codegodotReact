# CodeGodot React Frontend

Frontend React con Vite para la plataforma CodeGodot.

## Requisitos

- Node.js 18+
- npm 9+ o yarn 4+

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd codegodotReact
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tu configuración:

```properties
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Environment
VITE_ENV=development
```

## Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo en `http://localhost:5173`

### Compilar para Producción

```bash
npm run build
```

Crea una versión optimizada en la carpeta `dist/`

### Vista Previa de Producción

```bash
npm run preview
```

### Ejecutar Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Configuración de Variables de Entorno

Las variables de entorno se pueden configurar a través de archivos `.env`:

- `.env` - Variables globales
- `.env.local` - Configuración local (no se versionea)
- `.env.development.local` - Solo para desarrollo
- `.env.production.local` - Solo para producción

## API Base URL

- **Desarrollo**: Usa proxy a `http://localhost:8080` (configurado en `vite.config.js`)
- **Producción**: Especifica en `VITE_API_BASE_URL`

## Estructura del Proyecto

```
src/
├── components/       # Componentes React reutilizables
├── pages/           # Páginas de la aplicación
├── services/        # Servicios de API
├── style/           # Estilos CSS
├── context/         # Context API para estado global
├── config/          # Configuración (API, etc)
└── assets/          # Imágenes y recursos estáticos
```

## Notas Importantes

- El archivo `.env` nunca debe ser commiteado a Git
- Usa `.env.example` como referencia para nuevos desarrolladores
- Las URLs sensibles deben ser variables de entorno
- En producción, configura las variables en el servidor/plataforma de despliegue
