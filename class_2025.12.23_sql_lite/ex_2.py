from pathlib import Path
import sqlite3 as sq

BASE_DIR = Path(__file__).absolute().parent

def create_tables(connection: sq.Connection) -> bool:
    
    is_comleate = False

    cursor = connection.cursor()
    try:
        cursor.execute(
            """
                CREATE TABLE IF NOT EXISTS "Company"
                (
                "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                "name" TEXT NOT NULL CHECK("name" != '') UNIQUE,
                "owner" TEXT NOT NULL CHECK("owner" != '')
                );
                """
            )
        connection.commit()
        is_comleate = True

    except sq.Error as error:
        print(f"ошибка: \n\t{error}\n")

    return is_comleate

def populate_tables(connection: sq.Connection) -> bool:
    is_complite = False
    cursor = connection.cursor()
    comapany_names = [
        ("Yandex", "Ягода Малина"),
        ("Matroskin", "Кот матрос")

    ]
    try:
        cursor.executemany(
            """
            INSERT INTO "Company"
            ("name", "owner")
            VALUES
            (?, ?)
            """,
            comapany_names
        )

    except sq.Error as error:

        return is_complite

def main():
    connection = sq.connect(BASE_DIR / "demo.db")
    
    with connection as active_connection:
       is_tables_creation_complete = create_tables(active_connection)
       if is_tables_creation_complete:
           print("Таблица создана")

           is_tables_creation_complete = populate_tables(active_connection)

           if is_tables_creation_complete:
               print("Таблицы наполнены данными")

       pass

if __name__ == "__main__":
    main()