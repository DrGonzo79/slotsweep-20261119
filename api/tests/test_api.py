from fastapi.testclient import TestClient
from main import app

client = TestClient(app)
EP = {"id":"e1","title":"Old sponsor","published":"2023-01-01","downloads90":3000,"durationMin":30,"transcript":"Brought to you by Acme. Use promo code OLD20. Offer expires May 2023."}

def test_health():
    assert client.get("/health").json()["status"] == "ok"

def test_analyze_finds_and_values_stale_read():
    response = client.post("/analyze", json={"episodes":[EP],"cpm":30})
    assert response.status_code == 200
    result = response.json()["findings"][0]
    assert result["estimatedMonthlyValue"] == 30
    assert result["confidence"] >= 78
    assert any("promo code" in marker.lower() for marker in result["markers"])

def test_clean_transcript_returns_empty_findings():
    clean = {**EP, "transcript":"A conversation about evergreen podcast production."}
    assert client.post("/analyze", json={"episodes":[clean],"cpm":24}).json()["findings"] == []

def test_rejects_empty_batch_and_bad_cpm():
    assert client.post("/analyze", json={"episodes":[],"cpm":24}).status_code == 422
    assert client.post("/analyze", json={"episodes":[EP],"cpm":0}).status_code == 422
