
# Building Guardia Security with GitHub Actions

This document explains how to use GitHub Actions to automatically build and release Guardia Security.

## Automatic Builds

The project is configured with GitHub Actions workflows that will automatically:

1. Build the application for Windows, macOS, and Linux whenever code is pushed to the main branch
2. Create release packages when a new version tag is pushed

## Creating a Release

To create a new release of Guardia Security:

1. Update version in your package.json
2. Commit your changes and push to the main branch
3. Create and push a new tag with the version number:

```bash
git tag v1.0.0
git push origin v1.0.0
```

This will trigger the workflow to:
- Build the application for all platforms
- Create a GitHub Release with all build artifacts
- Attach the build artifacts to the release

## Accessing Build Artifacts

Even without creating a release, you can access build artifacts from any workflow run:

1. Go to the "Actions" tab in your GitHub repository
2. Click on the specific workflow run
3. Scroll down to the "Artifacts" section
4. Download the artifacts for your platform

## Troubleshooting

If the build fails:

1. Check the workflow logs for error messages
2. Ensure all dependencies are correctly specified
3. Verify that your code builds locally before pushing

For macOS code signing issues, you may need to add code signing certificates to your GitHub secrets and update the workflow accordingly.
