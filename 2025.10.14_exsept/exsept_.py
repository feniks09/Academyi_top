# Введите число я выведу обратнеое
rezulte = 0
devizion = input("Введите делитель: ")
# При ловле ошибок применяем вложенный блок try
# try:
#     devizion = int(devizion) # пишем исполняемы код с ошибкой, 
#     try:  
#         rezulte = 1/devizion # пишем исполняемы код с ошибкой, 
#     except ZeroDivisionError: # прописываем исключения при которые надо поймать
#         print("Ошибка, на ноль делить нельзя!!!, Вы вели -", devizion) # код который исполнится при возникновения исключения
#         # rezulte = None
#         print("Вот что выходит", rezulte)
# except ValueError:
#     print("значение должно быть числом, Ваше значение -", devizion)
#     # devizion = None
#     print("Вот какое значение выходит ", devizion)

# if rezulte:
#     print("Обратное равно: ", rezulte)

# При ловле ошибок применяем один try и несколько exsept
# try:
#     devizion = int(devizion) # пишем исполняемы код с ошибкой, 
#     # после первой ошибки исполнение блока try прекращается
#     rezulte = 1/devizion # пишем исполняемы код с ошибкой
# except ValueError:
#     print("значение должно быть числом, Ваше значение -", devizion)
#     # devizion = None
#     print("Вот что выходит", devizion)
# except ZeroDivisionError:
#     print("Ошибка, на ноль делить нельзя!!!, Вы вели -", devizion)
#     rezulte = None
#     print("Вот что выходит", rezulte)
# if rezulte:
#     print("Обратное равно: ", rezulte)

# Проверка на исключения с общим обработчиком
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
if rezulte:
    print(rezulte)

    
if rezulte:
    print("Обратное равно: ", rezulte)
import traceback
error_message = ""
oshibka = ""
try:
    1/0
except:
    error_message = traceback.format_exc()
if oshibka:
    print("произошла ошибка", error_message)
print("что дальше")

year_birthday = input("Введите год рождения: ")

# try:
#     year_birthday = int(year_birthday)
# except ValueError as e:
#     print("Введите число!!!, вы ввели: ", e)
#     year_birthday = None
# if year_birthday:
#     print("Ваш год рождения", year_birthday)

