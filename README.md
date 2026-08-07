# Estación Meteorológica IoT — Dashboard Web (React + Supabase)

Proyecto armado siguiendo la guía **"Desarrollo del Dashboard Web: Estación
Meteorológica IoT"** y el script `datos_sensor_supabase_100_registros.sql`
que indicó el docente.

## 1. Cargar los 100 registros en Supabase

1. Entra a tu proyecto en [supabase.com](https://supabase.com) → **SQL Editor**.
2. Abre el archivo `sql/datos_sensor_supabase_100_registros.sql` de esta
   carpeta, copia todo el contenido y pégalo en el editor.
3. Ejecuta el script (`Run`). Esto:
   - Crea la tabla `public.datos_sensor`.
   - Configura permisos y políticas RLS (lectura pública, inserción
     controlada).
   - Inserta los 100 registros ficticios (10 por día, 3 sensores).
4. Verifica con las consultas finales del script que `total_registros`
   devuelva `100`.

## 2. Configurar las credenciales del dashboard

1. Ve a **Project Settings → API** en Supabase y copia:
   - `Project URL`
   - `anon public key`
2. En esta carpeta, copia `.env.local.example` como `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Reemplaza los valores en `.env.local`:
   ```
   VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica
   ```

## 3. Instalar dependencias y levantar la app

```bash
npm install
npm run dev
```

Abre la URL que muestra la terminal (por defecto `http://localhost:5173`).
Verás la tarjeta con la última lectura (temperatura, presión, humedad) y la
tabla con el historial de las últimas 10 lecturas, tal como en la última
diapositiva de la guía.

## Estructura del proyecto

```
weather-dashboard/
├── sql/
│   └── datos_sensor_supabase_100_registros.sql
├── src/
│   ├── api/
│   │   └── supabase.js        # Petición GET al endpoint REST de Supabase
│   ├── components/
│   │   └── WeatherCards.jsx   # Tarjetas de temperatura/presión/humedad
│   ├── pages/
│   │   └── Dashboard.jsx      # Estado + tabla de historial
│   ├── App.jsx                 # Enrutamiento (React Router)
│   └── main.jsx
├── .env.local.example
├── index.html
├── package.json
└── vite.config.js
```

## Nota de seguridad (incluida en el script del docente)

Permitir `INSERT` al rol `anon` es práctico para la demostración, pero
cualquiera con la clave publicable podría enviar datos falsos. En un
despliegue real, cada dispositivo debería autenticarse mediante una Edge
Function o un servidor intermedio, y se debería retirar `INSERT` de `anon`.
