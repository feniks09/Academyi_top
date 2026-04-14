class Users:

    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    def get_age(self):
        return self._age
    
    def set_age(self, age):
        if age <=0:
            raise ValueError("Возраст не может быть отрицательны")
        if age > 150:
            raise ValueError("Возраст слишком велик")
        self._age = age
    
    def get_name(self):
        return self._name
    
    def set_name(self, name):
        if not name:
            raise ValueError("Имя не может быть пустым")
        self._name = name

    # def print_user(self):
    #     print(self._name, self._age)
    

user_1 = Users("Алексей", 38)
# user_1.age = 5
# if user_1.age <= 0:
#     raise ValueError("Отрицат возраста не может быть")
# elif user_1.age > 150:
#     raise ValueError("Возраст очень велик")
    
# else:
#     print(user_1.name, "-", user_1.age)

# user_1.print_user()

print(user_1.get_age())
print(user_1.get_name())

user_1.set_age(30)
user_1.set_name("Вика")

print(user_1.get_age())
print(user_1.get_name())