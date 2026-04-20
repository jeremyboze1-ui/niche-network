# Niche Network — Landing Page & Admin Dashboard

A production-ready landing page for **Niche Network**, the social app for traders.
It includes a public marketing site, a working email waitlist, a video showcase,
and a private admin dashboard where you can add videos and export waitlist emails.

- Dark-mode, mobile-friendly landing page with animated phone mockups
- Real email waitlist stored in a local SQLite database (duplicate-safe, exportable to CSV)
- Password-protected admin dashboard at `/admin`
- Admins add videos by pasting a YouTube or Vimeo link — no file uploads needed
- Visitors can only view videos and submit their email — they can never see or reach the admin area

---

## Table of contents

1. What's inside
2. Run it on your computer (5 minutes)
3. How to manage the site after it's running
4. Deploying it live (recommended: Vercel)
5. Where the data lives and how to back it up
6. Security notes
7. Common questions

---

## 1. What's inside

```
niche-network/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Public landing page
│   ├── admin/            # Admin login + dashboard
│   └── api/              # Backend routes (subscribe, videos, admin login, exports)
├── components/           # UI components (Hero, Features, mockups, etc.)
├── lib/                  # Database + auth helpers
├── data/                 # SQLite DB (created automatically on first run)
├── package.json
├── tailwind.config.ts
├── next.config.js
└── .env.local.example    # Copy this to .env.local and fill in your values
```

### Tech stack

- **Next.js 14** (App Router) — React framework, runs both the website and the backend
- **TypeScript + Tailwind CSS** — typed, styled
- **SQLite** (via `better-sqlite3`) — a single file database, no external services needed
- **Cookie-based admin sessions** — simple, secure, no third-party auth

---

## 2. Run it on your computer (5 minutes)

### Step 1 — Install Node.js

If you don't already have it, download the LTS version from <https://nodejs.org>.
Any version 18 or newer works.

### Step 2 — Open the project in a terminal

```bash
cd path/to/niche-network
```

### Step 3 — Install the dependencies

```bash
npm install
```

> If you ever see a `better-sqlite3` build error, run `npm rebuild better-sqlite3` and try again.

### Step 4 — Create your config file

```bash
cp .env.local.example .env.local
```

Open `.env.local` in any text editor and:

- Set `ADMIN_PASSWORD=` to a password you'll remember. **Don't share this.**
- Set `SESSION_SECRET=` to a long random string. You can generate one by running:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5 — Start the dev server

```bash
npm run dev
```

Open <http://localhost:3000> — you'll see the landing page.
Open <http://localhost:3000/admin> — you'll be asked for your admin password.

That's it. You're running.

---

## 3. How to manage the site after it's running

Everything is managed from `/admin`.

### Adding a marketing video

1. Go to `https://your-site.com/admin`
2. Sign in with your admin password
3. In the **Videos** tab, paste:
   - **Title** (e.g. "Launch teaser")
   - **Video URL** — any YouTube or Vimeo link works. Examples:
     - `https://youtu.be/abc123`
     - `https://www.youtube.com/watch?v=abc123`
     - `https://vimeo.com/123456789`
   - **Description** (optional)
   - **Thumbnail URL** (optional — YouTube provides one automatically)
4. Click **Publish video**

The video will appear on the public landing page immediately. You can remove it
anytime by clicking the **✕** next to it in the dashboard.

> **Why URLs instead of file uploads?** Hosting large video files is expensive
> and slow. Using YouTube / Vimeo gives you free, fast, CDN-backed streaming on
> every device with zero hosting cost. Upload your video to YouTube (set it to
> *Public* or *Unlisted*), copy the share link, and paste it here — this is what
> every major SaaS landing page does.

### Viewing and exporting waitlist emails

1. Go to the **Waitlist emails** tab in `/admin`
2. You'll see every email, where it was collected, and when
3. Use the search box to filter, **Copy all** to grab them quickly, or
   **Download CSV** to pull the full list into Excel / Google Sheets / your email tool

### Signing out

Click **Sign out** in the top-right of the dashboard.

---

## 4. Deploying it live

