# Estación Meteorológica IoT — Dashboard Web

##¿Qué se hizo?

**Carga de datos en Supabase**

Se ejecutó el script `sql/datos_sensor_supabase_100_registros.sql` en el
Editor SQL de Supabase. Este script:

- Crea la tabla `datos_sensor` con las columnas `temp`, `presion`, `humedad`
  y `created_at`.
- Configura las políticas de seguridad a nivel de fila (**RLS**) necesarias
  para permitir lectura pública.
- Inserta 100 registros ficticios que simulan lecturas de un sensor BME280
  a lo largo de varios días.

**Construcción del cliente web**

Se desarrolló una aplicación con React y Vite, siguiendo la arquitectura de
la guía de la práctica:

| Archivo | Función |
|---|---|
| `src/api/supabase.js` | Realiza la petición `GET` al endpoint `/rest/v1/datos_sensor` usando las credenciales (URL y clave anónima) del proyecto. |
| `src/components/WeatherCards.jsx` | Muestra tarjetas con la lectura más reciente de temperatura, presión y humedad. |
| `src/pages/Dashboard.jsx` | Maneja el estado de la aplicación (`useState` / `useEffect`) y renderiza la tabla con el historial de lecturas. |
| `src/App.jsx` | Define el enrutamiento de la aplicación con React Router. |

Las credenciales de conexión (`Project URL` y clave `anon`) se configuraron
como variables de entorno con prefijo `VITE_` en un archivo `.env.local`,
que **no** se sube al repositorio por seguridad (está en `.gitignore`).


### ¿Para qué sirve esta práctica?

Esta práctica demuestra, de forma simplificada, el flujo de datos real de
un sistema IoT de monitoreo ambiental:

1. Un dispositivo físico (ej. un **ESP32** con sensor BME280) envía lecturas
   continuamente a la base de datos vía peticiones `POST`.
2. La base de datos en la nube (**Supabase**) almacena esas lecturas y
   expone un endpoint REST de solo lectura.
3. Un cliente web (este dashboard) consulta ese mismo endpoint vía `GET`
   para mostrar los datos en tiempo real a un usuario final, sin necesidad
   de programar ni mantener un servidor backend propio.

En términos prácticos, esto permite entender cómo se diseñan arquitecturas
modernas **serverless** o de bajo código para proyectos de telemetría,
sensores y monitoreo remoto, reduciendo el tiempo de desarrollo y el costo
de infraestructura.

### Cómo ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone <URL_DE_ESTE_REPOSITORIO>
cd weather-dashboard

# 2. Instalar dependencias
npm install

# 3. Configurar credenciales
cp .env.local.example .env.local
# Editar .env.local con tu Project URL y anon key de Supabase

# 4. Levantar el servidor de desarrollo
npm run dev
```

Antes del paso 4, asegúrate de haber ejecutado el script
`sql/datos_sensor_supabase_100_registros.sql` en el **SQL Editor** de tu
proyecto de Supabase.

### Estructura del proyecto

```
weather-dashboard/
├── sql/
│   └── datos_sensor_supabase_100_registros.sql
├── src/
│   ├── api/
│   │   └── supabase.js
│   ├── components/
│   │   └── WeatherCards.jsx
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env.local.example
├── index.html
├── package.json
└── vite.config.js
```

### Conclusiones

- Se logró completar el ciclo de datos IoT: inserción, almacenamiento y
  consumo desde el cliente web.
- El uso de un DBaaS (Supabase) permitió construir la solución sin escribir
  código de backend.
- El dashboard muestra correctamente los 100 registros cargados, ordenados
  del más reciente al más antiguo.
- Como mejora futura, cada dispositivo debería autenticarse mediante una
  **Edge Function** en lugar de usar la clave anónima para insertar datos,
  reforzando la seguridad del sistema.

---

**Autor:** Jair Pincay
**Materia / Curso:** Aolicaciones Telemáticas Basadas en Web - 8vo Semestre
**Docente:** Ing. Cristhian Zambrano
