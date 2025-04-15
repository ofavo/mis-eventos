FROM node

WORKDIR /app

COPY ./mis-eventos-frontend/package.json /app
RUN npm i

COPY ./mis-eventos-frontend/. /app
RUN cp .env.example .env
## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]