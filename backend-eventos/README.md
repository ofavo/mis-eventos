# Backend de Mis Eventos

Este es el backend para la aplicaciu00f3n de gestiu00f3n de eventos "Mis Eventos", desarrollado con FastAPI y PostgreSQL.

## Tecnologu00edas Utilizadas

- **FastAPI**: Framework web ru00e1pido para construir APIs con Python
- **SQLModel**: ORM para interactuar con la base de datos
- **PostgreSQL**: Sistema de gestiu00f3n de bases de datos relacional
- **Docker**: Para contenerizaciu00f3n y despliegue
- **JWT**: Para autenticaciu00f3n y autorizaciu00f3n

## Estructura del Proyecto

```
backend-eventos/
u251cu2500u2500 app/
u2502   u251cu2500u2500 config/         # Configuraciu00f3n de la aplicaciu00f3n
u2502   u251cu2500u2500 models/         # Modelos de datos
u2502   u251cu2500u2500 routers/        # Rutas de la API
u2502   u2514u2500u2500 __init__.py
u251cu2500u2500 create_tables.py  # Script para crear tablas en la base de datos
u251cu2500u2500 requirements.txt  # Dependencias del proyecto
u251cu2500u2500 .env.example      # Ejemplo de variables de entorno
u251cu2500u2500 Dockerfile        # Configuraciu00f3n de Docker
u251cu2500u2500 wait-for-db.sh    # Script para esperar a que la base de datos estu00e9 lista
u2514u2500u2500 README.md        # Este archivo
```

## Configuraciu00f3n del Entorno

1. Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

2. Edita el archivo `.env` con tus configuraciones:

```
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
JWT_SECRET_KEY=tu_clave_secreta
JWT_EXPIRATION_HOURS=6

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
```

## Ejecuciu00f3n Local

### Con Docker

El backend estu00e1 configurado para ejecutarse con Docker Compose desde el directorio rau00edz del proyecto:

```bash
docker-compose up -d backend
```

### Sin Docker

1. Instala las dependencias:

```bash
pip install -r requirements.txt
```

2. Crea las tablas en la base de datos:

```bash
python create_tables.py
```

3. Inicia el servidor:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Endpoints de la API

La documentaciu00f3n completa de la API estu00e1 disponible en:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Principales Endpoints

- **Autenticaciu00f3n**: `/auth/login`, `/auth/register`
- **Usuarios**: `/users`
- **Eventos**: `/events`
- **Roles**: `/roles`

## Desarrollo

### Crear Nuevos Endpoints

Para crear nuevos endpoints, au00f1ade un nuevo archivo en el directorio `app/routers/` y regu00edstralo en `app/main.py`.

### Crear Nuevos Modelos

Para crear nuevos modelos, au00f1ade un nuevo archivo en el directorio `app/models/` y asegu00farate de importarlo en `create_tables.py`.

## Pruebas

Para ejecutar las pruebas (cuando estu00e9n implementadas):

```bash
pytest
```
