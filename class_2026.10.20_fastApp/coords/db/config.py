from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


PROJECT_DIR: Path = Path(__file__).resolve().parents[1]
ENV_FILE: Path = PROJECT_DIR.parent / ".env"


class DbSettings(BaseSettings):

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    database_url: str = "sqlite+aiosqlite:///./coords.db"
    debug: bool = False


settings = DbSettings()


def resolve_database_url() -> str:

    url = settings.database_url
    prefix = "sqlite+aiosqlite:///./"

    if url.startswith(prefix):
        relative = url[len(prefix):]
        absolute = (PROJECT_DIR / relative).resolve()
        return f"sqlite+aiosqlite:///{absolute}"

    return url
