# Configurar CloudFront para React SPA en S3

## Problema
S3 website hosting redirige 404s pero no preserva la ruta original, lo que rompe React Router.

## Solución: CloudFront + S3

CloudFront es un CDN que permite reescribir rutas sin perderlas.

### Paso 1: Crear una distribución CloudFront

1. Ve a **CloudFront → Create distribution**
2. **Origin Settings:**
   - Origin domain: `codereact-s3.s3.us-east-1.amazonaws.com` (SIN "website")
   - Name: `codereact-s3-origin`
   - Enable Origin Shield: No

3. **Default Cache Behavior:**
   - Allowed HTTP methods: GET, HEAD, OPTIONS
   - Cache policy: CachingOptimized
   - Compress objects automatically: Yes

4. **Error Pages:**
   - Create custom error response
   - HTTP Error Code: 404
   - Error Response Path: `/index.html`
   - Response HTTP Status Code: 200
   - TTL: 0

5. **Settings:**
   - Default root object: `index.html`
   - Create distribution

### Paso 2: Esperar a que se depliegue

La distribución tarda 5-10 minutos en estar lista. Verifica el estado en la consola.

### Paso 3: Actualizar DNS (opcional)

Si tienes un dominio, cambia el CNAME a apuntar a CloudFront.

### Paso 4: Acceder a tu app

Tu app estará en: `https://d1234abcd.cloudfront.net` (o tu dominio personalizado)

## Alternativa: Sin CloudFront

Si no quieres usar CloudFront, puedes usar un **bucket con aplicación Node.js** como proxy.

¿Quieres que te ayude a configurar CloudFront?
