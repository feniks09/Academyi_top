# Программа запрашивает год рождения
# Если ваш возраст меньше нуля всплвает ошибка "Вы еще не родились"
# Если ваш возраст больше 200 всплывает ошибка это супер редкость

year_birthday = input("Введите год рождения: ")

try:
    year_birthday = int(year_birthday)
    age = 2025 - year_birthday
    if age < 0:
        raise ValueError(
        "Вы еще не родились")
    elif age > 200:
        raise ValueError(
        "Супер редкость...!!!")
except ValueError as e:
        print("Ошибочка!!! -", e)
        age = None
if age:
    print("Ваш возраст: ", age)
print("Все ок")                    