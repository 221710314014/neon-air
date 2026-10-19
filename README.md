# NEON AIR — Aircraft Detailing

Production website for NEON AIR, an aircraft detailing business serving India.

## Live site

https://neonair.in/

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

`neonair.in` is configured in repository Settings → Pages. GoDaddy DNS uses the four GitHub Pages apex A records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` CNAME `221710314014.github.io`. Zoho MX and email TXT records are preserved. Canonical, sitemap and quotation return URLs use `https://neonair.in/`.

After DNS propagation, verify the Pages DNS check, certificate issuance and Enforce HTTPS setting, then test the quotation form and confirm inbox delivery.
