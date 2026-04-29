FROM node:18-alpine

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5000

# Push DB schema changes and start the server
CMD ["sh", "-c", "npx prisma db push && node server.js"]
