FROM node:14.20
WORKDIR /app_fe
COPY package.json .
RUN npm install
COPY . /app_fe
EXPOSE 4200
CMD ["npm", "start"]