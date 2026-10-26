# Cloudflare deployment — Gyan Manch

## Confirmed deployment failure

The latest Cloudflare log shows that the build step succeeds, then deployment fails because Cloudflare runs:

`npx wrangler deploy`

That is the Worker deployment command. This repository is configured as a Cloudflare Pages site and includes a Pages Function at `functions/api/extract-questions.js`. Deploying it as a static-assets-only Worker is not a safe workaround because it would not automatically deploy the Pages Functions.

**The fix is in the Cloudflare project/build configuration, not another Worker entry point in this repository.** Do not add a fake `main` file and do not publish the repository root as Worker assets.

## Correct setup

1. In Cloudflare Dashboard → **Workers & Pages**, open the Pages project connected to `abhiranaktm350-creator/Gyanmamch`. If only the Worker service `gyanmamch` exists, create a Pages project through **Create → Pages → Connect to Git**.
2. Select repository `abhiranaktm350-creator/Gyanmamch`, production branch `main`.
3. Set framework preset to **None**.
4. Set build command to `npm run build`.
5. Set build output directory to `dist`.
6. Save and deploy. The Pages Git integration should perform a Pages deployment; it must not invoke the Worker service's custom `npx wrangler deploy` command.
7. If the log still says `Executing user deploy command: npx wrangler deploy`, you are still using the Worker Builds/service configuration or an explicit deploy-command override. Remove that override/use the Pages project. Changing repository files alone cannot change a dashboard-level deploy command.

The repository build script runs `rm -rf dist && mkdir -p dist && cp index.html _headers dist/`, so only the site HTML and headers are placed in the public output directory. SQL schema/seed files and setup documentation are not copied to `dist`.

## Supabase production checks

- Set the final `pages.dev` domain as the Supabase Auth Site URL and add it to Redirect URLs.
- Enable the intended sign-in provider in Supabase Auth.
- Never place a Supabase service-role key or private API secret in browser code.
- Test registration, login, administrator approval, mock submission, results and the `/api/extract-questions` endpoint after deployment.

## Known limitations

- The browser UI and static build completing successfully do not prove that authentication, database policies, PDF extraction or scoring work correctly in production.
- The app currently has starter data; do not label generated starter questions as verified official previous-year papers without validating their source and answer key.
