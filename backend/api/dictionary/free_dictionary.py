from fastapi import APIRouter
from fastapi.responses import JSONResponse
import redis
import requests
import json
import os

router = APIRouter()
r = redis.Redis(host=os.getenv('REDIS_HOST', 'localhost'), port=6379, db=0)
TTL = 86400  # 1日

@router.get("/dictionary/freedictionary")
def dictionary_lookup(word: str):
    key = f"dictionary:{word.lower()}"
    try:
        cached = r.get(key)
        if cached:
            print(f"[dictionary] cache hit: {word}")
            r.expire(key, TTL)
            return JSONResponse(content=json.loads(cached.decode()))
    except Exception:
        pass  # redisエラー時はキャッシュを無視

    print(f"[dictionary] api fetch: {word}")
    resp = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}")
    try:
        data = resp.json()
    except Exception:
        data = {"error": "Invalid response from dictionary API"}
    if resp.status_code == 200:
        try:
            r.setex(key, TTL, resp.text)
        except Exception:
            pass
        return JSONResponse(content=data)
    else:
        return JSONResponse(content=data, status_code=resp.status_code)