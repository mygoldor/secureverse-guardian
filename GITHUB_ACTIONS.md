
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
   - **Missing requirements.txt**: Make sure the file exists in the repository root
   - **Python dependency errors**: Ensure requirements.txt is valid and all dependencies are available
   - **Node.js build errors**: Verify that package.json has the correct electron:build script
   - **Electron builder errors**: Check that electron-builder.yml configuration is valid
   - **Path issues**: The debug steps in the workflow can help identify path-related problems
   - **package-lock.json sync issues**: If you see errors about missing packages in the lock file, it means your package.json and package-lock.json are out of sync. The workflow uses `npm install` instead of `npm ci` to handle this automatically.

3. Solving typical errors:
   - If `requirements.txt` is not found, check that it's in the correct location and committed to the repository
   - If `electron:build` fails, make sure the script is properly defined in package.json
   - If artifact uploads fail, verify that the build is generating files in the expected locations
   - If you see Node.js engine compatibility warnings, they are usually just warnings and not actual errors, but you may need to update your Node.js version in the workflow if the build fails.

4. Testing locally:
   - Always verify that your code builds locally before pushing
   - Run `npm run build` and `npm run electron:build` locally to catch issues
   - If building locally works but CI fails, check if there are differences in the environment or dependencies

5. If builds are cancelled:
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

## Debugging Issues

The workflow includes debugging steps that will:
1. List files in the workspace
2. Verify the presence of critical files like requirements.txt
3. Check the contents of the electron-builder.yml file
4. List build artifacts after the build process

These debugging steps should help identify issues when builds fail.

## Package Management Tips

To avoid issues with package-lock.json:

1. Commit both package.json and package-lock.json together whenever you update dependencies
2. Run `npm install` locally before pushing to ensure the lock file is updated
3. If you get "missing package" errors in CI, it indicates that package.json and package-lock.json are out of sync. The workflow has been configured to handle this by using `npm install` instead of `npm ci`.
