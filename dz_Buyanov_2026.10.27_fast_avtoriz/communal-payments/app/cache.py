import time
from typing import Optional

from app.config import CACHE_TTL_SECONDS, REDIS_URL

_redis_client = None
if REDIS_URL:
    import redis.asyncio as aioredis
    _redis_client = aioredis.from_url(REDIS_URL, decode_responses=True)

_mem_store: dict[str, tuple[str, float]] = {}


def _mem_get(key: str) -> Optional[str]:
    item = _mem_store.get(key)
    if not item:
        return None
    value, expires_at = item
    if time.time() > expires_at:
        _mem_store.pop(key, None)
        return None
    return value


def _mem_set(key: str, value: str) -> None:
    _mem_store[key] = (value, time.time() + CACHE_TTL_SECONDS)


def _mem_delete_group(group: str) -> None:
    for key in list(_mem_store):
        if key.startswith(f"{group}:"):
            _mem_store.pop(key, None)


async def cache_get(key: str) -> Optional[str]:
    if _redis_client:
        return await _redis_client.get(key)
    return _mem_get(key)


async def cache_set(key: str, value: str) -> None:
    if _redis_client:
        await _redis_client.set(key, value, ex=CACHE_TTL_SECONDS)
    else:
        _mem_set(key, value)


async def cache_invalidate_group(group: str) -> None:
    if _redis_client:
        async for key in _redis_client.scan_iter(match=f"{group}:*"):
            await _redis_client.delete(key)
    else:
        _mem_delete_group(group)


async def close_cache() -> None:
    if _redis_client:
        await _redis_client.aclose()