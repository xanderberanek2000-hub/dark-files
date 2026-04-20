# Dark Files

Countdown teaser site for **not_darkarrow** on Twitch.

## Project Structure

```
dark-files/
├── index.html        ← public countdown page
├── admin/
│   └── index.html    ← admin panel (yoursite.com/admin)
└── README.md
```

## Deploy to Cloudflare Pages via GitHub

1. **Push this folder to a GitHub repo**
   - Go to github.com → New repository → name it `dark-files`
   - Upload the files (drag & drop or git push)

2. **Connect to Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Click **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
   - Authorize GitHub and select your `dark-files` repo
   - Build settings:
     - **Framework preset:** None
     - **Build command:** *(leave empty)*
     - **Build output directory:** `/` (or leave as default)
   - Click **Save and Deploy**

3. **Connect your custom domain**
   - In Cloudflare Pages → your project → **Custom domains**
   - Add your domain (e.g. `darkfiles.com`)
   - Follow the DNS instructions (if your domain is already on Cloudflare it's automatic)

## Admin Panel

Visit `yoursite.com/admin` — login with:
- **Username:** xander
- **Password:** xander

From the admin panel you can change:
- Countdown end date & time
- Timezone
- Eyebrow text, tagline, Twitch username
- Message shown when timer hits zero
- Optional reveal text and button link

> Settings are saved in the visitor's browser `localStorage`. This means changes
> you make in the admin panel apply immediately on that same browser. For a
> true server-side CMS you'd need a backend (e.g. Cloudflare Workers + KV).

## Notes

- No build step required — pure HTML/CSS/JS
- Every push to your GitHub `main` branch auto-deploys to Cloudflare Pages
