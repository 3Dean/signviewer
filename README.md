# GLB AR Viewer

A minimal Vite site for previewing a GLB model in 3D and launching augmented reality on supported mobile devices.

## Add the model

The current model is stored in `public/models/` as `paintedpaths3dlogo.glb`.

The final path should be:

```text
public/models/paintedpaths3dlogo.glb
```

Files in `public/` are served without being bundled, which is appropriate for a large model asset.

## Run locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite. The desktop page provides orbit and zoom controls. On a supported phone, **View in your space** launches AR.

AR generally requires the deployed site to use HTTPS. Localhost is suitable for ordinary 3D testing, but test AR from a phone using an HTTPS deployment.

## Project structure

```text
public/
  models/
    paintedpaths3dlogo.glb
  posters/             # Optional preview/poster images
src/
  main.js
  styles.css
index.html
package.json
```

If the object should be placed on a wall rather than the floor, change `ar-placement="floor"` to `ar-placement="wall"` in `index.html`.
