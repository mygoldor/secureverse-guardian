
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

1. Check the workflow logs for error messages:
   - Go to Actions tab > Failed workflow > Failed job > Expand the step that failed
   - Look for red error messages that indicate what went wrong

2. Common issues and solutions:
   - **Python dependency errors**: Ensure requirements.txt is valid and all dependencies are available
   - **Node.js build errors**: Check that your package.json scripts are correct
   - **Electron builder errors**: Verify electron-builder.yml configuration is valid
   - **Permission errors**: The workflow has been updated to include proper permissions

3. Testing locally:
   - Always verify that your code builds locally before pushing
   - Run `npm run build` and `npm run electron:build` locally to catch issues

4. If builds are cancelled:
   - This might be due to timeouts or resource constraints
   - Try building with fewer platforms at once by modifying the matrix
   - Optimize your build process to be faster and use fewer resources

For macOS code signing issues, you may need to add code signing certificates to your GitHub secrets and update the workflow accordingly.

## Manual Workflow Trigger

If you need to trigger a build without pushing changes:

1. Go to the Actions tab in your GitHub repository
2. Select "Build Guardia Security" from the left sidebar
3. Click "Run workflow" button
4. Select the branch to build from and click "Run workflow"

This is useful for testing the workflow after making changes to the configuration.
