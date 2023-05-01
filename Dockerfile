FROM node:14.20 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
COPY . /app

FROM nginx:alpine
COPY --from=node /app/dist/etiqa_fe /usr/share/nginx/html