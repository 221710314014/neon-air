# NEON AIR — Aircraft Detailing

Production website for NEON AIR, an aircraft detailing business serving India.

## Live site

https://221710314014.github.io/neon-air/

## Hosting

The site is deployed free on GitHub Pages using `.github/workflows/deploy-pages.yml`. Every push to `main` redeploys the static site automatically.

## Stack

- Static HTML
- CSS
- Vanilla JavaScript
- GitHub Pages / GitHub Actions
- FormSubmit for quotation enquiries

No framework or server is required.

## Quotation form

The live JavaScript adapts the original static form for GitHub Pages and submits enquiries to FormSubmit, which delivers them to `info@neonair.in`.

FormSubmit requires one-time activation for a new destination email. The first submission triggers an activation email to `info@neonair.in`; confirm it before relying on the form for customer enquiries.

After activation, test the form end-to-end and verify delivery to `info@neonair.in`.

## Custom domain

The site currently uses the default GitHub Pages project URL. When `neonair.in` DNS is pointed to GitHub Pages and the custom domain is saved in repository Settings → Pages, update the canonical/public URLs in robots.txt, sitemap.xml and any social/SEO metadata to the custom domain.
