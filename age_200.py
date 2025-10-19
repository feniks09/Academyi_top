# Программа спрашивает год рождения
# При условии что возраст больше 200 лет нужно спросить еще раз

year_birthday = input("Какой год рождения: ")
year_new = 2025
age = year_new - int(year_birthday)

while age > 200:
    print("Возраст не коректный, введите еще раз")
    year_birthday = input("Какой год рождения: ")
    age = year_new - int(year_birthday)
    print("Ваш возраст в цикле: %(age)i" % {"age" : age})

print("Ваш возраст: %(age)i" % {"age" : age})