from pathlib import Path
import sqlite3 as sq

BAZA_DIR = Path(__file__).absolute().parent
print(BAZA_DIR)

def create_table(connection):
    is_complete = False
    cursor = connection.cursor()

    print("Таблица создается.....")
    try:

        cursor.execute(
                """     
                        CREATE TABLE IF NOT EXISTS "flowers" (
                        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        "name" TEXT NOT NULL CHECK("name" != ''),
                        "room" TEXT NOT NULL CHECK("room" != ''),
                        "responsible for watering" TEXT NOT NULL CHECK("responsible for watering" != '')   
                                    );
                """
        )
        connection.commit()
        create_table_finich = True
        
    except sq.Error as error:
        print(f"В файле create table возникла ошибка: \n\t{error}\n")

    print("Таблица создалась")
    return is_complete
    


def popiulate_table(connection):

    is_complete = False

    cursor = connection.cursor()

    flowers_room = [("дерн", "прихожая","Буянов А.Н."), ("фикус", "спальня", "Пупкин С.А."),]
    print("Данные записываются")
    try:

        cursor.executemany(
                        """
                        INSERT INTO "flowers"
                        ("name", "room", "responsible for watering")
                        VALUES
                        (?, ?, ?)
                        """,
                        flowers_room
                        )
        connection.commit()
        print("Данные записаны")
    except sq.Error as error:
        print(f"В модуле populete_table возникла Ошибка: \n\t{error}\n")

def use_basadate(connection):
    print("База данных создается")
    with connection as activ_connection:
        is_create_table_complete = create_table(activ_connection)
    
    if not is_create_table_complete:
        return
    print("База данных создана")
    print("База данных наполняется")
    is_popiulate_table_complete = popiulate_table(activ_connection)

    if not is_popiulate_table_complete:
        return
    print("База данных наполнена")

    
def main():
    connection = sq.connect(BAZA_DIR / "bemo.db")
    # create_table(connection)
    # popiulate_table(connection)
    use_basadate(connection)

if __name__ == "__main__":
    main()
    
    
