FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Gera o client do prisma após instalar módulos
RUN npx prisma generate

# Copia o restando do código fonte
COPY . .

# Faz a build da aplicação Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

EXPOSE 3000

# Executa a aplicação
CMD ["npm", "start"]
