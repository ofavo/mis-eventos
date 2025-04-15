# Mis Eventos - Aplicación de Gestión de Eventos

Este proyecto es una aplicación web para la gestión de eventos, que permite a los usuarios crear, organizar y participar en diferentes tipos de eventos.

## Estructura del Proyecto

El proyecto está dividido en tres componentes principales:

- **Backend**: API REST desarrollada con FastAPI y PostgreSQL
- **Frontend**: Interfaz de usuario desarrollada con React y TypeScript
- **Base de datos**: PostgreSQL para almacenamiento de datos

## Requisitos Previos

- Docker y Docker Compose
- Git

## Instalación y Ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/mis-eventos.git
cd mis-eventos
```

2. Inicia los contenedores con Docker Compose:

```bash
docker-compose up -d
```

3. Accede a la aplicación:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - Documentación API: http://localhost:8000/docs

4. Inicializa la base de datos con datos de prueba:
   - Accede a la documentación de la API en http://localhost:8000/docs
   - Busca la sección de endpoints `/seed`
   - Ejecuta el endpoint para crear datos iniciales en la base de datos
   - Default user: admin@miseventos.com / password: eventos2025

## Detener la Aplicación

Para detener todos los contenedores:

```bash
docker-compose down
```

## Estructura de Directorios

```
mis-eventos/
├── backend-eventos/     # Código del backend
├── mis-eventos-frontend/ # Código del frontend
├── docker-compose.yml   # Configuración de Docker Compose
└── README.md            # Este archivo
```

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu función (`git checkout -b feature/nueva-funcion`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva función'`)
4. Haz push a la rama (`git push origin feature/nueva-funcion`)
5. Crea un nuevo Pull Request

## Licencia

Este proyecto está licenciado bajo [MIT License](LICENSE).
