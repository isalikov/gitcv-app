# GitHub Actions Setup

## Required Secrets

To enable automatic Docker image builds, you need to configure the following secret in your GitHub repository:

### Setting up VITE_API_URL

1. Go to your GitHub repository
2. Click on **Settings**
3. Navigate to **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add the following:
   - **Name:** `VITE_API_URL`
   - **Secret:** Your production API URL (e.g., `https://api.example.com`)
6. Click **Add secret**

## How it works

The GitHub Actions workflow automatically triggers on:

- **Push to `master` branch** → builds image with `latest` tag
- **Push version tag** → builds image with version tag (e.g., `v1.0.0`)

### Workflow steps:

1. Checkout the repository
2. Set up Docker Buildx for multi-platform builds
3. Login to GitHub Container Registry (GHCR) using `GITHUB_TOKEN`
4. Build the Docker image with `VITE_API_URL` from secrets
5. Tag the image appropriately:
   - `latest` - for pushes to master branch
   - `v1.0.0` - for version tags
6. Push the image to `ghcr.io/isalikov/gitcv-app`
7. Generate a build summary

## Triggering a Build

### Automatic (on every push to master)

Simply push to master and the `latest` image will be built:

```bash
git push origin master
```

### Manual (create a versioned release)

Create and push a version tag:

```bash
# Create a new tag
git tag v1.0.0

# Push the tag to trigger the workflow
git push origin v1.0.0
```

## Viewing Build Results

After pushing a tag:

1. Go to **Actions** tab in your repository
2. Click on the latest **Build and Push Docker Image** workflow run
3. View the build logs and summary

## Using the Published Image

The image will be available at:

```
ghcr.io/isalikov/gitcv-app:<tag>
```

### Pull the image

```bash
# Login to GHCR (only needed for private repositories)
echo $GITHUB_TOKEN | docker login ghcr.io -u isalikov --password-stdin

# Pull the latest image (from master branch)
docker pull ghcr.io/isalikov/gitcv-app:latest

# Or pull a specific version
docker pull ghcr.io/isalikov/gitcv-app:v1.0.0

# Run the container
docker run -p 80:80 ghcr.io/isalikov/gitcv-app:latest
```

## Making the Package Public

By default, packages are private. To make your Docker image public:

1. Go to your repository's **Packages** section
2. Click on your package (`gitcv-app`)
3. Click **Package settings**
4. Scroll down to **Danger Zone**
5. Click **Change visibility**
6. Select **Public**

## Troubleshooting

### Build fails with "permission denied"

- Check that Actions have write permissions for packages:
  - Settings → Actions → General → Workflow permissions
  - Select "Read and write permissions"

### Secret not found

- Verify the secret name is exactly `VITE_API_URL`
- Secrets are case-sensitive

### Image not found after build

- Check the Actions log for the full image name
- Verify the build completed successfully
- For private repos, ensure you're authenticated with GHCR
