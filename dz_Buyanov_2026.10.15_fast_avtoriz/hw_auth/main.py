from fastapi import FastAPI, Depends, HTTPException, status

from models import Account, RegisterRequest, LoginRequest, AccountPublic
from storage import find_by_username, add_account
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
    require_admin,
)
app = FastAPI(title="HW6 Auth", version="1.0.0")

# --- Шаг 4: Регистрация ---
@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: RegisterRequest):
    if find_by_username(data.username) is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )

    account = Account(
        username=data.username,
        password=hash_password(data.password),  # храним хеш, не открытый пароль
        role=data.role,
        email=data.email,
    )
    add_account(account)
    return {"message": "Account created", "username": account.username}


# --- Шаг 5: Авторизация, выдача JWT ---
@app.post("/login")
def login(data: LoginRequest):
    account = find_by_username(data.username)

    # Неверный логин или пароль → 401 (Шаг 8.1)
    if account is None or not verify_password(data.password, account.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(account)
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in_minutes": 30,
    }


# --- Шаг 6: Защищённый ресурс ---
@app.get("/me", response_model=AccountPublic)
def me(current: Account = Depends(get_current_user)):
    return AccountPublic(
        username=current.username,
        role=current.role,
        email=current.email,
    )


# --- Шаг 7: Ролевая модель ---
@app.get("/admin/stats")
def admin_stats(current: Account = Depends(require_admin)):
    return {
        "message": "Admin stats",
        "admin": current.username,
        "stats": {
            "total_accounts": len(__import__("storage").accounts),
            "active_sessions": "n/a (in-memory)",
        },
    }