from pathlib import Path
import sqlite3 as sq

BAZA_DIR = Path(__file__).absolute().parent
print(BAZA_DIR)

def create_table():
    pass

def popiulate_table():
    pass

def use_baza():
    pass
def main():
    connection = sq.connect(BAZA_DIR / "bemo.db")
    use_baza()

if __name__ == "__main__":
    main()
    
