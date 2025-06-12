FROM postgres:latest

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    nodejs \
    npm \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm@latest-10

RUN npm install -g npx

RUN pnpm install prisma --save-dev

WORKDIR /app/apps/cinesenai-api

COPY . /app

RUN npx prisma generate --schema=/app/apps/cinesenai-api/prisma/schema.prisma

EXPOSE 5432


CMD ["docker-entrypoint.sh", "postgres"]
