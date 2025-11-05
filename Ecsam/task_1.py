# Задача №1
# Написать программу, которая спрашивает у пользователя целое количество часов и выводит количество часов до сна (23:00) Пример работы:
# Программа: Который час?
# Пользователь: 19
# Программа: до сна часов: 4 

# time_now = input("Который час: ")
# try:
#     time_now = int(time_now)
# except ValueError:
#     print("вы ввели не число")
#     time_now = None
#     time_count = None
    
# if time_now:
#     time_sleep = 23
#     time_count = time_sleep - time_now 
#     print(type(time_count))
# if time_count == 1:
#     print("До сна: ",time_count, "час") 
    
# else:
#     print("До сна часов: ", time_count) 

# Задача №2
# Написать программу, которая спрашивает у пользователя, который час и выводит в ответ время суток. 
# Границы определить любые, но в каждом времени суток должно быть непустое количество часов. 
# Пример работы программы:
# Программа: Который час?
# Пользователь: 19:35
# Программа: О, уже вечер!

class TimeError(Exception):
    pass

time_now = input("Который час (часы и минуты через \":\"): ")
time_now = time_now.split(":")
# if time_now[1] == "00":
#     time_now[1] = "0"
try:

    time_now_hour = int(time_now[0])
    time_now_min = int(time_now[1])    

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 53c25bd1776737f857d357382df020c7e805b5a5
    if time_now_hour > 23 or time_now_min > 59:
        raise TimeError("TimeError - Машина времени в будующее")
    if time_now_hour < 0 or time_now_min < 0:
        raise TimeError("TimeError - Машина времени в прошлое")
except ValueError as e:
    print("Вот такая ошибка: ", e)
except TimeError as e:
    print("Смотри на ошибку: ", e)
except ZeroDivisionError as e:
    print("Ошо про 0: ", e)
except IndexError as e:
    print("не выходи из списка", e)
# except TimeError as e:
#     print("Ошибка такая", e)
<<<<<<< HEAD
    if not (0 <= time_now_hour <= 23) or not (0 <= time_now_min <= 59):
        raise TimeError("TimeError - Таких времен не существует")
=======
=======
    if not (0 <= time_now_hour <= 23) or not (0 <= time_now_min <= 59):
        raise TimeError("TimeError - Таких времен не существует")
>>>>>>> 45048a7b860607a4a3fa652dc082aa52196f0a8f
>>>>>>> 53c25bd1776737f857d357382df020c7e805b5a5
    
except (ValueError, TimeError, IndexError) as e:
    if isinstance(e, ValueError):
        print("Вы ввели не число", e)
        time_now_min = None
        time_now_hour = None
    elif isinstance(e, IndexError):
        print("не выходи из списка", e)
        time_now_min = None
        time_now_hour = None
    else:
        print(e)   

# if 30 < time_now_min <= 59:
#    time_now_round = time_now_hour + 1
# else:
#     time_now_round = time_now_hour 
# print(time_now_min)
# print(time_now_hour)
# print(time_now_round)


if time_now_hour and time_now_min:
    if 4 <= time_now_hour < 9 and 0 <= time_now_min <= 59:
        print("Сейчас утро")
    elif 9 <= time_now_hour < 16 and 0 <= time_now_min <= 59:
        print("Сейчас день")
    elif 16 <= time_now_hour < 22 and 0 <= time_now_min <= 59:
        print("Сейчас вечер")
    elif 22 <= time_now_hour < 23 and 0 <= time_now_min <= 59:
        print("Сейчас ночь")
    elif 0 <= time_now_hour < 4 and 0 <= time_now_min <= 59:
        print("Сейчас ночь")
    

   
# # Задача №3
# # Написать программу, которая спрашивает пользователя день его рождения (отдельно день и месяц цифрами) и
# # знает заранее текущее число (30 октября) 
# # Программа выводит количество дней до дня рождения. datetime использовать нельзя. Циклы - можно
# dict_mes = {1 : 31, 2 : 28, 3 : 31, 4: 30, 5 : 31,\
#     6 : 30, 7 : 31, 8 : 31, 9 : 30, 10 : 31, 11 : 30, 12 : 31}
# birsday = input("Введите свой день рождения (отдельно день и месяц цифрами): ")
# birsday = birsday.split(".")
# print(birsday)
# day_now = 30
# mes_now = 10
# birsday_day = int(birsday[0])
# birsday_mes = int(birsday[1])

# day_count = day_now - birsday_day
# # mes_count = mes_now - birsday_mes

# print(day_count)
# # print(mes_count)
# mes_day = 0
# for i in range(1, birsday_mes):
#     mes_day += dict_mes[birsday_mes]
# day_all = day_count + mes_day    
# print(mes_day)
# print("Дней до дня рождения: ", day_all) 
   
# print(dict_mes[birsday_mes])




