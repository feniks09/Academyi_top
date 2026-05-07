import sqlite3 as sq3

conn = sq3.connect('users.bd')

cursor = conn.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS Users(
               "id" INTEGER PRIMARY KEY AUTOINCREMENT,
               "name" TEXT NOT NULL,
               "age" TEXT,
               "order" INTEGER NOT NULL,
               "address" TEXT NOT NULL
               )'''
               )

cursor.execute("INSERT INTO Users('name', 'age', 'order', 'address') VALUES(?, ?, ?, ?)", ('Ванютка', 18, 12432, 'Саратов'))

conn.commit()