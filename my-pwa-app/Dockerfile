# Stage 1: Build dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built artifacts and necessary files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Set user and expose port
USER nextjs
EXPOSE 3000

# Set environment and start command
ENV PORT 3000
CMD ["node", "server.js"]