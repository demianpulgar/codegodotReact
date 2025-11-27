# Script para configurar S3 como website hosting con soporte para SPA (Single Page Application)
# Esto permite que React Router funcione correctamente en S3

$bucketName = "codereact-s3"
$region = "us-east-1"

Write-Host "Configurando S3 para SPA (React Router)..." -ForegroundColor Cyan
Write-Host ""

# 1. Habilitar website hosting
Write-Host "[1] Habilitando website hosting..." -ForegroundColor Yellow

# Crear configuración JSON para website
$websiteConfig = @"
{
  "IndexDocument": {
    "Suffix": "index.html"
  },
  "ErrorDocument": {
    "Key": "index.html"
  }
}
"@

# Guardar en archivo temporal
$tempFile = [System.IO.Path]::GetTempFileName()
$websiteConfig | Out-File -FilePath $tempFile -Encoding UTF8 -Force

# Aplicar configuración
aws s3api put-bucket-website --bucket $bucketName --website-configuration "file://$tempFile" --region $region

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Website hosting habilitado" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Error habilitando website hosting" -ForegroundColor Red
    Remove-Item $tempFile -Force
    exit 1
}

Write-Host ""
Write-Host "[2] Configurando política de bucket..." -ForegroundColor Yellow

# 2. Crear política de bucket para permitir acceso público
$policy = @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$bucketName/*"
    }
  ]
}
"@

# Guardar política en archivo temporal
$policyFile = [System.IO.Path]::GetTempFileName()
$policy | Out-File -FilePath $policyFile -Encoding UTF8 -Force

# Aplicar política
aws s3api put-bucket-policy --bucket $bucketName --policy "file://$policyFile" --region $region

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Política de bucket configurada" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Error configurando política" -ForegroundColor Red
    Remove-Item $tempFile -Force
    Remove-Item $policyFile -Force
    exit 1
}

# Limpiar archivos temporales
Remove-Item $tempFile -Force
Remove-Item $policyFile -Force

Write-Host ""
Write-Host "[OK] S3 esta configurado correctamente para React Router!" -ForegroundColor Green
Write-Host ""
Write-Host "Tu app ahora esta en:" -ForegroundColor Cyan
Write-Host "   http://$bucketName.s3-website-$region.amazonaws.com"
Write-Host ""
Write-Host "Notas:" -ForegroundColor Yellow
Write-Host "   - Las rutas de React Router ahora funcionan correctamente"
Write-Host "   - Los errores 404 ahora sirven index.html"
Write-Host "   - Puedes navegar directamente a cualquier ruta"
