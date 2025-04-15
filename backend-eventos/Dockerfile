# Dockerfile para el backend
FROM python:3.12-slim

WORKDIR /app

COPY ./backend-eventos /app
RUN apt-get update && apt-get install -y libpq-dev gcc postgresql-client

RUN cp .env.example .env

# Establecer variables de entorno
ENV DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres

RUN pip install --no-cache-dir -r requirements.txt

# Copiar y dar permisos al script de espera
COPY ./backend-eventos/wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

# Usar el script de espera para ejecutar solo uvicorn
CMD ["./wait-for-db.sh", "db", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]