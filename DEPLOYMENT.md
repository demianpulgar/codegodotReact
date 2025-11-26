# Deployment Guide - CodeGodot Frontend

## Estado Actual
✅ Build completado y listo para producción
✅ Todos los features implementados y probados
✅ Comunicación con backend configurada

## Archivos para Subir a S3

La carpeta `dist/` contiene todo lo necesario para subir a S3:

```
dist/
├── index.html (archivo principal)
└── assets/
    ├── index-BRbpzBJp.js (código JavaScript compilado)
    ├── index-G7xmcuED.css (estilos compilados)
    ├── Logo-BhFgO4zm.png (logo)
    ├── Godot--f9Isj-E.png
    ├── background-CGiLCW7e.webp
    └── [otras imágenes]
```

## Instrucciones para Subir a S3

### Opción 1: Usando AWS CLI
```bash
aws s3 sync ./dist s3://tu-bucket-name/ --delete
```

### Opción 2: Usando AWS Console
1. Ir a S3 → Tu bucket
2. Subir carpeta `dist/`
3. Configurar permisos públicos en los archivos

### Opción 3: Usando AWS SDK (Node.js)
```bash
npm install -g aws-sdk
node deploy.js
```

## Configuración CloudFront (Recomendado)

1. Crear distribución CloudFront apuntando a S3
2. Configurar como origin domain: `tu-bucket.s3.amazonaws.com`
3. Políticas de caché:
   - `index.html`: No cachear
   - Assets en `/assets/*`: Cachear 1 año

## Variables de Entorno en Producción

El archivo `.env` ya está configurado con:
- `VITE_API_BASE_URL=http://100.31.11.234:8080/api`

## Verificación Post-Deployment

✅ El frontend debe:
1. Cargar correctamente en el navegador
2. Conectar con la API en `100.31.11.234:8080`
3. Autenticación funcionando
4. CORS habilitado en backend

## Rollback (Si es necesario)

Si algo sale mal, revertir el commit:
```bash
git revert HEAD
npm run build
```

## Soporte

- Backend: http://100.31.11.234:8080
- API Docs: http://100.31.11.234:8080/swagger-ui.html

---
Última actualización: 26 de noviembre de 2025
Estado: ✅ LISTO PARA PRODUCCIÓN
