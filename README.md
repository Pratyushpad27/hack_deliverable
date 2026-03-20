# Hack at UCI Quote Book

A quote book app where Hack at UCI members can submit and browse fun quotes.

**Live demo:** https://hack-deliverable-pratyush.netlify.app

## What I did

- Added a `GET /quotes` endpoint with a `?period=` query param to filter quotes by week, month, year, or all time
- Changed the `POST /quote` endpoint to return JSON instead of redirecting, so the page doesn't refresh on submit
- Built a `QuoteCard` component to display each quote (name, message, date)
- Built a `QuoteForm` component that handles submission without page reload
- Added a dropdown to filter quotes by time period
- Styled everything with plain CSS, made it responsive for mobile
- Added a fade-in animation on quote cards and a success message when you submit

## How to run it locally

Start the backend:

```bash
cd api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 src/main.py
```

Start the frontend (in a separate terminal):

```bash
cd frontend
npm ci
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173). Both servers need to be running.

## Tech stack

- React, Vite, CSS (frontend)
- FastAPI, Python (backend)
- JSON file for storage
