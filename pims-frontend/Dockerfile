# Build stage
FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Production stage
FROM nginx:alpine

COPY --from=build-stage /app/dist/your-angular-app-name /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
