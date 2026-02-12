# Boxful TT Frontend

Aplicación frontend construida con Next.js para la prueba técnica de Boxful. Incluye autenticación, flujo de creación de envíos, listado de envíos y balance en tiempo real (SSE).

## Tabla de contenido

- [Boxful TT Frontend](#boxful-tt-frontend)
  - [Tabla de contenido](#tabla-de-contenido)
  - [Stack tecnologico](#stack-tecnologico)
  - [Requisitos previos](#requisitos-previos)
  - [Variables de entorno](#variables-de-entorno)
  - [Ejecucion local](#ejecucion-local)
  - [Ejecucion con Docker](#ejecucion-con-docker)
  - [Scripts disponibles](#scripts-disponibles)
  - [Funcionalidades principales](#funcionalidades-principales)
  - [Rutas principales](#rutas-principales)
  - [Integracion con backend](#integracion-con-backend)
  - [Troubleshooting](#troubleshooting)

## Stack tecnologico

- Next.js 16
- React 19
- TypeScript
- Ant Design
- NextAuth (Credentials)
- TanStack Query
- Axios
- Zustand
- SSE con `@microsoft/fetch-event-source`

## Requisitos previos

- Node.js 22+
- npm 10+
- Backend ejecutándose (recomendado en `http://localhost:3001`)

## Variables de entorno

Crea tu archivo `.env` a partir de `.env.example`.

```bash
cp .env.example .env
```

Variables:

- `FRONTEND_PORT`: Puerto donde corre el frontend en Docker.
- `NEXT_PUBLIC_API_URL`: URL pública del backend (cliente). Ejemplo: `http://localhost:3001`.
- `INTERNAL_API_URL`: URL interna para SSR/server-side dentro de Docker. Ejemplo: `http://boxful-api:3001`.
- `AUTH_SECRET`: Secreto para sesión/auth de NextAuth.
- `AUTH_URL`: URL pública del frontend. Ejemplo: `http://localhost:3000`.
- `AUTH_TRUST_HOST`: `true` en entornos donde la app confía en el host/proxy.

## Ejecucion local

1. Instalar dependencias:

```bash
npm ci
```

2. Configurar `.env`.
3. Levantar servidor de desarrollo:

```bash
npm run dev
```

4. Abrir `http://localhost:3000`.

## Ejecucion con Docker

Este `docker-compose.yml` usa la red externa `boxful-network`, por lo que debe existir previamente.

Si primero levantas el backend con Docker, la red se crea automáticamente.

```bash
docker compose up --build -d
```

El frontend quedará disponible en el puerto configurado por `FRONTEND_PORT`.

## Scripts disponibles

- `npm run dev`: Modo desarrollo.
- `npm run build`: Build de producción.
- `npm run start`: Ejecuta la build.
- `npm run lint`: Corre ESLint.

## Funcionalidades principales

- Autenticación completa:
  - Inicio de sesión con credenciales.
  - Registro de usuario.
  - Recuperación y restablecimiento de contraseña.
  - Validación de correo electrónico.
- Gestión de envíos:
  - Creación de órdenes con datos de remitente, destinatario y paquetes dinámicos.
  - Soporte para envíos COD y no COD.
- Historial de envíos:
  - Listado paginado y ordenado por fecha.
  - Filtros por rango de fechas, orden y datos del cliente.
  - Visualización de detalles de paquetes por envío.
- Balance en tiempo real:
  - Consulta de balance acumulado del usuario.
  - Actualización en vivo mediante SSE (`/shipments/me/balance/stream`) cuando cambia el settlement en backend.
- Experiencia de plataforma:
  - Layout responsivo para desktop y móvil.
  - Navegación con sidebar/navbar y control de sesión.

## Rutas principales

- `/`: Página principal (Crear envío).
- `/shipments`: Listado de envíos.
- `/login`: Iniciar sesión.
- `/register`: Registrarse.
- `/forgot-password`: Olvidé mi contraseña.
- `/reset-password/[token]`: Restablecer contraseña.
- `/email-validation`: Validación de correo electrónico.

## Integracion con backend

El frontend consume endpoints del backend bajo:

- Auth: `/auth/*`
- Shipments: `/shipments/*`
- SSE balance: `/shipments/me/balance/stream`

Asegúrate de que:

- `NEXT_PUBLIC_API_URL` apunta al backend accesible desde el navegador.
- `INTERNAL_API_URL` apunta al backend accesible desde el servidor Next.js (especialmente en Docker).
- El backend use CORS habilitado para el origen del frontend.

## Troubleshooting

- Error de conexión API en local:
  - Verifica `NEXT_PUBLIC_API_URL` y que el backend esté levantado.
- Error en SSR dentro de Docker:
  - Verifica `INTERNAL_API_URL` (`http://boxful-api:3001` si backend está en la misma red).
- Problemas de sesión/auth:
  - Revisa `AUTH_SECRET`, `AUTH_URL` y `AUTH_TRUST_HOST`.