The easiest and free way is **Vercel**. Here's the full path for a non-technical user.

### A. Push the code to GitHub

1. Create a free GitHub account at <https://github.com>
2. Install GitHub Desktop (<https://desktop.github.com>) — the friendly UI
3. In GitHub Desktop: **File → Add local repository** and pick the `niche-network` folder
4. Click **Publish repository** (keep it private if you'd like)

### B. Deploy on Vercel

1. Go to <https://vercel.com> and sign up with your GitHub account
2. Click **Add New Project → Import** and choose `niche-network`
3. Before clicking **Deploy**, open **Environment Variables** and add:
   - `ADMIN_PASSWORD` = the password you want to use
   - `SESSION_SECRET` = a long random string (generate one like in Step 4 above)
4. Click **Deploy**. Your site will be live at a `*.vercel.app` URL in ~1 minute.

### C. Important: database on Vercel

Vercel's default servers are "serverless" — the filesystem is not persistent.
That means a local SQLite file will not survive deployments. You have two options:

**Option 1 — Simplest: use Vercel Postgres or Turso (recommended for launch)**

Vercel has a free Postgres tier. Turso (<https://turso.tech>) has a free SQLite-compatible
tier that is a 1-line swap from the code you have now. Either is fine for thousands of
signups. Ping me / a developer friend and it's a ~10-line change to `lib/db.ts`.

**Option 2 — Quickest for testing: host on a traditional server**

Run this app on a $5/mo VPS (DigitalOcean, Hetzner, Railway, Render) where the SQLite
file persists between restarts. Everything works exactly as-is on your laptop.

Both options keep the admin dashboard and email collection working identically — only
the storage backend differs. The Vercel deploy itself will work immediately; you'll
just want to move to Postgres/Turso before you start actively marketing the site.

### D. Custom domain

In Vercel → **Project → Settings → Domains**: add `nichenetwork.app` (or whatever
you buy) and follow the DNS instructions. Vercel handles the SSL certificate for you.

---

## 5. Where the data lives and how to back it up

- **Subscriber emails** and **videos** live in `data/niche-network.db` (SQLite).
- To back up: just copy that `.db` file somewhere safe (Dropbox, Google Drive). That's it.
- To wipe: stop the server, delete the file, restart — it re-creates empty.
- The **CSV export** inside the admin is always an up-to-the-second snapshot.

---

## 6. Security notes

- The admin area is protected by `ADMIN_PASSWORD` + an HTTP-only session cookie.
- Never commit `.env.local` to GitHub — the `.gitignore` already excludes it.
- Use a long unique password (20+ chars). A password manager helps.
- Change `SESSION_SECRET` if you believe it has been exposed — it will log everyone out.
- All admin API routes verify the session on every request, so a visitor editing HTML
  in their browser cannot ever reach admin functionality.

---

## 7. Common questions

**Can visitors upload videos or edit anything?**
No. Only `/admin` (password-protected) can add/remove videos. Every admin API route
checks the session cookie server-side and rejects anonymous requests with `401`.

**What if the same person submits their email twice?**
The database has a `UNIQUE` constraint on email. The API silently treats duplicates
as success (so the user gets a friendly "you're already on the list" message) and
does not store a second copy.

**How do I change the headline, colors, or copy?**
- Copy lives in `components/Hero.tsx`, `components/Features.tsx`, `components/HowItWorks.tsx`, etc.
- Colors live in `tailwind.config.ts` under `theme.extend.colors`.
- Everything is plain React + Tailwind, so changes show up instantly while `npm run dev` is running.

**How do I send the launch email to my waitlist?**
Easiest: **Download CSV** from the admin dashboard and upload it to any email tool
(Mailchimp, Resend, ConvertKit, Substack, Loops). One-click import everywhere.

**Does it work on mobile?**
Yes — every section is designed mobile-first. Try it in Chrome DevTools by hitting
`Cmd/Ctrl + Shift + M` to toggle the mobile view.

---

If anything blocks you, open the error in the terminal and the fix is usually in
one of: missing `npm install`, a typo in `.env.local`, or Node version < 18.
