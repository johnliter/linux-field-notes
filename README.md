# Linux Field Notes

A static, responsive public troubleshooting website for Omarchy and other Linux problems. Its first guide documents recovery from an unresponsive Omarchy Quickshell process after suspend.

## Preview locally

Open `index.html` in a browser, or run:

```bash
cd omarchy-field-guide
python -m http.server 8080
```

Then visit http://localhost:8080.

## Publish

Upload `index.html`, `styles.css`, `app.js`, and `guides.js` together to a static hosting directory (including Hostinger `public_html`, if appropriate), or connect the directory to GitHub Pages, Cloudflare Pages, or another static host. **Do not overwrite an existing website's root without first deciding on a path/subdomain.**

## Add more troubleshooting guides

Edit the `window.FIELD_GUIDES` array in `guides.js`. Duplicate the existing guide object and change its `id`, `number`, `title`, `summary`, `category`, `platform`, `date`, `status`, `tags`, `symptoms`, `steps`, `evidence`, `caveat`, and `safety`. The site automatically generates the card, category filter, search text, article content, and counts. No build step required.

### Editorial standards

- Prefer facts demonstrated in terminal output and actual recovery tests.
- Distinguish "recovered after command X" from "root cause proven."
- Describe scope and side effects for commands that stop processes or change config.
- Avoid unsafe blanket fixes such as deleting all configuration files.
- Do not publish usernames, private paths, emails, IP addresses, API keys, or client information in case notes.

## Notes

The documented `kill -TERM 1596` recovery was performed successfully. The more reusable `pkill -TERM -f '^quickshell -n -p /usr/share/omarchy/shell$'` variant has not yet been separately tested on that machine.

This site is independent and not affiliated with Omarchy. All content is editable and deployable without a framework.
