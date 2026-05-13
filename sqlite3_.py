import sqlite3

db = sqlite3.connect("students.db")

c = db.cursor()

c.execute(''' CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER
    )'''
)

c.execute("INSERT INTO students(name, age) VALUES(?, ?)",('Alex', 34))

c.execute("INSERT INTO students(name, age) VALUES(?, ?)",('Петя', 1))
c.execute("INSERT INTO students(name, age) VALUES(?, ?)",
          ('Алексей', 21))
db.commit()
input_users = "Alex"
c.execute("SELECT * FROM students")

date = c.fetchall()

for d in date:
    list_d = list(d)
    for d in list_d:

        print(d)

