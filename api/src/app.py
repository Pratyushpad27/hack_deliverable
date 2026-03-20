import os
from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from pathlib import Path
from typing import AsyncIterator, Optional

from fastapi import FastAPI, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


db_path = Path(__file__).resolve().parent.parent / "data" / "database.json"
database: JSONDatabase[list[Quote]] = JSONDatabase(str(db_path))


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("ALLOWED_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> Quote:
    """Process a new quote submission."""
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)
    return quote


@app.get("/quotes")
def get_quotes(period: Optional[str] = Query(None)) -> list[Quote]:
    """Get quotes from the database, filtered by time period if given."""
    all_quotes: list[Quote] = database["quotes"]

    if period is None or period == "all":
        return all_quotes

    now = datetime.now()
    delta_map = {
        "week": timedelta(weeks=1),
        "month": timedelta(days=30),
        "year": timedelta(days=365),
    }

    delta = delta_map.get(period)
    if delta is None:
        return all_quotes

    cutoff = now - delta
    return [q for q in all_quotes if datetime.fromisoformat(q["time"]) >= cutoff]
