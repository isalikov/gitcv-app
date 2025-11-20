# Docker Setup

This document describes how to build and run the application using Docker.

## Building Locally

### Build the Docker image

```bash
docker build -t gitcv-app:latest --build-arg VITE_API_URL=http://localhost:8080 .
```

### Run the container

```bash
docker run -p 8080:80 gitcv-app:latest
```

The application will be available at http://localhost:8080

### Using Docker Compose (optional)

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build:
      context: .
      args:
        VITE_API_URL: http://localhost:8080
    ports:
      - '8080:80'
    restart: unless-stopped
```

Run with:

```bash
docker-compose up -d
```

## GitHub Actions CI/CD

### Setup

The project includes a GitHub Actions workflow that automatically builds and publishes Docker images to GitHub Container Registry (GHCR).

### Required Secrets

Add the following secret to your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add a new secret:
   - Name: `VITE_API_URL`
   - Value: Your production API URL

### Automatic Builds

The workflow automatically triggers on:

- **Push to `master` branch** → builds and pushes `latest` tag
- **Push version tag** → builds and pushes version tag

### Creating a Release

To create a versioned release:

```bash
# Create and push a new tag
git tag v1.0.0
git push origin v1.0.0
```

The workflow will:

1. Build the Docker image with the API URL from secrets
2. Tag it with the version (e.g., `v1.0.0`)
3. Push to GitHub Container Registry at `ghcr.io/isalikov/gitcv-app`

### Using the Published Image

Pull and run the published image:

```bash
# Login to GHCR (only needed for private repositories)
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Pull the latest image (built from master branch)
docker pull ghcr.io/isalikov/gitcv-app:latest

# Or pull a specific version
docker pull ghcr.io/isalikov/gitcv-app:v1.0.0

# Run the container
docker run -p 80:80 ghcr.io/isalikov/gitcv-app:latest
```

### Image Tags

The workflow creates the following tags:

- `latest` - Built from `master` branch (always up-to-date)
- `v1.0.0` - Specific version tag (e.g., `v1.0.0`, `v2.1.3`)

## Production Deployment

### Using Kubernetes

Example deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gitcv-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: gitcv-app
  template:
    metadata:
      labels:
        app: gitcv-app
    spec:
      containers:
        - name: gitcv-app
          image: ghcr.io/isalikov/gitcv-app:latest
          ports:
            - containerPort: 80
          livenessProbe:
            httpGet:
              path: /health
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 10
```

### Using Docker Swarm

```bash
docker service create \
  --name gitcv-app \
  --replicas 3 \
  --publish 80:80 \
  ghcr.io/isalikov/gitcv-app:latest
```

## Nginx Configuration

The Docker image uses Nginx to serve the static files. The configuration includes:

- Gzip compression for assets
- Security headers
- Cache control for static assets (1 year)
- SPA fallback routing
- Health check endpoint at `/health`

## Health Check

The container includes a health check endpoint:

```bash
curl http://localhost:8080/health
# Response: healthy
```

Docker health checks run every 30 seconds and will mark the container as unhealthy if it fails 3 times.
