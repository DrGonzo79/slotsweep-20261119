import re
from pathlib import Path
import json
from fastapi import FastAPI
from pydantic import BaseModel, Field

DATA = json.loads((Path(__file__).parents[1] / "data" / "demo.json").read_text())
app = FastAPI(title="SlotSweep Analysis API", version="0.1.0")
PATTERNS = [
    re.compile(r"promo code\s+[a-z0-9]+", re.I),
    re.compile(r"offer expires?\s+[^.]+", re.I),
    re.compile(r"through\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2},?\s+\d{4}", re.I),
    re.compile(r"brought to you by\s+[^.]+", re.I),
    re.compile(r"a word from\s+[^.]+", re.I),
]

class Episode(BaseModel):
    id: str = Field(min_length=1, max_length=80)
    title: str = Field(min_length=1, max_length=160)
    published: str = Field(min_length=10, max_length=10)
    downloads90: int = Field(ge=0, le=100_000_000)
    durationMin: int = Field(ge=1, le=1440)
    transcript: str = Field(min_length=1, max_length=500_000)

class AnalyzeRequest(BaseModel):
    episodes: list[Episode] = Field(min_length=1, max_length=500)
    cpm: float = Field(ge=1, le=200)

def analyze_episode(ep: Episode, cpm: float):
    markers = list(dict.fromkeys(m.group(0) for pattern in PATTERNS for m in pattern.finditer(ep.transcript)))
    if not markers:
        return None
    confidence = min(98, 58 + len(markers) * 10)
    value = round((ep.downloads90 / 3 / 1000) * cpm, 2)
    return {"episodeId": ep.id, "title": ep.title, "downloads90": ep.downloads90, "markers": markers, "confidence": confidence, "estimatedMonthlyValue": value, "status": "review"}

@app.get("/health")
def health():
    return {"status": "ok", "fixtureVersion": "fictional-2026-11-19"}

@app.post("/analyze")
def analyze(request: AnalyzeRequest):
    findings = [finding for ep in request.episodes if (finding := analyze_episode(ep, request.cpm))]
    findings.sort(key=lambda row: row["downloads90"], reverse=True)
    return {"findings": findings, "disclaimer": DATA["disclaimer"]}
