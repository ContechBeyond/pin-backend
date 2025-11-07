# Configuración para Render

## Variables de Entorno Requeridas

Para que el keep-alive funcione correctamente, debes configurar las siguientes variables de entorno en tu servicio de Render:

### 1. NODE_ENV
- **Nombre:** `NODE_ENV`
- **Valor:** `production`

### 2. RENDER_EXTERNAL_URL
- **Nombre:** `RENDER_EXTERNAL_URL`
- **Valor:** `https://tu-servicio.onrender.com` (reemplaza con tu URL real de Render)

## Cómo Configurar en Render

1. Ve a tu Dashboard de Render
2. Selecciona tu servicio
3. Ve a la pestaña "Environment"
4. Agrega las variables mencionadas arriba
5. Haz redeploy del servicio

## Cómo Funciona el Keep-Alive

- El servidor hace un ping a sí mismo cada 10 minutos
- Solo se activa en producción (NODE_ENV=production)
- Evita que Render ponga el servicio a "dormir"
- Mantiene las conexiones Socket.IO activas
- El endpoint `/ping` responde con el estado del servidor y PIN actual

## Verificar que Funciona

- Visita `https://tu-servicio.onrender.com/ping`
- Deberías ver una respuesta JSON con el estado del servidor
- En los logs verás mensajes "Keep-alive ping exitoso" cada 10 minutos

## Endpoints Disponibles

- `GET /ping` - Estado del servidor y keep-alive
- `GET /pin` - Obtener PIN actual
- WebSocket en `/` - Conexión en tiempo real para PINs

## Beneficios

✅ Servidor siempre activo durante el uso
✅ Conexiones Socket.IO estables
✅ Sin interrupciones en la generación de PINs
✅ Gratuito (no requiere plan pago)