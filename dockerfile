# Use uma imagem base Node.js com FFmpeg pré-instalado
FROM jrottenberg/ffmpeg:4.3-ubuntu2004 AS ffmpeg

# Use uma imagem base Node.js oficial
FROM node:14

# Copie o FFmpeg da imagem anterior
COPY --from=ffmpeg / /

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
