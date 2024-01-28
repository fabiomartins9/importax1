# Use a imagem oficial do Node.js com a versão específica (20.10.0)
FROM node:20.10.0-alpine

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho
COPY . .

# Construa a aplicação Next.js
RUN npm run build

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "start"]
