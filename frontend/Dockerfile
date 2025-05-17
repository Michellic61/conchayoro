FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

FROM nginx:1.19.3-alpine AS production-stage

COPY --from=build-stage /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
