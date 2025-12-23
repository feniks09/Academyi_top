import dataclasses
# описание комплетка из трех переменных

@dataclasses.dataclasses
class Birka:
    id : int
    text : str
    author : str

zapiska_1 = Birka(id = 12, text = "Помыть кота", author = "я")
zapiska_2 = Birka(23, "привет", "не я")

print(zapiska_1)
print(zapiska_1.id)
