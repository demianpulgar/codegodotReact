# Pruebas Unitarias - CodeGodot React

Este documento describe las pruebas unitarias implementadas para los componentes `Login` y `Registro` del proyecto CodeGodot siguiendo la **Guía 2.3.3 - Configuración de pruebas unitarias en componentes front-end**.

## Tecnologías Utilizadas

- **Jest**: Framework de testing estándar para proyectos JavaScript/React
- **React Testing Library**: Librería para testing de componentes React
- **@testing-library/user-event**: Para simular interacciones de usuario
- **jsdom**: Implementación de DOM para Node.js
- **Babel**: Para transpilar JSX y ES6+ en los tests

## Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom @babel/preset-react @babel/preset-env babel-jest identity-obj-proxy
```

## Ejecutar las Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch (útil durante desarrollo)
```bash
npm test -- --watch
```

### Ejecutar pruebas con cobertura de código
```bash
npm run test:coverage
```

### Ejecutar solo las pruebas de Login
```bash
npm test Login
```

### Ejecutar solo las pruebas de Registro
```bash
npm test Registro
```

## Cobertura de Pruebas

### Componente Login (`Login.test.jsx`)

#### 1. Renderizado inicial (4 pruebas)
- Renderiza el formulario completo
- Muestra todos los campos requeridos
- Muestra las frases motivacionales
- Muestra el botón de inicio de sesión

#### 2. Validaciones de campos (4 pruebas)
- Valida campo usuario vacío
- Valida campo correo vacío
- Valida campo contraseña vacío
- Limpia errores al escribir

#### 3. Funcionalidad de login (5 pruebas)
- Muestra error con credenciales incorrectas
- Inicio de sesión exitoso con correo
- Inicio de sesión exitoso con usuario
- Redirección después de login exitoso
- Dispara evento storage

#### 4. Manejo del estado (1 prueba)
- Actualiza el estado del formulario

#### 5. Integración con localStorage (2 pruebas)
- Lee usuarios desde localStorage
- Maneja localStorage vacío

**Total: 16 pruebas para Login**

### Componente Registro (`Registro.test.jsx`)

#### 1. Renderizado inicial (4 pruebas)
- Renderiza el formulario completo
- Muestra todos los campos (8 campos)
- Muestra checkbox de términos y condiciones
- Muestra enlace a login

#### 2. Validaciones de campos obligatorios (7 pruebas)
- Valida campo nombre
- Valida campo apellido paterno
- Valida campo apellido materno
- Valida campo correo
- Valida campo usuario
- Valida campo contraseña
- Valida aceptación de términos

#### 3. Validaciones de formato (5 pruebas)
- Valida formato de correo electrónico
- Valida longitud mínima de contraseña (8 caracteres)
- Valida letra mayúscula en contraseña
- Valida carácter especial en contraseña
- Valida coincidencia de contraseñas

#### 4. Validación de duplicados (2 pruebas)
- Detecta correo duplicado
- Detecta usuario duplicado

#### 5. Manejo del estado (3 pruebas)
- Actualiza campos del formulario
- Maneja checkbox de términos
- Limpia errores al escribir

#### 6. Registro exitoso (3 pruebas)
- Registra usuario con todos los campos
- Redirección a login después de registro
- Permite registro sin teléfono (campo opcional)

#### 7. Integración con localStorage (2 pruebas)
- Agrega usuario a lista existente
- Maneja localStorage vacío

**Total: 26 pruebas para Registro**

## Aspectos Probados

### Validaciones
- Campos requeridos
- Formato de email
- Complejidad de contraseña
- Coincidencia de contraseñas
- Duplicación de usuarios/correos

### Funcionalidad
- Inicio de sesión exitoso
- Registro de nuevos usuarios
- Manejo de errores
- Limpieza de errores
- Redirecciones

### Integración
- LocalStorage (lectura/escritura)
- React Router (navegación)
- Eventos de storage

### Interfaz de Usuario
- Renderizado de componentes
- Interacción con formularios
- Mensajes de error/éxito
- Estado de campos

## Resultados Esperados

Al ejecutar `npm test`, deberías ver:

```
✓ src/components/Login.test.jsx (16)
✓ src/components/Registro.test.jsx (26)

Test Suites  2 passed (2)
Tests  39 passed (39)
```

## Estructura de Archivos

```
src/
├── components/
│   ├── Login.jsx
│   ├── Login.test.jsx          ← Pruebas del Login
│   ├── Registro.jsx
│   └── Registro.test.jsx       ← Pruebas del Registro
└── test/
    └── setupTests.js           ← Configuración global de testing

jest.config.cjs                 ← Configuración de Jest
.babelrc                        ← Configuración de Babel para Jest
```

## Configuración

### jest.config.cjs
Configuración optimizada para instancias t2.micro de AWS:
- `maxWorkers: 2` - Limita workers para entornos con recursos limitados
- `maxConcurrency: 1` - Ejecuta tests en serie para mejor estabilidad
- Incluye configuración de cobertura de código

### .babelrc
Configuración de Babel para transpilar JSX y ES6+ en los tests

## Buenas Prácticas Implementadas

1. **Aislamiento**: Cada prueba es independiente y limpia su estado
2. **Cleanup**: Se limpia localStorage después de cada prueba con `jest.clearAllMocks()`
3. **Mocking**: Se mockean las dependencias externas (router, alert)
4. **Descriptivo**: Nombres claros que describen qué se está probando
5. **Cobertura**: Se prueban casos de éxito, error y edge cases
6. **Organización**: Pruebas agrupadas por funcionalidad usando `describe`
7. **Optimización AWS**: Configuración ajustada para instancias t2.micro

## Debugging

Si las pruebas fallan, puedes:

1. Ver detalles del error en la consola
2. Usar `screen.debug()` para ver el HTML renderizado
3. Ejecutar en modo watch: `npm test -- --watch`
4. Ver logs detallados: `npm test -- --verbose`

## Notas Importantes

- Las pruebas usan `localStorage` mockeado
- Se mockea `useNavigate` de react-router-dom
- Se mockea `window.alert` para evitar modales durante testing
- Se usan timers virtuales (`jest.useFakeTimers()`) para probar timeouts
- Incluye polyfills de TextEncoder/TextDecoder para compatibilidad

## Integración Continua

Puedes agregar las pruebas a tu pipeline de CI/CD con:

```yaml
# Ejemplo para AWS CodeBuild (buildspec.yml)
version: 0.2
phases:
  install:
    runtime-versions:
      nodejs: 14
  pre_build:
    commands:
      - npm install
  build:
    commands:
      - npm test
      - npm run build
artifacts:
  files:
    - '**/*'
  base-directory: 'build'
```

