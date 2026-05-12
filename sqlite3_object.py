import sqlite3

conn = sqlite3.connect("object.db")

conn.row_factory = sqlite3.Row

cursor = conn.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS object(
               'id' INTEGER PRIMARY KEY AUTOINCREMENT,
               'name' TEXT NOT NULL,
               'type' TEXT,
               'address' TEXT,
               'owner' TEXT 
               )'''
)

cursor.executemany("INSERT INTO object(name, type, address, owner) VALUES(?, ?, ?, ?)", [('Арлекино', 'гостиница', 'Владивосток', 'Петров'),
               ('Озера', 'Магазин', 'Москва', 'Иванов'), ("Роскошь", None, None, None)])
cursor.execute("INSERT INTO object(name) VALUES(?)", ('Виктория',))

cursor.execute("SELECT * FROM object")


conn.commit()

# date = cursor.fetchall()

# date = cursor.fetchone()
# print(date)
# date = cursor.fetchone()
# print(date)
# date = cursor.fetchone()
# print(date)
# date = cursor.fetchone()
# print(date)

# for i in range(4):
#     date = cursor.fetchone()
#     print(date)
date = cursor.fetchmany(2)
rows = cursor.fetchall()

# print(rows[0]['name'])

# for row in rows:
#     d = f"name - {row['name']},\
#  type - {row['type']},\
#  address - {row['address']},\
#  owner - {row['owner']},"
#     print(d)




# print(date[0][4])
# for line in date:
#     d = f"{line[1]} - {line[2]}"
#     print(d)
# for line in date:
#     for value in line:
#         print(value)

# l = [value for line in date for value in line]
# print(l)
# for line in date:
#     l = line[3]
#     print(l)
# name = "ПРИВЕТ"
# with open('object.txt', 'r+', encoding = 'utf-8') as f:
#     for line in date:
#         f.write(line[1] + '-' + str(line[3])+ " ")


