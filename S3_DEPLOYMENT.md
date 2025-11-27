# Despliegue del Frontend a S3

## 📋 Requisitos Previos

1. **AWS CLI instalado**
   ```powershell
   # Verifica si está instalado
   aws --version
   
   # Si no está instalado, descárgalo desde:
   # https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
   ```

2. **Credenciales AWS configuradas**
   ```powershell
   aws configure
   # Ingresa:
   # - AWS Access Key ID
   # - AWS Secret Access Key
   # - Default region: us-east-1
   # - Default output format: json
   ```

3. **Bucket S3 creado**
   - Nombre: `codereact-s3`
   - Region: `us-east-1`
   - Habilitado para website hosting

## 🚀 Pasos para Desplegar

### Paso 1: Compilar el Frontend
```powershell
cd c:\Users\demia\Desktop\FullStack\codegodotReact
npm run build
```

Esto genera la carpeta `dist/` con los archivos optimizados.

### Paso 2: Desplegar a S3
```powershell
.\deploy-s3.ps1
```

O manualmente con AWS CLI:
```powershell
aws s3 sync dist/ s3://codereact-s3/ `
    --delete `
    --cache-control "max-age=3600" `
    --region us-east-1
```

### Paso 3: Verificar en el Navegador
Abre: http://codereact-s3.s3-website-us-east-1.amazonaws.com

## 🔧 Configuración

### Variables de Entorno

**Desarrollo (.env.development)**
```
VITE_API_URL=http://100.31.11.234:8080/api
```

**Producción (.env.production)**
```
VITE_API_URL=http://100.31.11.234:8080/api
```

Ambas apuntan al backend en EC2 (100.31.11.234:8080).

### CORS en Backend

El backend tiene configurado CORS para aceptar solicitudes de:
- `http://localhost:5173` (desarrollo local)
- `http://localhost:8080` (backend local)
- `http://codereact-s3.s3-website-us-east-1.amazonaws.com` (S3)
- `https://codereact-s3.s3-website-us-east-1.amazonaws.com` (S3 HTTPS)

## 🐛 Troubleshooting

### Error: "AWS CLI no encontrado"
- Instala AWS CLI desde: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

### Error: "No credentials found"
- Ejecuta: `aws configure`
- Ingresa tus credenciales de AWS IAM

### Error: "Access Denied"
- Verifica que tu usuario IAM tiene permisos: `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket`

### Cambios no aparecen en S3
- El navegador cachea archivos. Abre con `Ctrl+Shift+R` (hard refresh)
- O vacía el cache en DevTools

## 📊 Arquitectura Final

```
Frontend (S3): http://codereact-s3.s3-website-us-east-1.amazonaws.com
    ↓ HTTP Requests
Backend (EC2): http://100.31.11.234:8080/api
    ↓ JDBC
MySQL (EC2): localhost:3306
```

## ✅ Checklist Pre-Despliegue

- [ ] Frontend compila sin errores: `npm run build`
- [ ] `.env.production` apunta a backend EC2
- [ ] CORS configurado en backend para S3 origin
- [ ] AWS CLI instalado y configurado
- [ ] Credenciales AWS con permisos S3
- [ ] Bucket S3 existe y está configurado para website hosting

¡Listo! 🎉
