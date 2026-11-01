from typing import List
from models import Account

# Список аккаунтов в памяти (Шаг 3)
accounts: List[Account] = []


def find_by_username(username: str) -> Account | None:
    for acc in accounts:
        if acc.username == username:
            return acc
    return None


def add_account(account: Account) -> None:
    accounts.append(account)