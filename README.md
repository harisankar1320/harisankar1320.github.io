# Harisankar Harikumar — Portfolio

Personal portfolio for Remote Sensing, Geospatial AI, Computer Vision, and Earth Observation.

**Live site:** https://harisankar1320.github.io  
**GitHub profile:** https://github.com/harisankar1320

## Built with
- HTML
- CSS
- Vanilla JavaScript
- GitHub REST API for the public repository list
- GitHub Pages for hosting

No build step, package manager, or framework is required.

## Publish with GitHub Pages
1. Upload these files to the root of the repository named `harisankar1320.github.io`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose your default branch (usually `main`) and folder `/(root)`, then save.
5. Wait a few minutes and open https://harisankar1320.github.io.

If GitHub Pages is already enabled for this repository, pushing the files to the configured branch should trigger a deployment.

## Personalise before publishing
- Update the LinkedIn link in `index.html` to your real profile URL (or remove it).
- Review the project descriptions and make each project link point to its actual repository. The current featured project links point to your GitHub profile as safe placeholders.
- Add your CV at `assets/cv/harisankar-harikumar-cv.pdf`. The download button already expects this path.
- Optionally add project screenshots in `assets/images/` and update the visual blocks in `index.html`.
- Check all education, experience, and skill descriptions for accuracy.

## Automatic repository list
`js/main.js` requests public repositories from:
`https://api.github.com/users/harisankar1320/repos?sort=updated&per_page=100&type=public`

The portfolio repository, forks, and archived repositories are excluded. The page does not need a token because it only reads public repository metadata. GitHub's unauthenticated API rate limit applies; if the request fails, a link to the profile's repository list appears instead.

## Local preview
Open `index.html` in your browser. For a more realistic local preview, use VS Code's Live Server extension. The repository list needs an internet connection to load.
