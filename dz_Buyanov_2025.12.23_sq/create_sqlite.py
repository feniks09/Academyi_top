from pathlib import Path
import sqlite3 as sq

BAZA_DIR = Path(__file__).absolute().parent
print(BAZA_DIR)

def create_table(connection):
    is_complete = False
    cursor = connection.cursor()

    try:

        cursor.execute(
                """     
                        CREATE TABLE IF NOT EXISTS "flowers" (
                        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        "flower_name" TEXT NOT NULL CHECK("name" != ''),
                        "room" TEXT NOT NULL CHECK("room" != ''),
                        "responsible_sorname" TEXT NOT NULL CHECK("responsible_sorname" != ''),
                        "responsible_name" TEXT NOT NULL CHECK("responsible_name" != ''),
                        "responsible_patronymic" TEXT NOT NULL CHECK("responsible_patronymic" != '')
                                    );
                """
        )
        connection.commit()
        is_complete = True
        
    except sq.Error as error:
        print(f"В файле create table возникла ошибка: \n\t{error}\n")

    return is_complete
    
def popiulate_table(connection):

    is_complete = False

    cursor = connection.cursor()

    flowers_room = [("дерн", "прихожая","Буянов А.Н."), ("фикус", "спальня", "Пупкин С.А."),]
    flowers_room = input_data()

    try:

        cursor.executemany(
                        """
                        INSERT INTO "flowers"
                        ("flower_name", "room", "responsible_sorname", "responsible_name", "responsible_patronymic" )
                        VALUES
                        (?, ?, ?, ?, ?)
                        """,
                        flowers_room
                        )
        connection.commit()
        is_complete = True
    
    except sq.Error as error:
        print(f"В модуле populete_table возникла Ошибка: \n\t{error}\n")

    return is_complete


def input_data():
        
    list_flowers = []

    N = int(input("Введите количество растений в квартире: "))

    for i in range(N):
        input_ = input("Введите Название растения, комната где стоит, ФИО ответсвенного: ").split()
        tuple_input = tuple(input_)
        list_flowers.append(tuple_input)
    
    print(f"Записано в базу данных - {list_flowers}")
    return list_flowers

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
    connection = sq.connect(BAZA_DIR / "Flowers.db")
    # create_table(connection)
    # popiulate_table(connection)
    use_basadate(connection)

if __name__ == "__main__":
    main()
    
    
