#!/bin/bash
# Script para configurar S3 como website hosting con soporte para SPA (Single Page Application)
# Esto permite que React Router funcione correctamente en S3

BUCKET_NAME="codereact-s3"
REGION="us-east-1"

echo "🔧 Configurando S3 para SPA (React Router)..."
echo ""

# 1. Habilitar website hosting
echo "1️⃣ Habilitando website hosting..."
aws s3 website s3://$BUCKET_NAME/ \
    --index-document index.html \
    --error-document index.html \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Website hosting habilitado"
else
    echo "❌ Error habilitando website hosting"
    exit 1
fi

echo ""
echo "2️⃣ Configurando política de bucket..."

# 2. Crear política de bucket para permitir acceso público
POLICY='{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'"$BUCKET_NAME"'/*"
    }
  ]
}'

aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy "$POLICY" \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Política de bucket configurada"
else
    echo "❌ Error configurando política"
    exit 1
fi

echo ""
echo "✅ ¡S3 está configurado correctamente para React Router!"
echo ""
echo "🌐 Tu app ahora está en:"
echo "   http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""
echo "📝 Notas:"
echo "   - Las rutas de React Router ahora funcionan correctamente"
echo "   - Los errores 404 ahora sirven index.html"
echo "   - Puedes navegar directamente a cualquier ruta"
