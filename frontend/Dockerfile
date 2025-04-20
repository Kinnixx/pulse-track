FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

# Ajout de la config nginx custom pour Ember routing
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copie du build Ember vers le dossier statique Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
