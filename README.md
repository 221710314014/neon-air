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

The HTML form posts directly to FormSubmit; JavaScript validates the fields and shows a sending state. Enquiries are delivered to `info@neonair.in`.

FormSubmit activation for `https://neonair.in/` was completed on 19 October 2026. A labelled deployment test was received in the Zoho inbox and its submitted fields were checked. Fresh submissions use FormSubmit's reCAPTCHA before redirecting to `https://neonair.in/thank-you.html`.

The final fresh-submission test is awaiting the human reCAPTCHA step; its redirect has not yet been verified.

## Custom domain

`neonair.in` is configured in repository Settings → Pages. GoDaddy DNS uses the four GitHub Pages apex A records (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`) and `www` CNAME `221710314014.github.io`. Zoho MX and email TXT records are preserved. Canonical, sitemap and quotation return URLs use `https://neonair.in/`.

Verified on 19 October 2026: GitHub Pages deployment succeeded, DNS check passed, `https://neonair.in/` loaded successfully, and Enforce HTTPS was enabled. The canonical URL uses the custom domain and the primary page images loaded.

The `https://www.neonair.in/` certificate still returned a name mismatch during verification; allow certificate/DNS propagation, then verify the www-to-apex redirect before considering that alternate hostname ready.
