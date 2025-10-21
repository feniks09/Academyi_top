# С клавиатуры вводятся простые числа
# ожидается ввод либого мусора
# дождаться корректного ввода
# Введите число я выведу обратное при возниконовении деления на 0
# вывести расчет окончен и количество введеных значенний

rezulte = 0
devizion = input("Введите делитель: ")

count = 0
while devizion != "stop":
    count += 1
    try:
        devizion = int(devizion) # пишем исполняемы код, где вероятна ошибка, 
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
    

