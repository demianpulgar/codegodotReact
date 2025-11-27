# Script para desplegar el frontend a S3
# Prerequisitos:
# 1. Tener AWS CLI instalado: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
# 2. Tener credenciales AWS configuradas: aws configure
# 3. Tener un bucket S3 llamado "codereact-s3"

$bucketName = "codereact-s3"
$distFolder = "dist"

# Verificar que existe la carpeta dist
if (-Not (Test-Path $distFolder)) {
    Write-Error "❌ La carpeta 'dist' no existe. Ejecuta primero: npm run build"
    exit 1
}

Write-Host "🚀 Iniciando despliegue a S3: s3://$bucketName"
Write-Host ""

# Sincronizar archivos con S3
Write-Host "📤 Subiendo archivos a S3..."
aws s3 sync $distFolder "s3://$bucketName/" `
    --delete `
    --cache-control "max-age=3600" `
    --exclude ".DS_Store" `
    --region us-east-1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Despliegue completado exitosamente!"
    Write-Host ""
    Write-Host "🌐 Tu aplicación está disponible en:"
    Write-Host "   http://$bucketName.s3-website-us-east-1.amazonaws.com"
    Write-Host ""
    Write-Host "📝 Notas:"
    Write-Host "   - El backend está en: http://100.31.11.234:8080"
    Write-Host "   - La API está configurada para apuntar al backend en EC2"
    Write-Host "   - CORS está habilitado para este origen en el backend"
} else {
    Write-Error "❌ Error durante el despliegue. Verifica tus credenciales AWS."
    exit 1
}
