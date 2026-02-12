FROM node:24-alpine

# Installer vim (et bash si besoin futur)
RUN apk add --no-cache vim

WORKDIR /app

# Copier uniquement les fichiers nécessaires au install
COPY package.json package-lock.json* ./

# Installer les dépendances + zod
RUN npm install

# Copier le reste du projet
COPY . .

CMD ["npm", "run", "dev"]
