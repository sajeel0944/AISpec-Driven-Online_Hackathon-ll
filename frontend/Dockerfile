FROM node:22-alpine AS builder
WORKDIR /app

# Allow passing NEXT_PUBLIC_API_URL at build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NODE_ENV=production

# Install deps
COPY package*.json ./
RUN npm ci --production=false

# Copy source and build
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy only production artifacts
COPY --from=builder /app/package*.json ./
RUN npm ci --production=true
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "start", "--", "-p", "3000"]