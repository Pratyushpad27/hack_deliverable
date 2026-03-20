# Hack at UCI Quote Book

A quote book web app for Hack at UCI members to submit and browse fun quotes.

**Live Demo:** https://hack-deliverable-pratyush.netlify.app

## What I Built

### Backend (FastAPI)
- **GET `/quotes`** — Retrieves all quotes from the database. Supports a `?period=` query parameter to filter by time range (`week`, `month`, `year`, or `all`)
- **POST `/quote`** — Accepts a name and message via form data, timestamps it, saves to the database, and returns the new quote as JSON

### Frontend (React + Vite)
- **QuoteForm** component — Submits quotes via `fetch` without refreshing the page. Includes input validation and a loading state on the submit button
- **QuoteCard** component — Displays each quote with the message, author name, and formatted date. Uses semantic HTML (`<article>`, `<blockquote>`, `<cite>`, `<time>`)
- **Time filter** — Dropdown to filter quotes by past week, month, year, or all time
- **Responsive design** — Works on mobile with breakpoints at 600px and 400px
- **Animations** — Cards fade/slide in, success message after submitting
- **Error handling** — Dismissable error banner for failed requests
- **Accessibility** — `aria-live` region for screen readers, proper labels, good color contrast

## Setup

### Backend

```bash
cd api
python3 -m venv .venv
source .venv/bin/activate   # macOS/Unix
# .\.venv\Scripts\activate  # Windows
pip install -r requirements.txt
python3 src/main.py
```

### Frontend

```bash
cd frontend
npm ci
npm run dev
```

Open **http://localhost:5175** in your browser. Both servers need to be running — the Vite dev server proxies `/api/*` requests to the backend automatically.

## Tech Stack

- **Frontend:** React 18, Vite, CSS
- **Backend:** FastAPI, Uvicorn, Python
- **Database:** JSON file (simulated)
