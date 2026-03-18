# Live Deployment (Frontend + Backend)

This project is deployment-ready using Docker Compose.

## 1) Server Requirements

- Ubuntu/Debian server (or any Linux server)
- Docker Engine + Docker Compose plugin
- Domain pointing to your server IP
- Ports `80` open in firewall/security group

## 2) Upload Project

Clone this repository on your server:

```bash
git clone <your-repo-url> feedback-system
cd feedback-system
```

## 3) Configure Environment

```bash
cp .env.live.example .env
```

Update `.env` with real values:

- `CORS_ALLOWED_ORIGINS=https://your-domain.com`
- `MYSQL_PASSWORD` and `MYSQL_ROOT_PASSWORD` with strong passwords
- `VITE_BASE_PATH=/` (keep this unless you serve from a subpath)

## 4) Build and Start

```bash
docker compose --env-file .env up -d --build
```

## 5) Verify

```bash
docker compose ps
curl http://localhost/api/health
```

You should get a JSON health response from backend.

## 6) Update Deployment

```bash
git pull
docker compose --env-file .env up -d --build
```

## Notes

- Frontend is served by Nginx.
- Requests to `/api/*` are proxied to Spring Boot backend.
- MySQL data is persisted in Docker volume `mysql_data`.
