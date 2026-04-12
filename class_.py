class Cat:
    def __init__ (self, name, age):
        self.name = name
        self.age = age

    def say(self, word):
        return f"Кошка по имени {self.name} возраста {self.age} мяукнула {word}"
    
    def __str__(self):
        return f"{self.name} - {self.age} exy"
    
    def __repr__(self):
        return f"Cat('name': {self.name}, 'age': {self.age})"
    
cat_1 = Cat("Муся", 12)

cat_2 = Cat("Мурка", 1)

# print(cat_1.name, cat_1.age)
# print(cat_2.name, cat_2.age)
# print(cat_1.say("Привет"))
# print(f'я очень крутая кошка {cat_1} и я люблю кошку {cat_2}')
# print(repr(cat_1))

class Squa:
    def __init__(self, value):
        self.value = value

v1 = Squa(2)
v2 = Squa(4)

# print(v1.value + v2.value)

# squa_1 = Squa(3, 4)
# print(squa_1.a + squa_1.b)


class Namber:
    def __init__(self, value):
        self.value = value
    
    def __add__(self, other):
        return Namber(self.value + other.value)
    
    def __str__(self):
        return str(self.value)

a = Namber(3)
b = Namber(7)
c = a + b
print(c.value)
print(a + b)
