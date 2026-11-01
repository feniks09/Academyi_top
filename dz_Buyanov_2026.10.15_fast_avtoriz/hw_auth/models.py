from pydantic import BaseModel, EmailStr


class Account(BaseModel):
    """Модель аккаунта (Шаг 2)."""
    username: str
    password: str
    role: str
    email: EmailStr


class RegisterRequest(BaseModel):
    username: str
    password: str
    email: EmailStr
    role: str = "user"   # по умолчанию обычный пользователь


class LoginRequest(BaseModel):
    username: str
    password: str


class AccountPublic(BaseModel):
    """Аккаунт без пароля — для ответа GET /me (Шаг 6)."""
    username: str
    role: str
    email: str