import sqlite3 
name = "see_video"
connect = sqlite3.connect(name + ".db")

cursor = connect.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS see_video(
               id INTEGER PRIMARY KEY AUTOINCREMENT 
               
               )'''

)
