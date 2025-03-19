
# Building Guardia Security with GitHub Actions

This document explains how to use GitHub Actions to automatically build and release Guardia Security.

## Automatic Builds

The project is configured with GitHub Actions workflows that will automatically:

1. Build the application whenever code is pushed to the main branch that modifies files in the `src/` directory
2. Create release packages when a new version tag is pushed

## Build Process

The GitHub Actions workflow performs the following steps:

1. Checks out the repository code
2. Sets up Node.js 18
3. Clears the npm cache
4. Installs dependencies using `npm ci`
5. Builds the project using `npm run build`
6. (When implemented) Runs tests using `npm test`

## Manual Workflow Trigger

If you need to trigger a build without pushing changes:

1. Go to the Actions tab in your GitHub repository
2. Select "Build Guardia Security" from the left sidebar
3. Click "Run workflow" button
4. Select the branch to build from and click "Run workflow"

This is useful for testing the workflow after making changes to the configuration.

## Creating a Release

To create a new release of Guardia Security:

1. Update version in your package.json
2. Commit your changes and push to the main branch
3. Create and push a new tag with the version number:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Troubleshooting

If the build fails:

1. Check the workflow logs for error messages:
   - Go to Actions tab > Failed workflow > Failed job
   - Look for red error messages that indicate what went wrong

2. Common issues and solutions:
   - **Dependency installation failures**: Try clearing the npm cache
   - **Build errors**: Check console output for specific error messages
   - **Test failures**: Review test output to identify failing tests

3. Solving typical errors:
   - If `npm ci` fails, try running it locally to see if the issue is reproducible
   - If the build fails due to TypeScript errors, fix the errors locally and push again
   - If CI is slow, consider optimizing the workflow to use caching more effectively

## Path Filtering

The current workflow only triggers on pushes to the main branch when files in the `src/` directory are modified. This reduces unnecessary builds when only documentation or other non-source files are changed.

To modify path filtering:

1. Edit the `.github/workflows/build.yml` file
2. Update the `paths` section under the `push` trigger

Example to trigger on both src and public directory changes:
```yaml
paths:
  - 'src/**'
  - 'public/**'
```
