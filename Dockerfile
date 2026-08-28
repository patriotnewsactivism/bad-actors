# Build stage — needs devDependencies (vite) to build the SPA
FROM mirror.gcr.io/library/node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build && node prerender.mjs

# Serve stage — no build tools needed, just the static output + api handlers
FROM mirror.gcr.io/library/node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/api ./api
COPY --from=builder /app/package.json ./
COPY server.mjs ./
EXPOSE 8080
CMD ["node", "server.mjs"]
