from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import AsyncIterator, Optional

from fastapi import FastAPI, Form, Query
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> Quote:
    """Process a user submitting a new quote."""
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)
    return quote


@app.get("/quotes")
def get_quotes(period: Optional[str] = Query(None)) -> list[Quote]:
    """Retrieve quotes, optionally filtered by a maximum age period."""
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
