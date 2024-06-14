# Use uma imagem base Node.js oficial
FROM node:14

# Instale o FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Crie um diretório de trabalho
WORKDIR /app

# Copie o package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que o servidor vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "api/transcode.js"]
