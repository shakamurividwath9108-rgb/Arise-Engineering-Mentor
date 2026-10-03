ARISE — Vercel-ready project with image paths fixed

Upload the CONTENTS of this folder to the ROOT of the GitHub repository connected to Vercel. Do not place them inside another nested folder. Vercel Project Settings → General → Root Directory should be ./ (the repository root), the folder containing index.html.

This package contains index.html, the full app files, and the matching assets/ folder together. The logo path referenced by index.html is assets/arise-logo.svg; profile artwork is assets/jinwoo-profile.png.

Commit the files to the branch connected to Vercel. When the deployment succeeds, hard refresh the site with Ctrl+Shift+R. If Vercel uses another Root Directory, set it to the folder where index.html and assets/ are side by side.

Local-only .arise-data and environment files are intentionally excluded.
