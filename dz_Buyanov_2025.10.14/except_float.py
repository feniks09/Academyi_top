# С клавиатуры вводятся вещественные числа
# ожидается ввод либого мусора
# дождаться корректного ввода
# Введите число я выведу обратное при возниконовении деления на 0
# вывести расчет окончен и количество введеных значенний

rezulte = 0
devizion = input("Введите вещественное число делитель: ")
count = 0

while devizion != "stop":
    count += 1
    try:
        devizion = float(devizion) # пишем исполняемы код, где вероятна ошибка, 
        rezulte = 1/devizion # пишем исполняемы код, где вероятна ошибка, 
    except (ValueError, ZeroDivisionError) as e: # прописываем исключения которые надо поймать и записавть в e
        if isinstance(e, ValueError):
            print("значение должно быть числом, Ваше значение -", devizion)
            print("Вот какое значение выходит ", rezulte)
            rezulte = None
        elif isinstance(e, ZeroDivisionError):
            print("Ошибка, на ноль делить нельзя!!!, Вы вели -", devizion) # код который исполнится при возникновения исключения
            rezulte = None
            print("Вот что выходит", rezulte)
            devizion = "stop"
    if rezulte:
        print(round(rezulte, 2))
        devizion = input("Введите делитель: ")
print("Расчет окончен! Количество введенных значений:", count)
    

# import traceback
# error_message = ""
# oshibka = ""
# try:
#     1/0
# except:
#     error_message = traceback.format_exc()
# if oshibka:
#     print("произошла ошибка", error_message)
# print("что дальше")

# year_birthday = input("Введите год рождения: ")

# try:
#     year_birthday = int(year_birthday)
# except ValueError as e:
#     print("Введите число!!!, вы ввели: ", e)
#     year_birthday = None
# if year_birthday:
#     print("Ваш год рождения", year_birthday)
