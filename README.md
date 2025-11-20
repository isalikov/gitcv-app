# gitcv-app

React application built with Vite, TypeScript, and modern tooling.

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Fast build tool with SWC
- **Vitest** - Unit testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky & lint-staged** - Pre-commit hooks
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js v22.18.0 (see `.nvmrc`)
- pnpm

### Installation

```bash
pnpm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

Available variables:

- `VITE_API_URL` - API endpoint URL (default: `http://localhost:8080` for local development)

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Testing

```bash
# Run tests in watch mode
pnpm test

# Run tests once
pnpm test:run

# Run tests with UI
pnpm test:ui
```

### Linting & Formatting

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm typecheck
```

## Docker

The application can be built and run as a Docker container. See [DOCKER.md](./DOCKER.md) for detailed instructions.

Quick start:

```bash
# Build the image
docker build -t gitcv-app:latest --build-arg VITE_API_URL=http://localhost:8080 .

# Run the container
docker run -p 8080:80 gitcv-app:latest
```

## CI/CD

The project uses GitHub Actions to automatically build and publish Docker images to GitHub Container Registry:

### Automatic builds

- **Push to `master`** → builds `ghcr.io/isalikov/gitcv-app:latest`
- **Push tag `v*.*.*`** → builds `ghcr.io/isalikov/gitcv-app:v1.0.0`

### Creating a release

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0
```

### Using the published image

```bash
# Pull and run the latest version
docker pull ghcr.io/isalikov/gitcv-app:latest
docker run -p 80:80 ghcr.io/isalikov/gitcv-app:latest

# Or use a specific version
docker pull ghcr.io/isalikov/gitcv-app:v1.0.0
```

**Required GitHub Secret:**

- `VITE_API_URL` - Production API URL

## Project Structure

```
src/
├── apps/           # Application entry points
│   ├── Dashboard/  # Dashboard app
│   └── Landing/    # Landing app
├── lib/            # Shared libraries
│   └── api.ts      # Axios instance
├── services/       # API services
├── test/           # Test utilities and setup
└── main.tsx        # Main entry point
```
