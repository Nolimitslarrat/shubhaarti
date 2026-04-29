# Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

# Force development mode for install to ensure Vite and plugins are downloaded
ENV NODE_ENV=development

COPY package*.json ./
RUN npm install --include=dev

COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for React Router and API Proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
