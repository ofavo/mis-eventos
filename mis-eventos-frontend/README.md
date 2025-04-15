# Frontend de Mis Eventos

Este es el frontend para la aplicación de gestión de eventos "Mis Eventos", desarrollado con React, TypeScript y Vite.

## Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superconjunto tipado de JavaScript
- **Vite**: Herramienta de compilación y desarrollo rápida
- **Ant Design**: Biblioteca de componentes UI
- **Zustand**: Gestión de estado
- **React Router**: Enrutamiento para aplicaciones React
- **Docker**: Para contenerización y despliegue

## Estructura del Proyecto

```
mis-eventos-frontend/
├── public/           # Archivos estáticos públicos
├── src/              # Código fuente
│   ├── assets/       # Imágenes y otros recursos
│   ├── components/   # Componentes reutilizables
│   ├── hooks/        # Hooks personalizados
│   ├── pages/        # Páginas de la aplicación
│   ├── services/     # Servicios para comunicación con la API
│   ├── store/        # Gestión de estado con Zustand
│   ├── types/        # Definiciones de tipos TypeScript
│   ├── utils/        # Utilidades y funciones auxiliares
│   ├── App.tsx       # Componente principal
│   ├── main.tsx      # Punto de entrada
│   └── environment.ts # Configuración de entorno
├── .env.example      # Ejemplo de variables de entorno
├── index.html        # Plantilla HTML
├── package.json      # Dependencias y scripts
├── tsconfig.json     # Configuración de TypeScript
├── vite.config.ts    # Configuración de Vite
├── Dockerfile        # Configuración de Docker
└── README.md        # Este archivo
```

## Configuración del Entorno

1. Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

2. Edita el archivo `.env` con tus configuraciones:

```
VITE_SOME_KEY=http://localhost:8000
```

## Ejecución Local

### Con Docker

El frontend está configurado para ejecutarse con Docker Compose desde el directorio raíz del proyecto:

```bash
docker-compose up -d frontend
```

### Sin Docker

1. Instala las dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Accede a la aplicación en tu navegador:

```
http://localhost:5173
```

## Construcción para Producción

```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist/`.

## Estructura de Rutas

- `/`: Página principal
- `/login`: Inicio de sesión
- `/register`: Registro de usuario
- `/events`: Lista de eventos
- `/events/:id`: Detalle de evento
- `/profile`: Perfil de usuario

## Comunicación con el Backend

La comunicación con el backend se realiza a través de servicios HTTP utilizando Fetch API. La URL base del backend se configura en el archivo `src/environment.ts`.

## Desarrollo

### Añadir Nuevos Componentes

Para añadir nuevos componentes, crea un nuevo archivo en el directorio `src/components/`.

### Añadir Nuevas Páginas

Para añadir nuevas páginas, crea un nuevo archivo en el directorio `src/pages/` y añade la ruta correspondiente en el enrutador.
