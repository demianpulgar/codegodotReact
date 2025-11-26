#!/bin/bash

# Deploy script for CodeGodot Frontend to S3
# Usage: ./deploy.sh

echo "================================"
echo "CodeGodot Frontend - S3 Deploy"
echo "================================"
echo ""

# Verificar que AWS CLI esté instalado
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI no está instalado"
    echo "Descárgalo desde: https://aws.amazon.com/cli/"
    exit 1
fi

# Verificar que el bucket esté especificado
if [ -z "$1" ]; then
    echo "❌ Uso: ./deploy.sh <bucket-name>"
    echo "Ejemplo: ./deploy.sh codegodot-frontend"
    exit 1
fi

BUCKET_NAME=$1

echo "📦 Información del deploy:"
echo "   Bucket S3: $BUCKET_NAME"
echo "   Origen: ./dist/"
echo ""

# Confirmar antes de continuar
read -p "¿Deseas continuar? (s/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "❌ Deploy cancelado"
    exit 1
fi

# Subir archivos
echo ""
echo "⏳ Sincronizando archivos..."
aws s3 sync ./dist "s3://$BUCKET_NAME/" --delete --region us-east-1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deploy completado exitosamente!"
    echo ""
    echo "URLs de acceso:"
    echo "   S3: https://$BUCKET_NAME.s3.amazonaws.com/index.html"
    echo "   CloudFront: https://[tu-distribución-cf].cloudfront.net"
    echo ""
else
    echo "❌ Error durante el deploy"
    exit 1
fi
